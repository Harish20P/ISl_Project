import os
from datetime import timedelta
from flask import Flask, request, jsonify, send_from_directory, session, url_for
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import speech_recognition as sr
from pydub import AudioSegment

def audio_to_text(audio_file):
    recognizer = sr.Recognizer()

    if audio_file.endswith(".mp3"):
        audio = AudioSegment.from_mp3(audio_file)
        audio_file = "temp.wav"
        audio.export(audio_file, format="wav")

    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source) 

    try:
        text = recognizer.recognize_google(audio_data)
        print("Extracted Text:", text)  # Display extracted text in terminal
        return text
    except sr.RequestError as e:
        raise Exception(f"Could not request results from Google Speech Recognition service; {e}")
    except sr.UnknownValueError:
        raise Exception("Google Speech Recognition could not understand the audio")

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)  # Allow requests from any origin

app.secret_key = os.getenv("SECRET_KEY", "your_secret_key")  # Use a strong secret key in production
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=12)
Session(app)

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://harish:harish20@cluster0.amazss0.mongodb.net/")
client = MongoClient(MONGO_URI)  
db = client['User_Details']  
users_collection = db['User']  

# Serve the React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# API endpoint to sign up a new user
@app.route('/api/signup', methods=['POST'])  
def signup():  
    data = request.get_json()  
    user_id = data.get('userId')  
    password = data.get('password')  

    if users_collection.find_one({'user_id': user_id}):  
        return jsonify({'message': 'User ID already exists!'}), 400 
        
    hashed_password = generate_password_hash(password)  
    new_user = {  
        'user_id': user_id,  
        'password': hashed_password 
    }  

    try:  
        users_collection.insert_one(new_user)  
        return jsonify({'message': 'User created successfully!'}), 201 
    except Exception as e:  
        return jsonify({'message': 'Error creating user: ' + str(e)}), 500

# API endpoint to log in a user
@app.route('/api/login', methods=['POST'])  
def login():  
    data = request.get_json()  
    user_id = data.get('userId')  
    password = data.get('password')  

    user = users_collection.find_one({'user_id': user_id})  

    if user and check_password_hash(user['password'], password):  
        session['user_id'] = user_id
        session.permanent = True
        return jsonify({'message': 'Login successful!'}), 200 
    elif user:
        return jsonify({'message': 'Invalid password!'}), 401 
    else:  
        return jsonify({'message': 'User not found!'}), 404  

# API endpoint to log out a user
@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful!'}), 200

@app.route('/audio/<filename>')
def serve_audio(filename):
    return send_from_directory(os.path.join('audio'), filename, mimetype='audio/mpeg')

@app.route('/api/process-audio', methods=['POST'])
def process_audio():
    if 'audio' not in request.files:
        return jsonify({"message": "No audio file uploaded"}), 400

    audio_file = request.files['audio']
    audio_folder = "audio"
    if not os.path.exists(audio_folder):
        os.makedirs(audio_folder)

    audio_path = os.path.join(audio_folder, audio_file.filename)
    audio_file.save(audio_path)

    try:
        processed_text = audio_to_text(audio_path)
        audio_url = url_for('serve_audio', filename=audio_file.filename, _external=True)
        print("Extracted Text:", processed_text)
        return jsonify({"message": processed_text, "audioURL": audio_url})
    except Exception as e:
        print(f"Error during audio processing: {str(e)}")  # Improved logging
        return jsonify({"message": f"Error processing audio: {str(e)}"}), 500

if __name__ == '__main__':
    if not os.path.exists("audio"):
        os.makedirs("audio")
    if not os.path.exists("videos"):
        os.makedirs("videos")
    app.run(debug=True, port=5000)  # Ensure it runs on port 5000