import requests
import xmltodict
from config import config
from const import PART_OF_SPEECH, DATA
from utils import fill_data_sense

API_KEY_DICT = config["API_KEY_DICT"]
DICT_URL = config["DICT_URL"]
SHEET_URL = config["SHEET_URL"]


def fetch_data(url, params=None):
    """Helper function to fetch data from a URL."""
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return (
            response.json()
            if "json" in response.headers.get("Content-Type")
            else xmltodict.parse(response.text)
        )
    else:
        response.raise_for_status()


def get_dictionary(word, pos):
    """Fetch dictionary data for a given word and part of speech."""
    params = {
        "q": word,
        "key": API_KEY_DICT,
        "sort": "popular",
        "translated": "y",
        "trans_lang": "10,1",
        "advanced": "y",
        "pos": pos,
    }
    return fetch_data(DICT_URL, params)


def get_word_from_gs(pos, level, wordCount=5):
    """Fetch word data and sample from Google Sheets."""
    params = {
        "part": pos,
        "level": level,
        "wordCount": wordCount,
    }
    return fetch_data(SHEET_URL, params)
