"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,
                primary_key=True,
                autoincrement=True)
    first_name = db.Column(db.String(50),
                nullable=False,)
    last_name = db.Column(db.String(50),
                nullable=False)
    image_url = db.Column(db.String(10000))

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class Post(db.Column):
    __tablename__ = 'posts'

    id = db.Column(db.Integer,
                primary_key=True,
                autoincrement=True)
    title = db.Column(db.String(50),
                nullable=False,)
    content = db.Column(db.String(10000),
                nullable=False)
    created_at = db.Column(db.DateTime,
                nullable=False,
                default=datetime.datetime.now)
    user_id = db.Column(db.Integer,
                db.ForeignKey('User.id'))
