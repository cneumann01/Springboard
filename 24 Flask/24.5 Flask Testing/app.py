from boggle import Boggle
from flask import Flask, request, render_template, session, flash, jsonify, redirect

app = Flask(__name__)
app.secret_key = 'secret'

boggle_game = Boggle()
board = boggle_game.make_board()
words_found = []
score = 0

@app.route('/')
def game_board():
    """Display game board."""
    flash(f"Current Score: {session['score']}")
    session['board'] = board
    return render_template('board.html', board=board)

@app.route('/check-word')
def check_word():
    """Check if word is valid."""
    word = request.args['word'].lower()
    result = boggle_game.check_valid_word(board, word)
    if result == 'ok':
        session['score'] = session.get('score', 0) + len(word)
        flash(f'Great! You found a word! +{len(word)} points')
    elif result == 'not-on-board':
        flash('That word is not on the board.')
    elif result == 'not-word':
        flash('That is not a valid word.')
    return redirect('/')