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
    flash(f"Current Score: {score}")
    session['board'] = board
    return render_template('board.html', board=board)

@app.route('/check-word')
def check_word():
    """Allows local access to score variable."""
    global score
    """Check if word is valid."""
    word = request.args['word'].lower()
    result = boggle_game.check_valid_word(board, word)
    if word in words_found:
        flash('You already found that word!')
    elif result == 'ok':
        score += len(word)
        flash(f'Great! You found a word! +{len(word)} points')
        words_found.append(word)
    elif result == 'not-on-board':
        flash('That word is not on the board.')
    elif result == 'not-word':
        flash('That is not a valid word.')
    return redirect('/')