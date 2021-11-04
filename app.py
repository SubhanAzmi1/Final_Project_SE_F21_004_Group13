import flask
from flask_login.utils import login_required
import os
import json

import flask_sqlalchemy as alch

app = flask.Flask(__name__, static_folder='./build/static')
# This tells our Flask app to look at the results of `npm build` instead of the 
# actual files in /templates when we're looking for the index page file. This allows
# us to load React code into a webpage. Look up create-react-app for more reading on
# why this is necessary.
bp = flask.Blueprint("bp", __name__, template_folder="./build")


db = alch(app)

# The database structure for the project
class Account(db.Model):
    """
    User account here
    """

    id = db.Column("id", db.Integer, primary_key=True)
    name = db.Column("name", db.String, unique=True, nullable=False)
    password = db.Column("passwd", db.String, nullable=False)

    # Important for listing heroes and comics
    heroes = db.relationship(
        "Hero", backref="account", lazy="dynamic", cascade="all, delete-orphan"
    )

    comics = db.relationship(
        "Comic", backref="account", lazy="dynamic", cascade="all, delete-orphan"
    )

    def __repr__(self):
        return "<Account %r>" % self.name

class Hero(db.Model):
    """
    Heroes here
    """

    id = db.Column("id", db.Integer, primary_key=True)
    hero_id = db.Column("hero_id", db.String, nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey("account.id"), nullable=False)

    def __repr__(self):
        return "<Hero %r>" % self.hero_id

class Comic(db.Model):
    """
    Comics here
    """

    id = db.Column("id", db.Integer, primary_key=True)
    comic_id = db.Column("comic_id", db.String, nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey("account.id"), nullable=False)

    def __repr__(self):
        return "<Hero %r>" % self.comic_id

@bp.route('/index')
@login_required
def index():
    # TODO: insert the data fetched by your app main page here as a JSON
    DATA = {"your": "data here"}
    data = json.dumps(DATA)
    return flask.render_template(
        "index.html",
        data=data,
    )

app.register_blueprint(bp)

@app.route('/signup')
def signup():
	...

@app.route('/signup', methods=["POST"])
def signup_post():
	...

@app.route('/login')
def login():
    ...

@app.route('/login', methods=["POST"])
def login_post():
	...

@app.route('/save', methods=["POST"])
def save():
    ...


@app.route('/')
def main():
	...




app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8081)),
)
