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
#   random sampling: https://stackoverflow.com/questions/48246528/how-do-i-generate-random-but-unique-numbers-in-python
#       https://stackoverflow.com/questions/68167851/valueerror-sample-larger-than-population-or-is-negative

import os
import requests
import time
import hashlib
import json
import random
import string


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
    names = None
    modified_dates = None
    image_urls = None
    descriptions = None
    comics = None
    ids = None
    try:
        response = requests.get(requesturl)

        json_response = response.json()
        data = json_response["data"]

        names = []
        modified_dates = []
        image_urls = []
        descriptions = []
        comics = []
        ids = []

        for characters in data["results"]:
            names.append(characters["name"])

            descriptions.append(characters["description"])

            image_urls.append(
                characters["thumbnail"]["path"]
                + "."
                + characters["thumbnail"]["extension"]
            )

            unmodified = str(characters["modified"])
            modified = unmodified.partition("T")[0]
            modified_dates.append(modified)

            comics_top_limit = min(len(characters["comics"]["items"]), 3)
            rand_trio = []
            if comics_top_limit > 0:
                if comics_top_limit < 3:
                    rand_trio = random.sample(
                        range(0, len(characters["comics"]["items"])),
                        len(characters["comics"]["items"]),
                    )
                else:
                    rand_trio = random.sample(
                        range(0, len(characters["comics"]["items"])), 3
                    )
                # print(rand_trio)
            comics_combined = ""
            for i in rand_trio:
                # print(comics_combined)
                comics_combined = (
                    comics_combined
                    + "'"
                    + characters["comics"]["items"][i]["name"]
                    + "'"
                    + ", "
                )
            comics.append(comics_combined)

            ids.append(characters["id"])

    except KeyError:
        pass
    return (names, modified_dates, image_urls, descriptions, ids, comics)


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
    print(requesturl)
    response = requests.get(requesturl)

    json_response = response.json()
    # print(json_response)
    titles = []
    release_dates = []
    image_urls = []
    series = []
    ids = []
    characters = []
    try:
        data = json_response["data"]
        # title
        # release date
        # url
        #

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

            characters_top_limit = min(len(comics["characters"]["items"]), 3)
            # 3 random numbers within the limit of items
            rand_trio = []
            if characters_top_limit > 0:
                if characters_top_limit < 3:
                    rand_trio = random.sample(
                        range(0, len(comics["characters"]["items"])),
                        len(comics["characters"]["items"]),
                    )
                else:
                    rand_trio = random.sample(
                        range(0, len(comics["characters"]["items"])), 3
                    )
                # print(rand_trio)
            characters_combined = ""
            for i in rand_trio:
                characters_combined = (
                    characters_combined
                    + "'"
                    + comics["characters"]["items"][i]["name"]
                    + "'"
                    + ", "
                )
            characters.append(characters_combined)

            ids.append(comics["id"])
    except KeyError:
        pass
    return (titles, release_dates, image_urls, series, ids, characters)


def get_crossover_data(search_one, search_two, e_or_sw):
    """
    Searches a comic where comics where two heros crossover are searched

    Functionally, it is the same as the comic searcher, but here, it bases its search on two different heroes
    """

    ts = time.strftime("%Y%d%m%H%M%S")
    hash = create_api_access_hash_string(ts)
    PUB_KEY = os.getenv("MARVEL_PUB_KEY")
    if e_or_sw == "exact":
        search_parameter1 = "title"
    else:  # starts_with
        search_parameter1 = "titleStartsWith"

    requesturl = f"https://gateway.marvel.com:443/v1/public/comics?characters={search_one}%2C{search_two}&apikey=&apikey={PUB_KEY}&limit=5&ts={ts}&hash={hash}"
    print(requesturl)
    response = requests.get(requesturl)

    json_response = response.json()
    # print(json_response)
    titles = []
    release_dates = []
    image_urls = []
    series = []
    ids = []
    try:
        data = json_response["data"]
        # title
        # release date
        # url
        #

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
    except KeyError:
        pass

    return (titles, release_dates, image_urls, series, ids)


