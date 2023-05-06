from unittest import TestCase
from app import app
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        self.boggle_game = Boggle()
        self.board = self.boggle_game.make_board()

    def test_make_board(self):
        self.assertEqual(len(self.board), 5)
        for row in self.board:
            self.assertEqual(len(row), 5)

    def test_check_valid_word(self):
        self.assertTrue(self.boggle_game.check_valid_word(self.board, 'cat'))
        self.assertEqual(self.boggle_game.check_valid_word(self.board, 'xyz'), 'not-word')
        self.assertEqual(self.boggle_game.check_valid_word(self.board, ' '), 'not-word')


class TestRoutes(TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()

    def test_game_board(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)


    def test_game_over(self):
        response = self.client.get('/game-over')
        self.assertEqual(response.status_code, 302)


    def test_reset(self):
        response = self.client.get('/reset')
        self.assertEqual(response.status_code, 302)
