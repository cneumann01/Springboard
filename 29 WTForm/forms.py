from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField, validators


class AddPetForm(FlaskForm):
    """Form for adding pets."""
    name = StringField('Pet Name', validators=[validators.InputRequired()])
    species = SelectField("Species", choices=[('Dog', 'Dog'), ('Cat', 'Cat'), ('Bird', 'Bird')])
    photo_url = StringField('Photo URL', validators=[
                    validators.URL(), validators.Optional()])
    age = IntegerField('Age', validators=[
                    validators.NumberRange(min=0, max=30)])
    notes = StringField('Notes', validators=[validators.Optional()])
    available = BooleanField('Available', validators=[validators.Optional()])

class EditPetForm(FlaskForm):
    """Form for editing pets."""
    photo_url = StringField('Photo URL', validators=[
                    validators.URL(), validators.Optional()])
    notes = StringField('Notes', validators=[validators.Optional()])
    available = BooleanField('Available', validators=[validators.Optional()])