def get_rand_h_or_c():
    """
    calls the marvel api to get a random comic or character data and return to front end.
    uses random first letter to choose between the results generated and returns its data.
    """
    ts = time.strftime("%Y%d%m%H%M%S")
    hash = create_api_access_hash_string(ts)
    PUB_KEY = os.getenv("MARVEL_PUB_KEY")
    chooseit = random.choice(["characters?", "comics?noVariants=true&"])
    if chooseit == "characters?":
        search_parameter1 = "nameStartsWith"
    else:  # comic
        search_parameter1 = "titleStartsWith"

    search_word = random.choice(string.ascii_letters)

    requesturl = f"https://gateway.marvel.com:443/v1/public/{chooseit}{search_parameter1}={search_word}&apikey={PUB_KEY}&limit=20&ts={ts}&hash={hash}"

    print(requesturl)
    response = requests.get(requesturl)
    listdictinfo = []

    json_response = response.json()
    # print(json_response)
    try:
        data = json_response["data"]
        top_result_limit = len(data["results"])
        random_result = random.randint(0, (top_result_limit - 1))

        if chooseit == "characters?":
            unmodified = str(data["results"][random_result]["modified"])
            modified = unmodified.partition("T")[0]
            imagelink = (
                data["results"][random_result]["thumbnail"]["path"]
                + "."
                + data["results"][random_result]["thumbnail"]["extension"]
            )
            comics_top_limit = min(
                len(data["results"][random_result]["comics"]["items"]), 3
            )
            rand_trio = []
            if comics_top_limit > 0:
                if comics_top_limit < 3:
                    rand_trio = random.sample(
                        range(
                            0, len(data["results"][random_result]["comics"]["items"])
                        ),
                        len(data["results"][random_result]["comics"]["items"]),
                    )
                else:
                    rand_trio = random.sample(
                        range(
                            0, len(data["results"][random_result]["comics"]["items"])
                        ),
                        3,
                    )
                # print(rand_trio)
            comics_combined = ""
            for i in rand_trio:
                comics_combined = (
                    comics_combined
                    + "'"
                    + data["results"][random_result]["comics"]["items"][i]["name"]
                    + "'"
                    + ", "
                )

            listdictinfo.append(
                {
                    "hero": True,
                    "id": data["results"][random_result]["id"],
                    "nameTitle": data["results"][random_result]["name"],
                    "date": modified,
                    "imageUrl": imagelink,
                    "info": data["results"][random_result]["description"],
                    "info2": comics_combined,
                    "marvelError": False,
                }
            )
        else:  # comic
            unmodified = str(data["results"][random_result]["dates"][0]["date"])
            modified = unmodified.partition("T")[0]

            imagelink = (
                data["results"][random_result]["thumbnail"]["path"]
                + "."
                + data["results"][random_result]["thumbnail"]["extension"]
            )
            characters_top_limit = min(
                len(data["results"][random_result]["characters"]["items"]), 3
            )
            rand_trio2 = []
            if characters_top_limit > 0:
                if characters_top_limit < 3:
                    rand_trio2 = random.sample(
                        range(
                            0,
                            len(data["results"][random_result]["characters"]["items"]),
                        ),
                        len(data["results"][random_result]["characters"]["items"]),
                    )
                else:
                    rand_trio2 = random.sample(
                        range(
                            0,
                            len(data["results"][random_result]["characters"]["items"]),
                        ),
                        3,
                    )
                # print(rand_trio)
            characters_combined = ""
            for i in rand_trio2:
                characters_combined = (
                    characters_combined
                    + "'"
                    + data["results"][random_result]["characters"]["items"][i]["name"]
                    + "'"
                    + ", "
                )

            listdictinfo.append(
                {
                    "hero": False,
                    "id": data["results"][random_result]["id"],
                    "nameTitle": data["results"][random_result]["title"],
                    "date": modified,
                    "imageUrl": imagelink,
                    "info": data["results"][random_result]["series"]["name"],
                    "info2": characters_combined,
                    "marvelError": False,
                }
            )
    except KeyError:
        listdictinfo.append(
            {
                "hero": False,
                "id": "",
                "nameTitle": "Marvel Api Response Error",
                "date": "date_modified",
                "imageUrl": "imagelink",
                "info": "info",
                "info2": "info2",
                "marvelError": True,
            }
        )
    # print(listdictinfo)
    return listdictinfo


