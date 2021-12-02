"""
    marveltest.py
    tests the marvel api.
"""
# pylint: disable=no-member, invalid-envvar-default, wrong-import-position, wrong-import-order, R0903, W0603
from marvel import get_common_data_heroes
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

test_text = "Kitty Pryde"
test_text_2 = "iron man"
exact = "exact"
starts = "other"

""" names, modified_dates, image_urls, descriptions, ids = get_charac_data(
    test_text, starts
)
print("heroes results: ")
print(names)
print(modified_dates)
print(image_urls)
print(descriptions)
print(ids)

titles, release_dates, image_urls, series, ids = get_comic_data(test_text, starts)
print("titles results: ")
print(titles)
print(release_dates)
print(image_urls)
print(series)
print(ids) """

(
    names,
    image_urls,
    comics_common,
    stories_common,
    events_common,
) = get_common_data_heroes(test_text, test_text_2)
print(names)
print(image_urls)
print(comics_common)
print(stories_common)
print(events_common)
