from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from forms import AddPetForm

app = Flask(__name__)

@app.route('/add')
def add_pet():
    form = AddPetForm()
    return render_template("add_pet_form.html", form=form)
