"""
    marveltest.py
    tests the marvel api.
"""
# pylint: disable=no-member, invalid-envvar-default, wrong-import-position, wrong-import-order, R0903, W0603
from marvel import get_charac_data, get_comic_data
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

test_text = "spider"
exact = "exact"
starts = "other"

heroes = get_charac_data(test_text, starts)
print("heroes results: ")
print(heroes)

titles, release_dates, urls = get_comic_data(test_text, starts)
print("titles results: ")
print(titles)
print(release_dates)
print(urls)
