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

#Route to generate random pairs for the week
@bp.route('/pairs/generate', methods = ['POST'])  
def generate_pairs():
    week = datetime.utcnow().isocalendar()[1]

    #Get all user IDs
    users = User.query.all()
    users_ids = [user.id for user in users]
    random.shuffle(users_ids)

    #An even number of users for pairing
    if len(users_ids) % 2 !=0:
        users_ids.pop()

    pairs = []    
    for i in range(0, len(users_ids), 2):
        user1_id = users_ids[i]
        user2_id = users_ids[i + 1]

    #Check if this pair has been created before for the same week
    existing_pair = Pair.query.filter_by(user1_id = user1_id, user2_id=user2_id, week=week).first()
    if not existing_pair:
        pair = Pair(user1_id=user1_id, user2_id=user2_id, week=week)
        db.session.add(pair)
        pairs.append((user1_id, user2_id))


    db.session.commit()    
    return jsonify({'message': 'Pairs generated', 'pairs': pairs}), 201

#Route to get pairing history
@bp.route('/pairs/history', methods=['GET'])
def get_pairing_history():
    week = request.args.get('week', type = int)
    query= Pair.query

    #Filter by week
    if week:
        query = query.filter_by(week=week)

    pairs = query.all()    
    pair_list = [{
        'id': pair.id,
        'user1': pair.user1.username,
        'user2': pair.user2.username,
        'week': pair.week,
        'created_at': pair.created_at
    } for pair in pairs]

    return jsonify({'pairs': pair_list}), 200

#Route to view current user
@bp.route('/user', methods=['GET'])    
def get_current_user():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'message': 'Not logged in'}), 401

    user = User.query.get(user_id)    
    return jsonify({'id': user.id, 'username': user.name, 'created_at': user.created_at}), 200

