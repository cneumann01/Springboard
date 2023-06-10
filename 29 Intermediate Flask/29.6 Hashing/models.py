from flask import session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.types import Integer, String
db = SQLAlchemy()

bcrypt = Bcrypt()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(Integer, primary_key=True, autoincrement=True)
    username = db.Column(String(20), nullable=False, unique=True)
    password = db.Column(String(100), nullable=False)
    email = db.Column(String(50), nullable=False, unique=True)
    first_name = db.Column(String(30), nullable=False)
    last_name = db.Column(String(30), nullable=False)

    @classmethod
    def register(cls, username, password, email, first_name, last_name):

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")

        User = cls(username=username, password=hashed_utf8, email=email, first_name=first_name, last_name=last_name)

        db.session.add(User)
        return User
    
    @classmethod
    def authenticate(cls, username, password):

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            session['user_id'] = user.id
            return user
        else:
            return False