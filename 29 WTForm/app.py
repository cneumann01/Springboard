from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from forms import AddPetForm, EditPetForm
from models import db, connect_db, Pet

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
with app.app_context():
    db.create_all()


@app.route('/')
def list_pets():
    """List all pets."""
    pets = Pet.query.all()
    return render_template("list_pets.html", pets=pets)


@app.route('/add', methods=["GET", "POST"])
def add_pet():
    """Show add-pet form and handle form submission."""
    form = AddPetForm()
    if form.validate_on_submit():
        db.session.add(Pet(name=form.name.data, species=form.species.data, photo_url=form.photo_url.data, age=form.age.data, notes=form.notes.data, available=form.available.data))
        db.session.commit()
        return redirect('/')
    else:
        return render_template("add_pet_form.html", form=form)
    
@app.route('/<int:pet_id>', methods=["GET", "POST"])
def pet_details(pet_id):
    """List details about a single pet."""

    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)
    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
    return render_template("pet_details.html", pet=pet, form=form)

    