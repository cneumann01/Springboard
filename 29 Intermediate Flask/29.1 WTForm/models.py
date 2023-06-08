from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer
import datetime

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)


class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer,
                primary_key=True,
                autoincrement=True,)

    name = db.Column(db.String(100))
    species = db.Column(db.String(50))
    photo_url = db.Column(db.String(5000))
    age = db.Column(db.Integer) 
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean)
