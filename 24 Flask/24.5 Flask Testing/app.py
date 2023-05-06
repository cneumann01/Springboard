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
    # Keeps track of whether or not a game is in progress.
    session['game_in_progress'] = True
    """Display game board."""
    return render_template('board.html', board=board, score=score)

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

@app.route('/game-over')
def game_over():
    if not session.get('game_in_progress', False):
        return redirect('/reset')
    
    global score
    if score > session.get('high_score', 0):
        session['high_score'] = score
    high_score = session.get('high_score', 0)
    final_score = 0 + score
    score = 0

    session['game_in_progress'] = False

    """Display game over page."""
    return render_template('game-over.html', final_score=final_score, words_found=words_found, board=board, high_score=high_score)

@app.route('/reset')
def reset():
    global score
    global words_found
    global board
    """Resets game."""
    score = 0
    words_found = []
    board = boggle_game.make_board()
    session['board'] = board
    return redirect('/')