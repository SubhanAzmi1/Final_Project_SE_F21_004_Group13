"""
Flask app logic for P1M3
"""
# pylint: disable=no-member
# pylint: disable=too-few-public-methods
import os
import json
import random

import flask

from dotenv import load_dotenv, find_dotenv
from flask_login import (
    login_user,
    current_user,
    LoginManager,
    UserMixin,
    login_required,
)
from flask_sqlalchemy import SQLAlchemy

from genius import get_lyrics_link
from spotify import get_access_token, get_song_data
from marvel import get_charac_data, get_comic_data

load_dotenv(find_dotenv())

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
# GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
# GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

# from oauthlib.oauth2 import WebApplicationClient

# client = WebApplicationClient(GOOGLE_CLIENT_ID)

app = flask.Flask(__name__, static_folder="./build/static")

# Point SQLAlchemy to your Heroku database
db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = db_url
# Gets rid of a warning

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.secret_key = (os.getenv("F_SECRET_KEY")).encode(
    "utf_8"
)  # don't defraud my app ok? I wont.

db = SQLAlchemy(app)

# The database structure for the project
class User(UserMixin, db.Model):
    """
    User account here
    """

    id = db.Column("id", db.Integer, primary_key=True)
    username = db.Column("name", db.String(80), nullable=False)
    email = db.Column("email", db.String(200), unique=True, nullable=False)

    # Important for listing heroes and comics
    heroes = db.relationship(
        "Hero", backref="account", lazy="dynamic", cascade="all, delete-orphan"
    )

    comics = db.relationship(
        "Comic", backref="account", lazy="dynamic", cascade="all, delete-orphan"
    )

    def __repr__(self):
        """
        Determines what happens when we print an instance of the class
        """
        return f"<User {self.username}>"

    def get_username(self):
        """
        Getter for username attribute
        """
        return self.username


