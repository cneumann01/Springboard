from flask import Flask, render_template, request, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
import surveys as s

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

sat_survey = s.satisfaction_survey
responses = []

@app.route('/')
def home_page():
    return render_template('home.html', title=sat_survey.title, instructions=sat_survey.instructions)

@app.route('/init')
def init():
    responses = []
    session['responses'] = responses
    return redirect('/question/0')

@app.route('/question/<int:question_num>')
def show_question(question_num):
    responses = session['responses']
    if len(responses) != question_num:
        flash(f'Please answer the questions in order. Thanks!')
        return redirect(f'/question/{len(responses)}')
    return render_template('question.html', title=sat_survey.title, question=sat_survey.questions[question_num])

@app.route('/answer', methods=['POST'])
def answer_question():
    responses = session['responses']
    responses.append(request.form['answer'])
    session['responses'] = responses
    if len(responses) == len(sat_survey.questions):
        return redirect('/thankyou')
    else:
        return redirect(f'/question/{len(responses)}')

@app.route('/thankyou')
def thank_you():
    return render_template('thankyou.html')
