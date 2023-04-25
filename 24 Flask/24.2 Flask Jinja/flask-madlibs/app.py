from flask import Flask, render_template, request
from stories import Story

app = Flask(__name__)


prompts = [
    'place',
    'adjective1',
    'noun1',
    'name',
    'verb1',
    'verb2',
    'adjective2',
    'verb3',
    'noun2',
    'adjective3',
    'noun3',
    'name2',
    'adjective4',
    'noun4',
    'verb4',
    'noun5',
    'adjective5',
    'noun6',
    'verb5',
    'adjective6',
    'noun7',
    'adjective7',
    'noun8',
    'verb6',
    'noun9'
]

story_template = "Once upon a time, in a far-off land called {place}, there lived a {adjective1} {noun1} named {name}. {name} was known throughout the land for {verb1} and {verb2}. One day, {name} decided to set out on a {adjective2} adventure to {verb3} the {noun2}. Along the way, {name} met a {adjective3} {noun3} named {name2}. Together, they traveled across the {adjective4} {noun4}, encountering many dangers and {verb4} {noun5}s. At last, they arrived at the {adjective5} {noun6}, where they faced a final challenge: {verb5} the {adjective6} {noun7}. With their {adjective7} {noun8}s and quick {verb6}, {name} and {name2} emerged victorious! From that day forward, they were known as the greatest {noun9}s in all the land of {place}."

@app.route('/')
def new_story():
    """Show form to fill out story."""
    return render_template("new_story_form.html", prompts=prompts)


@app.route('/story', methods=['POST'])
def submit():
    # Get the form data dynamically using the prompts list
    data = {}
    for prompt in request.form:
        data[prompt] = request.form[prompt]

    # Create a new story using the form data
    story = Story(data.keys(), story_template)

    # Generate the story text using the form data
    story_text = story.generate(data)

    # Render the story template with the new story text
    return render_template('story.html', story_text=story_text)
