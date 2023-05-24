"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer
import datetime

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,
                primary_key=True,
                autoincrement=True,)
    posts = relationship('Post', cascade='all, delete')
    first_name = db.Column(db.String(50),
                nullable=False,)
    last_name = db.Column(db.String(50),
                nullable=False)
    image_url = db.Column(db.String(10000))

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)
    title = db.Column(db.String(50),
                    nullable=False,)
    content = db.Column(db.String(10000),
                    nullable=False)
    created_at = db.Column(db.DateTime,
                    default=datetime.datetime.now)
    user_id = db.Column(db.Integer,
                    db.ForeignKey('users.id', ondelete='CASCADE'))


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer,
                primary_key=True,
                autoincrement=True)
    name = db.Column(db.String(50),
                nullable=False)
    posts = relationship('Post', secondary='post_tags', backref='tags')


class PostTag(db.Model):
    __tablename__ = 'post_tags'

    post_id = db.Column(Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(Integer, db.ForeignKey('tags.id'), primary_key=True)
    post = relationship('Post')
    tag = relationship('Tag')

    @property
    def name(self):
        return self.tag.name