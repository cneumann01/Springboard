from flask import Flask, render_template, redirect, flash, session
from models import connect_db, User, db, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///hashing'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

with app.app_context():
    connect_db(app)

@app.route('/')
def home():
    if 'user_id' in session:
        user = User.query.filter_by(id=session['user_id']).first()
        return redirect(f'/users/{user.username}')
    else:
        flash ("Please login first!")
        return redirect('/login')

@app.route('/users/<username>')
def show_user(username):
    if 'user_id' not in session:
        flash("Please login first!")
        return redirect('/login')
    else:
        user = User.query.filter_by(username=username).first()
        all_feedback = Feedback.query.all()
        return render_template('user.html', user=user, all_feedback=all_feedback)
    
@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if 'user_id' not in session:
        flash("Please login first!")
        return redirect('/login')
    else:
        user = User.query.filter_by(username=username).first()
        db.session.delete(user)
        db.session.commit()
        flash("User deleted.")
        return redirect('/login')

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    if 'user_id' not in session:
        flash("Please login first!")
        return redirect('/login')
    else:
        form = FeedbackForm()
        user = User.query.filter_by(username=username).first()
        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            username = user.username
            new_feedback = Feedback(title=title, content=content, username=username)
            db.session.add(new_feedback)
            db.session.commit()
            flash("Feedback added.")
            return redirect(f'/users/{username}')

        return render_template('feedback.html', user=user, form=form)
    
@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    if 'user_id' not in session:
        flash("Please login first!")
        return redirect('/login')

    feedback = Feedback.query.get_or_404(feedback_id)
    if feedback.user_id != session['user_id']:
        flash("You do not have permission to do that.")
        return redirect('/')
    
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        flash("Feedback updated.")
        return redirect(f'/users/{feedback.username}')

    return render_template('edit_feedback.html', form=form, feedback=feedback)

    
@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    if 'user_id' not in session:
        flash("Please login first!")
        return redirect('/login')
    else:
        feedback = Feedback.query.get_or_404(feedback_id)
        if feedback.user_id != session['user_id']:
            flash("You do not have permission to do that.")
            return redirect('/')
        elif feedback.user_id == session['user_id']:
            username = feedback.username
            db.session.delete(feedback)
            db.session.commit()
            flash("Feedback deleted.")
            return redirect(f'/users/{username}')

@app.route('/register', methods=['GET', 'POST'])
def register_user():
    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username, password, email, first_name, last_name)
        session['user_id'] = new_user.id
        db.session.add(new_user)
        db.session.commit()

        return redirect(f'/users/{username}')
    
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_user():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username,password)
        if user:
            flash(f"Welcome back, {user.username}!")
            session['user_id'] = user.id
            return redirect(f'/users/{username}')
        else:
            form.username.errors = ['Invalid username/password']
    
    return render_template('login.html', form=form)

@app.route('/logout')
def logout_user():
    session.pop('user_id')
    flash("Successfully logged out.")
    return redirect('/login')

