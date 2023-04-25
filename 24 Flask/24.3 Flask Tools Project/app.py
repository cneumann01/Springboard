from flask import Flask, render_template, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
import surveys as s

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'
toolbar = DebugToolbarExtension(app)

sat_survey = s.satisfaction_survey
responses = []

@app.route('/')
def home_page():
    return render_template('home.html', title=sat_survey.title, instructions=sat_survey.instructions)

@app.route('/question/<int:question_num>')
def show_question(question_num):
    return render_template('question.html', question=sat_survey.questions[question_num])

@app.route('/answer', methods=['POST'])
def answer_question():
    responses.append(request.form['answer'])
    if len(responses) == len(sat_survey.questions):
        return redirect('/thankyou')
    else:
        return redirect(f'/question/{len(responses)}')

@app.route('/thankyou')
def thank_you():
    return render_template('thankyou.html')
