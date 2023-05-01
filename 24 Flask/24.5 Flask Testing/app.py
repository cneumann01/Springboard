from boggle import Boggle
from flask import Flask, request, render_template, session

app = Flask(__name__)
app.secret_key = 'secret'

boggle_game = Boggle()
board = boggle_game.make_board()

@app.route('/')
def game_board():
    """Display game board."""
    session['board'] = board
    return render_template('board.html', board=board)

