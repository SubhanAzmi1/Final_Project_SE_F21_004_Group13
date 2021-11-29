"""
Flask app logic for P1M3
"""
# pylint: disable=no-member
# pylint: disable=too-few-public-methods

# sources:
#   find specific in list_dict: https://www.geeksforgeeks.org/python-find-dictionary-matching-value-in-list/
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
    hero_id = db.Column("hero_id", db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    image_link = db.Column("image_link", db.String, nullable=False)
    name = db.Column("name", db.String, nullable=False)
    date_modified = db.Column("date_modified", db.String, nullable=False)
    description = db.Column("description", db.String, nullable=False)

    def __repr__(self):
        return "<Hero %r>" % self.hero_id


class Comic(db.Model):
    """
    Comics here
    """

    id = db.Column("id", db.Integer, primary_key=True)
    comic_id = db.Column("comic_id", db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    image_link = db.Column("image_link", db.String, nullable=False)
    name = db.Column("name", db.String, nullable=False)
    date_modified = db.Column("date_modified", db.String, nullable=False)
    description = db.Column("description", db.String, nullable=False)

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


@app.route("/get_User_Heroes", methods=["POST"])
def get_User_Heroes():
    """
    Get users saved heroes from the database
    """
    id = flask.request.json.get("userIdS")
    characters = Hero.query.filter_by(user_id=id).all()

    has_hero_saved = len(characters) > 0

    DATA = []

    if has_hero_saved:
        for charac in characters:
            DATA.append(
                {
                    "heroId": charac.hero_id,
                    "heroName": charac.name,
                    "heroDateModified": charac.date_modified,
                    "heroImageLink": charac.image_link,
                    "heroDescription": charac.description,
                }
            )
    else:
        pass

    return flask.jsonify(DATA)


@app.route("/get_User_Comics", methods=["POST"])
def get_User_Comics():
    """
    Get users saved comics from the database
    """
    id = flask.request.json.get("userIdS")
    comics = Comic.query.filter_by(user_id=id).all()
    has_comic_saved = len(comics) > 0

    DATA = []

    if has_comic_saved:
        for comic in comics:
            DATA.append(
                {
                    "comicId": comic.comic_id,
                    "comicName": comic.name,
                    "comicDatePublished": comic.date_modified,
                    "comicImageLink": comic.image_link,
                    "comicSeries": comic.description,
                }
            )
    else:
        pass
    return flask.jsonify(DATA)


@app.route("/marvelMakeChangesToDatabase", methods=["POST"])
def marvelMakeChangesToDatabase():
    """
    Saves favorites from front end to database
    """
    heroes_fe = flask.request.json.get("FEHeroes")
    print(heroes_fe)
    comics_fe = flask.request.json.get("FEComics")
    print(comics_fe)

    h_fe_ids = [h["heroId"] for h in heroes_fe]
    c_fe_ids = [c["comicId"] for c in comics_fe]

    id = flask.request.json.get("userIdS")

    user_saved_heroes = Hero.query.filter_by(user_id=id).all()
    hero_ids = [a.hero_id for a in user_saved_heroes]

    user_saved_comics = Comic.query.filter_by(user_id=id).all()
    comic_ids = [a.comic_id for a in user_saved_comics]

    has_hero_saved = len(user_saved_heroes) > 0
    has_comic_saved = len(user_saved_comics) > 0

    if has_hero_saved:
        # do compare with old
        # run queries on whether
        not_common_h = set(h_fe_ids).symmetric_difference(set(hero_ids))

        for each in not_common_h:
            # if its in old delete it
            if each in hero_ids:
                hero_to_remove = Hero.query.filter_by(user_id=id, hero_id=each).first()
                db.session.delete(hero_to_remove)
                db.session.commit()
            # if its not in old then add it
            else:
                # get data from dict passed from frontend, each=heroid
                specific_hero = {}
                for hero in heroes_fe:
                    if hero["heroId"] == each:
                        specific_hero = hero
                image_link_fe = specific_hero["heroImageLink"]
                name_fe = specific_hero["heroName"]
                date_modified_fe = specific_hero["heroDateModified"]
                description_fe = specific_hero["heroDescription"]
                db.session.add(
                    Hero(
                        hero_id=each,
                        user_id=id,
                        image_link=image_link_fe,
                        name=name_fe,
                        date_modified=date_modified_fe,
                        description=description_fe,
                    )
                )
                db.session.commit()
    else:

        # if len(newFaves) == 0:
        # previous if handles this by asserting that there are none in database so nothing to do.

        # there could be none previous saved but miltiple added
        # if new stuff is to be added then add.
        if len(heroes_fe) != 0:
            for each in heroes_fe:
                db.session.add(
                    Hero(
                        hero_id=each["heroId"],
                        user_id=id,
                        image_link=each["heroImageLink"],
                        name=each["heroName"],
                        date_modified=each["heroDateModified"],
                        description=each["heroDescription"],
                    )
                )
                db.session.commit()

    if has_comic_saved:
        not_common_c = set(c_fe_ids).symmetric_difference(set(comic_ids))

        for each in not_common_c:
            if each in comic_ids:
                comic_to_remove = Comic.query.filter_by(
                    user_id=id, comic_id=each
                ).first()
                db.session.delete(comic_to_remove)
                db.session.commit()
            else:
                # get data from dict passed from frontend
                specific_comic = {}
                for comic in comics_fe:
                    if comic["comicId"] == each:
                        specific_comic = comic
                image_link_fe = specific_comic["comicImageLink"]
                name_fe = specific_comic["comicName"]
                date_modified_fe = specific_comic["comicDatePublished"]
                description_fe = specific_comic["comicSeries"]
                db.session.add(
                    Comic(
                        comic_id=each,
                        user_id=id,
                        image_link=image_link_fe,
                        name=name_fe,
                        date_modified=date_modified_fe,
                        description=description_fe,
                    )
                )
                db.session.commit()
    else:

        # if len(newFaves) == 0:
        # previous if handles this by asserting that there are none in database so nothing to do.

        # there could be none previous saved but miltiple added
        # if new stuff is to be added then add.
        if len(comics_fe) != 0:
            for each in comics_fe:
                db.session.add(
                    Comic(
                        comic_id=each["comicId"],
                        user_id=id,
                        image_link=each["comicImageLink"],
                        name=each["comicName"],
                        date_modified=each["comicDatePublished"],
                        description=each["comicSeries"],
                    )
                )
                db.session.commit()

    print(heroes_fe)
    print(comics_fe)
    return flask.jsonify("we good in back here")


"""  # modularize the call to the database
    def updateDatabase(frontEndListOfDicts, hero_or_comic, id):
    user_saved = hero_or_comic.query.filter_by(user_id=id) """


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
        "userId": user.id,
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
    # print("heroes results: ")
    # print(names)
    # print(modified_dates)
    # print(image_urls)
    # print(descriptions)
    # print(ids)
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
    # print("titles results: ")
    # print(titles)
    # print(release_dates)
    # print(image_urls)
    # print(series)
    # print(ids)
    return flask.jsonify(searchResult)


def update_db_ids_for_user(user_id, valid_ids):
    """
    Updates the DB so that only entries for valid_ids exist in it.
    @param username: the username of the current user
    @param valid_ids: a set of artist IDs that the DB should update itself
        to reflect
    """
    existing_ids = {v.hero_id for v in Hero.query.filter_by(user_id=user_id).all()}
    new_ids = valid_ids - existing_ids
    for new_id in new_ids:
        db.session.add(Hero(hero_id=new_id, user_id=user_id))
    if len(existing_ids - valid_ids) > 0:
        for hero in Hero.query.filter_by(user_id=user_id).filter(
            Hero.hero_id.notin_(valid_ids)
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
    app.run(
        debug=True,
        port=int(os.getenv("PORT", "8081")),
    )
    # app.run(
    #     host=os.getenv("IP", "0.0.0.0"),
    #     port=int(os.getenv("PORT", "8081")),
    # )
