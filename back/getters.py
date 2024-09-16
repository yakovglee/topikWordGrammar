import requests
import xmltodict
import pandas as pd
from const import PART_OF_SPEECH, DATA
from utils import fill_data_sense

# Constants
API_KEY_DICT = 'A3F0F7F11486AF6CA2D37B85FD789B04'
API_KEY_SHEETS = 'AIzaSyDT2sVolBj1PhM3iyn74-FBlGD9isyLyjc'
SHEET_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1pqJaqTMvl0pRFOqPYe54R-zPYTuuWNQuXAKB4wu7EII/values/word!A:D'
DICT_URL = 'https://krdict.korean.go.kr/api/search'

def fetch_data(url, params=None):
    """Helper function to fetch data from a URL."""
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json() if 'json' in response.headers.get('Content-Type') else xmltodict.parse(response.text)
    else:
        response.raise_for_status()

def get_dictionary(word, pos):
    """Fetch dictionary data for a given word and part of speech."""
    params = {
        'q': word,
        'key': API_KEY_DICT,
        'translated': 'y',
        'trans_lang': '10,1',
        'advanced': 'y',
        'pos': pos
    }
    return fetch_data(DICT_URL, params)

def get_word_from_gs():
    """Fetch word data from Google Sheets."""
    params = {'key': API_KEY_SHEETS}
    return fetch_data(SHEET_URL, params).get('values', [])

def get_sample():
    """Generate a sample of words categorized by level and part of speech."""
    words = get_word_from_gs()
    df = pd.DataFrame(words[1:], columns=words[0])
    
    resp = []
    for lvl in range(1, 7):
        df_lvl = df[df['level'] == f'{lvl}급']
        for part in PART_OF_SPEECH.keys():
            df_part = df_lvl[df_lvl['part'] == part]
            if not df_part.empty:
                sample_size = min(len(df_part), 5)
                sample = df_part.sample(sample_size)
                resp.append({
                    'lvl': lvl,
                    'part': part,
                    'word': sample['word'].tolist()
                })
    return resp

def get_data_from_dict():
    """Fetch and process dictionary data for words in DATA."""
    resp = []
    for item in DATA.get('word', []):
        lvl = item.get("lvl", 0)
        part = item.get("part", "")
        words = item.get("word", [])
        pos = PART_OF_SPEECH.get(part, 0)
        
        for wrd in words:
            data_from_dict = get_dictionary(wrd, pos)
            channel = data_from_dict.get('channel', {})
            items = channel.get('item', [])
            if not isinstance(items, list):
                items = [items]

            for entry in items:
                sense = entry.get('sense', {})
                if not isinstance(sense, list):
                    sense = [sense]
                entry['sense'] = sense

                entry_data = fill_data_sense(entry, lvl, part)
                resp.append(entry_data)
    return resp
