"""Blogly application."""
from flask import Flask, redirect, render_template, request, flash
from models import db, connect_db, User, Post

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
with app.app_context():
    db.create_all()


@app.route('/')
def home():
    """Redirect to list of users."""
    return redirect('/users')


@app.route('/users')
def list_users():
    """Show all users."""
    users = User.query.all()
    return render_template('list.html', users=users)


@app.route('/users/new')
def new_user_form():
    """Show an add form for users."""
    return render_template('new.html')


@app.route('/users/new', methods=['POST'])
def add_user():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']

    new_user = User(first_name=first_name,
                    last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show information about the given user."""
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id=user_id).all()
    return render_template('show.html', user=user, posts=posts)


@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    """Show edit form for a user."""
    user = User.query.get_or_404(user_id)
    return render_template('edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=['POST'])
def update_user(user_id):
    """Process the edit form, returning the user to the /users page."""
    user = User.query.get(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    """Delete the user."""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')


# XXXXXXXXXXX Post Logic XXXXXXXXXXX
@app.route('/users/<int:user_id>/posts/new')
def new_post_form(user_id):
    """Show an add form for posts."""
    user = User.query.get_or_404(user_id)
    return render_template('new_post.html', user=user)


@app.route('/users/<int:userId>/posts/new', methods=['POST'])
def add_post(userId):
    title = request.form['title']
    content = request.form['content']

    new_post = Post(title=title, content=content, user_id=userId)
    db.session.add(new_post)
    db.session.commit()

    return redirect('/users')


@app.route('/posts/<int:post_id>')
def show_post(post_id):
    """Show a post."""
    post = Post.query.get_or_404(post_id)
    return render_template('show_post.html', post=post)


@app.route('/posts/<int:post_id>/edit')
def edit_post(post_id):
    """Show an edit form for posts."""
    post = Post.query.get_or_404(post_id)
    return render_template('edit_post.html', post=post)


@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def update_post(post_id):
    """Update a post."""
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    db.session.commit()
    return redirect(f'/posts/{post_id}')


@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    """Delete the post."""
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect('/users')
