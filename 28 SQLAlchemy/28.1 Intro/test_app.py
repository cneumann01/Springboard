from flask_testing import TestCase
from models import db, User
from app import app


class BloglyTestCase(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['WTF_CSRF_ENABLED'] = False
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


    def test_list_users(self):
        response = self.client.get('/users')
        self.assert200(response)


    def test_new_user_form(self):
        response = self.client.get('/users/new')
        self.assert200(response)


    def test_add_user(self):
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'image_url': 'https://example.com/johndoe.jpg'
        }
        response = self.client.post('/users/new', data=data, follow_redirects=True)
        self.assert200(response)


    def test_show_user(self):
        user = User(first_name='John', last_name='Doe', image_url='https://example.com/johndoe.jpg')
        db.session.add(user)
        db.session.commit()
        response = self.client.get(f'/users/{user.id}')
        self.assert200(response)


    def test_edit_user(self):
        user = User(first_name='John', last_name='Doe', image_url='https://example.com/johndoe.jpg')
        db.session.add(user)
        db.session.commit()
        response = self.client.get(f'/users/{user.id}/edit')
        self.assert200(response)
    

    def test_update_user(self):
        user = User(first_name='John', last_name='Doe', image_url='https://example.com/johndoe.jpg')
        db.session.add(user)
        db.session.commit()
        data = {
            'first_name': 'Updated',
            'last_name': 'User',
            'image_url': 'https://example.com/updated.jpg'
        }
        response = self.client.post(f'/users/{user.id}/edit', data=data, follow_redirects=True)
        self.assert200(response)
        

    def test_delete_user(self):
        user = User(first_name='John', last_name='Doe', image_url='https://example.com/johndoe.jpg')
        db.session.add(user)
        db.session.commit()
        response = self.client.post(f'/users/{user.id}/delete', follow_redirects=True)
        self.assert200(response)
        

    def test_new_post_form(self):
        user = User(first_name='John', last_name='Doe', image_url='https://example.com/johndoe.jpg')
        db.session.add(user)
        db.session.commit()
        response = self.client.get(f'/users/{user.id}/posts/new')
        self.assert200(response)