class Hero(db.Model):
    """
    Heroes here
    """

    id = db.Column("id", db.Integer, primary_key=True)
    hero_id = db.Column("hero_id", db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return "<Hero %r>" % self.hero_id


class Comic(db.Model):
    """
    Comics here
    """

    id = db.Column("id", db.Integer, primary_key=True)
    comic_id = db.Column("comic_id", db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return "<Hero %r>" % self.comic_id


# db.drop_all()
db.create_all()

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_name):
    """
    Required by flask_login
    """
    return User.query.get(user_name)


bp = flask.Blueprint("bp", __name__, template_folder="./build")


@bp.route("/login")
# @login_required
def login():
    """
    Main page. Fetches song data and embeds it in the returned HTML. Returns
    dummy data if something goes wrong.
    """
    # artists = Hero.query.filter_by(username=current_user.username).all()
    # artist_ids = [a.artist_id for a in artists]
    # has_artists_saved = len(artist_ids) > 0
    # if has_artists_saved:
    #     artist_id = random.choice(artist_ids)

    #     # API calls
    #     access_token = get_access_token()
    #     (song_name, song_artist, song_image_url, preview_url) = get_song_data(
    #         artist_id, access_token
    #     )
    #     genius_url = get_lyrics_link(song_name)

    # else:
    #     (song_name, song_artist, song_image_url, preview_url, genius_url) = (
    #         None,
    #         None,
    #         None,
    #         None,
    #         None,
    #     )

    # data = json.dumps(
    #     {
    #         "username": current_user.username,
    #         "artist_ids": artist_ids,
    #         "has_artists_saved": has_artists_saved,
    #         "song_name": song_name,
    #         "song_artist": song_artist,
    #         "song_image_url": song_image_url,
    #         "preview_url": preview_url,
    #         "genius_url": genius_url,
    #     }
    # )
    return flask.render_template(
        "index.html",
        # data=data,
    )


app.register_blueprint(bp)


@app.route("/signup")
def signup():
    """
    Signup endpoint for GET requests
    """
    return flask.render_template("signup.html")


@app.route("/signup", methods=["POST"])
def signup_post():
    """
    Handler for signup form data
    """
    username = flask.request.form.get("username")
    user = User.query.filter_by(username=username).first()
    if user:
        pass
    else:
        user = User(username=username)
        db.session.add(user)
        db.session.commit()

    return flask.redirect(flask.url_for("login"))


# @app.route("/login")
# def login():
#     """
#     Login endpoint for GET requests
#     """
#     return flask.render_template("login.html")


@app.route("/login", methods=["POST"])
def login_post():
    """
    Handler for login form data
    """
    username = flask.request.form.get("username")
    user = User.query.filter_by(username=username).first()
    if user:
        login_user(user)
        return flask.redirect(flask.url_for("bp.index"))

    return flask.jsonify({"status": 401, "reason": "Username or Password Error"})


@app.route("/save", methods=["POST"])
def save():
    """
    Receives JSON data from App.js, filters out invalid artist IDs, and
    updates the DB to contain all valid ones and nothing else.
    """
    artist_ids = flask.request.json.get("artist_ids")
    valid_ids = set()
    for artist_id in artist_ids:
        try:
            access_token = get_access_token()
            get_song_data(artist_id, access_token)
            valid_ids.add(artist_id)
        except KeyError:
            pass

    username = current_user.username
    update_db_ids_for_user(username, valid_ids)

    response = {"artist_ids": [a for a in artist_ids if a in valid_ids]}
    return flask.jsonify(response)


@app.route("/login_google_authenticate", methods=["POST"])
def login_google_authenticate():
    """
    Receives google id_token from App.js; verifies token belonging to app;
    get user info from google;
    checks for user in database otherwise creates one;
    returns user_data for main page.
    """
    token = flask.request.json.get("token")
    email = flask.request.json.get("email")
    f_name = flask.request.json.get("fName")
    image_url = flask.request.json.get("imageUrl")

    # validate token
    # retreive info from token like user name and email, maybe pic too
    # SKIPPING THE PREVIOS TWO FOR NOW BY JUST GETTING INFO FROM FRONT ON SUCCESS LOGIN

    # check if user in database via unique email
    user = User.query.filter_by(email=email).first()
    if user:
        # if so then response = data from database
        #   update name if user has updated on google.
        if user.username != f_name:
            user.username = f_name
            db.session.commit()
    else:
        user = User(email=email, username=f_name)
        db.session.add(user)
        db.session.commit()
    # if so then response = data from database

    # otherwise add new user
    # response stuff is mostly null.
    data = {
        "username": user.username,
        "artist_ids": [],
        "has_artists_saved": False,
        "userId": user.id,
        # "song_name": None,
        # "song_artist": None,
        # "song_image_url": None,
        # "preview_url": None,
        # "genius_url": None,
    }
    # print(id_token)
    # print(response)
    return flask.jsonify(data)


@app.route("/marvelLookupHero", methods=["POST"])
def marvelLookupHero():
    """
    Returns info about characters based on search word.
    Utilizes marvel.py to contact marvel api.
    """
    searchText = flask.request.json.get("text")
    starts = "other"
    names, modified_dates, image_urls, descriptions, ids = get_charac_data(
        searchText, starts
    )

    searchResult = {
        "names": names,
        "modified_dates": modified_dates,
        "image_urls": image_urls,
        "descriptions": descriptions,
        "ids": ids,
    }
    print("heroes results: ")
    print(names)
    print(modified_dates)
    print(image_urls)
    print(descriptions)
    print(ids)
    return flask.jsonify(searchResult)


@app.route("/marvelLookupComic", methods=["POST"])
def marvelLookupComic():
    """
    Returns info about comics based on search word.
    Utilizes marvel.py to contact marvel api.
    """
    searchText = flask.request.json.get("text")
    # print("searchText is: " + searchText)
    starts = "other"
    titles, release_dates, image_urls, series, ids = get_comic_data(searchText, starts)

    searchResult = {
        "titles": titles,
        "release_dates": release_dates,
        "image_urls": image_urls,
        "series": series,
        "ids": ids,
    }
    print("titles results: ")
    print(titles)
    print(release_dates)
    print(image_urls)
    print(series)
    print(ids)
    return flask.jsonify(searchResult)


def update_db_ids_for_user(username, valid_ids):
    """
    Updates the DB so that only entries for valid_ids exist in it.
    @param username: the username of the current user
    @param valid_ids: a set of artist IDs that the DB should update itself
        to reflect
    """
    existing_ids = {v.artist_id for v in Hero.query.filter_by(username=username).all()}
    new_ids = valid_ids - existing_ids
    for new_id in new_ids:
        db.session.add(Hero(artist_id=new_id, username=username))
    if len(existing_ids - valid_ids) > 0:
        for hero in Hero.query.filter_by(username=username).filter(
            Hero.artist_id.notin_(valid_ids)
        ):
            db.session.delete(hero)
    db.session.commit()


@app.route("/")
def main():
    """
    Main page just reroutes to login.
    """
    # if current_user.is_authenticated:
    return flask.redirect(flask.url_for("bp.login"))
    # return flask.redirect(flask.url_for("login"))


if __name__ == "__main__":
    # app.run(
    #     debug=True,
    #     port=int(os.getenv("PORT", "8081")),
    #     ssl_context="adhoc",
    # )
    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", "8081")),
        ssl_context="adhoc",
    )
