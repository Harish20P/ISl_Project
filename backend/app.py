import os
from datetime import timedelta
from flask import Flask, request, jsonify, send_from_directory, session
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)

# Configure session
app.secret_key = os.getenv("SECRET_KEY", "your_secret_key")  # Ensure this is set in production
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=12)
Session(app)

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://harish:harish20@cluster0.amazss0.mongodb.net/")
client = MongoClient(MONGO_URI)  
db = client['User_Details']  
users_collection = db['User']  

@app.route('/')  
def serve():  
    return send_from_directory(app.static_folder, 'index.html')  

@app.route('/api/signup', methods=['POST'])  
def signup():  
    data = request.get_json()  
    user_id = data.get('userId')  
    password = data.get('password')  

    print(f"Signup Attempt: User ID: {user_id}, Password: {password}") 

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

@app.route('/api/login', methods=['POST'])  
def login():  
    data = request.get_json()  
    user_id = data.get('userId')  
    password = data.get('password')  

    print(f"Login Attempt: User ID: {user_id}, Password: {password}")

    user = users_collection.find_one({'user_id': user_id})  

    if user:  
        if check_password_hash(user['password'], password):  
            session['user_id'] = user_id
            session.permanent = True  # This enables the session timeout feature
            return jsonify({'message': 'Login successful!'}), 200 
        else:  
            return jsonify({'message': 'Invalid password!'}), 401 
    else:  
        return jsonify({'message': 'User not found!'}), 404  

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful!'}), 200

if __name__ == '__main__':  
    app.run(debug=True)