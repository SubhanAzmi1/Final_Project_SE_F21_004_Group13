import unittest
import sys
import os

# getting the name of the directory
# where the this file is present.
current = os.path.dirname(os.path.realpath(__file__))

# Getting the parent directory name
# where the current directory is present.
parent = os.path.dirname(current)

# adding the parent directory to
# the sys.path.
sys.path.append(parent)

from marvel import get_comic_data

INPUT = "INPUT"
EXPECTED_OUTPUT = "EXPECTED_OUTPUT"


class GetComicDataTests(unittest.TestCase):
    def test_get_comic_data_1(self):
        self.assertEqual(get_comic_data("", "other"), ([], [], [], [], []))

    def test_get_comic_data_2(self):
        self.assertEqual(
            get_comic_data("Iron Man (2020) #13", "exact"), ([], [], [], [], [])
        )


if __name__ == "__main__":
    unittest.main()
