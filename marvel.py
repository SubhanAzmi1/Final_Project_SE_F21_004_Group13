"""
    marvel.py
    Contains all the api call functionality for contacting and retreiving from marvel api.
"""
# pylint: disable=no-member, invalid-envvar-default, wrong-import-position, wrong-import-order, R0903, W0603
# Sources:
#   api call setup:
#       https://medium.com/@ash_hathaway/tapping-into-the-marvel-api-b895d54e7ac4
#   marvel:
#       Authoriztion: https://developer.marvel.com/documentation/authorization
#       Results: https://developer.marvel.com/documentation/apiresults

import os
import requests
import time
import hashlib
import json


def create_api_access_hash_string(ts):
    """creates a new access hash string for a query"""

    mini = hashlib.md5()

    mini.update(
        "{}{}{}".format(
            ts, os.getenv("MARVEL_PRI_KEY"), os.getenv("MARVEL_PUB_KEY")
        ).encode("utf-8")
    )

    hash = mini.hexdigest()
    return hash


def get_charac_data(search_word, e_or_sw):  # exact or starts_with.

    ts = time.strftime("%Y%d%m%H%M%S")
    hash = create_api_access_hash_string(ts)
    PUB_KEY = os.getenv("MARVEL_PUB_KEY")
    if e_or_sw == "exact":
        search_parameter1 = "name"
    else:  # starts_with
        search_parameter1 = "nameStartsWith"

    requesturl = f"https://gateway.marvel.com:443/v1/public/characters?{search_parameter1}={search_word}&apikey={PUB_KEY}&limit=5&ts={ts}&hash={hash}"
    print(requesturl)
    response = requests.get(requesturl)

    json_response = response.json()
    data = json_response["data"]

    heroes = []
    for characters in data["results"]:
        heroes.append(characters["name"])

    return heroes


def get_comic_data(search_word, e_or_sw):
    """returns data about comics"""

    ts = time.strftime("%Y%d%m%H%M%S")
    hash = create_api_access_hash_string(ts)
    PUB_KEY = os.getenv("MARVEL_PUB_KEY")
    if e_or_sw == "exact":
        search_parameter1 = "title"
    else:  # starts_with
        search_parameter1 = "titleStartsWith"

    requesturl = f"https://gateway.marvel.com:443/v1/public/comics?{search_parameter1}={search_word}&apikey={PUB_KEY}&limit=5&ts={ts}&hash={hash}"
    print(requesturl)
    response = requests.get(requesturl)

    json_response = response.json()
    data = json_response["data"]
    # title
    # release date
    # url
    #
    titles = []
    release_dates = []
    urls = []
    for comics in data["results"]:
        titles.append(comics["title"])
        release_dates.append(comics["dates"][0]["date"])
        # TOdo: shorten date time string before appending. current: "2021-12-01T00:00:00-0500"
        urls.append(comics["urls"][0]["url"])

    return (titles, release_dates, urls)


# there are 4 different types of searches
# heroes
#   exact
#   startswith
# comics
#   exact
#   startswith