def get_common_data_heroes(charac_1, charac_2):

    search_word_1 = charac_1
    search_word_2 = charac_2
    ts_1 = time.strftime("%Y%d%m%H%M%S")
    hash_1 = create_api_access_hash_string(ts_1)
    ts_2 = time.strftime("%Y%d%m%H%M%S")
    hash_2 = create_api_access_hash_string(ts_2)
    PUB_KEY = os.getenv("MARVEL_PUB_KEY")

    search_parameter1 = "nameStartsWith"

    requesturl_1 = f"https://gateway.marvel.com:443/v1/public/characters?{search_parameter1}={search_word_1}&apikey={PUB_KEY}&limit=2&ts={ts_1}&hash={hash_1}"
    requesturl_2 = f"https://gateway.marvel.com:443/v1/public/characters?{search_parameter1}={search_word_2}&apikey={PUB_KEY}&limit=2&ts={ts_2}&hash={hash_2}"

    # print(requesturl)
    names = None
    image_urls = None
    comics_1, comics_2, comics_common = None, None, None
    stories_1, stories_2, stories_common = None, None, None
    events_1, events_2, events_common = None, None, None

    try:
        response_1 = requests.get(requesturl_1)
        response_2 = requests.get(requesturl_2)
        json_response_1 = response_1.json()
        data_1 = json_response_1["data"]

        json_response_2 = response_2.json()
        data_2 = json_response_2["data"]

        names = []
        image_urls = []
        comics_1, comics_2, comics_common = [], [], ""
        stories_1, stories_2, stories_common = [], [], ""
        events_1, events_2, events_common = [], [], ""

        if len(data_1["results"]) < 1:
            names.append(
                "wd"
            )  # shortform for checking, will use images imported in react.
            # hulk thinking https://www.fightersgeneration.com/nx5/char/hulk-thinking.jpg
            # angry hulk https://static1.srcdn.com/wordpress/wp-content/uploads/2020/06/comic-hulk-angry.jpg
            # downloaded them to images folder
            image_urls.append(
                "wd"
            )  # shortform for checking, will use images imported in react.
        else:
            # takes first result
            names.append(data_1["results"][0]["name"])  # 0th position
            # 0th position
            image_urls.append(
                data_1["results"][0]["thumbnail"]["path"]
                + "."
                + data_1["results"][0]["thumbnail"]["extension"]
            )
            for comic in data_1["results"][0]["comics"]["items"]:
                comics_1.append(comic["name"])
            for story in data_1["results"][0]["stories"]["items"]:
                stories_1.append(story["name"])
            for event in data_1["results"][0]["events"]["items"]:
                events_1.append(event["name"])

        if len(data_2["results"]) < 1:
            names.append(
                "wd"
            )  # shortform for checking, will use images imported in react.
            image_urls.append(
                "wd"
            )  # shortform for checking, will use images imported in react.
        else:
            names.append(data_2["results"][0]["name"])  # 1st position
            # 1st position
            image_urls.append(
                data_2["results"][0]["thumbnail"]["path"]
                + "."
                + data_2["results"][0]["thumbnail"]["extension"]
            )
            for comic in data_2["results"][0]["comics"]["items"]:
                comics_2.append(comic["name"])
            for story in data_2["results"][0]["stories"]["items"]:
                stories_2.append(story["name"])
            for event in data_2["results"][0]["events"]["items"]:
                events_2.append(event["name"])

        for comic in comics_1:
            if comic in comics_2:
                # comics_common.append(comic)
                # comics_common is a now a string.
                comics_common = comics_common + "'" + comic + "'" + ", "

        for story in stories_1:
            if story in stories_2:
                stories_common = stories_common + "'" + story + "'" + ", "

        for event in events_1:
            if event in events_2:
                events_common = events_common + "'" + event + "'" + ", "

    except KeyError:
        pass
    return (names, image_urls, comics_common, stories_common, events_common)


# there are 4 different types of searches
# heroes
#   exact
#   startswith
# comics
#   exact
#   startswith
