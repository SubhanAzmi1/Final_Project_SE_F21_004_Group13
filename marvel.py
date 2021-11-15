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
    # print(requesturl)
    response = requests.get(requesturl)

    json_response = response.json()
    data = json_response["data"]

    names = []
    modified_dates = []
    image_urls = []
    descriptions = []
    ids = []
    for characters in data["results"]:
        names.append(characters["name"])

        descriptions.append(characters["description"])

        image_urls.append(
            characters["thumbnail"]["path"] + "." + characters["thumbnail"]["extension"]
        )

        unmodified = str(characters["modified"])
        modified = unmodified.partition("T")[0]
        modified_dates.append(modified)

        ids.append(characters["id"])

    return (names, modified_dates, image_urls, descriptions, ids)


def get_comic_data(search_word, e_or_sw):
    """returns data about comics"""

    ts = time.strftime("%Y%d%m%H%M%S")
    hash = create_api_access_hash_string(ts)
    PUB_KEY = os.getenv("MARVEL_PUB_KEY")
    if e_or_sw == "exact":
        search_parameter1 = "title"
    else:  # starts_with
        search_parameter1 = "titleStartsWith"

    requesturl = f"https://gateway.marvel.com:443/v1/public/comics?noVariants=true&{search_parameter1}={search_word}&apikey={PUB_KEY}&limit=5&ts={ts}&hash={hash}"
    # print(requesturl)
    response = requests.get(requesturl)

    json_response = response.json()
    data = json_response["data"]
    # title
    # release date
    # url
    #
    titles = []
    release_dates = []
    image_urls = []
    series = []
    ids = []
    for comics in data["results"]:
        titles.append(comics["title"])

        unmodified = str(comics["dates"][0]["date"])
        modified = unmodified.partition("T")[0]
        release_dates.append(modified)

        # urls.append(comics["urls"][0]["url"])
        # this is for digital webpage

        image_urls.append(
            comics["thumbnail"]["path"] + "." + comics["thumbnail"]["extension"]
        )

        series.append(comics["series"]["name"])

        ids.append(comics["id"])

    return (titles, release_dates, image_urls, series, ids)


# there are 4 different types of searches
# heroes
#   exact
#   startswith
# comics
#   exact
#   startswith
