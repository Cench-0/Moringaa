from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)  # Enable CORS for cross-origin requests

    # Register Blueprints
    from .routes import bp as main_bp
    app.register_blueprint(main_bp)

    return app

# Import models here to ensure they are registered with SQLAlchemy
from .models import User, Pair
