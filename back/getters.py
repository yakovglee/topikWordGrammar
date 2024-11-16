import requests
import xmltodict
from const import PART_OF_SPEECH
from config import config
from utils import fill_data_sense
from db_crud import create_word
from datetime import datetime

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


def create_words(pos, lvl, wrdCount):
    data = get_word_from_gs(pos, lvl, wrdCount)
    words = data["words"]

    for wrd in words:
        data_from_dict = get_dictionary(wrd, PART_OF_SPEECH.get(pos, 0))
        channel = data_from_dict.get("channel", {})
        items = channel.get("item", [])
        if not isinstance(items, list):
            items = [items]

        for entry in items:
            sense = entry.get("sense", {})
            if not isinstance(sense, list):
                sense = [sense]
            entry["sense"] = sense

            entry_data = fill_data_sense(entry, lvl, pos)

            create_word(
                date=datetime.now().date(),
                word=entry_data["word"],
                lvl=entry_data["lvl"],
                pos=entry_data["part"],
                link=entry_data["link"],
                dfn=entry_data["dfn"],
                dfn_ru=entry_data["dfn_ru"],
                dfn_en=entry_data["dfn_en"],
                word_ru=entry_data["word_ru"],
                word_en=entry_data["word_en"],
            )
