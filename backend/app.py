import os
from datetime import timedelta
from flask import Flask, request, jsonify, send_from_directory, session, url_for
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)

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
    # If path points to a file in static folder, serve it, else serve index.html for React Router
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

# API endpoint to process text input and generate a video (mock function)
@app.route('/api/process-text', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data.get("text")
        
    # Placeholder function to simulate video generation
    video_path = generate_video_from_text(text)
    video_url = url_for('serve_video', filename=os.path.basename(video_path), _external=True)
        
    return jsonify({"videoURL": video_url})

@app.route('/videos/<filename>')
def serve_video(filename):
    return send_from_directory('videos', filename, mimetype='video/mp4')

def generate_video_from_text(text):
    output_path = os.path.join('videos', 'output_video.mp4')
    # This is a placeholder. Insert actual video generation code here.
    return output_path

# API endpoint to process audio input (mock function)
@app.route('/api/process-audio', methods=['POST'])
def process_audio():
    if 'audio' not in request.files:
        return jsonify({"message": "No audio file uploaded"}), 400

    audio_file = request.files['audio']
    audio_path = os.path.join("uploads", audio_file.filename)
    audio_file.save(audio_path)

    # Call your ML model here to process the audio file
    # Replace the following with actual model processing
    processed_text = "This is a mock processed text from the audio."  # Mock response

    return jsonify({"message": processed_text})

# Start the Flask application
if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")  # Create uploads folder if it doesn't exist
    if not os.path.exists("videos"):
        os.makedirs("videos")  # Create videos folder if it doesn't exist
    app.run(debug=True)