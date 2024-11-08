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
