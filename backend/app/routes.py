from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, Pair
from .import db
from datetime import datetime
import random


#the blueprint
bp = Blueprint('main', __name__)


#route for creating new user
@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')


    #check if user already exists
    if User.query.filter_by(username=username).first():
        return jsonify({'message:' 'User already exists'}), 400

    #Hash the password and create user
    password_hash = generate_password_hash(password)    
    new_user = User (username = username, password_hash = password_hash)

    db.sesssion.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

#Route to login user
@bp.route('/login', methods = ['POST'])    
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        session['user_id'] = user.user_id
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'message': 'Invalid username or password'}), 401
        
