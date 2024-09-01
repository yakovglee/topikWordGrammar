import requests
import xmltodict
import pandas as pd


from const import PART_OF_SPEECH, DATA
from utils import fill_data_sense_dict, fill_data_sense_list


def get_dictionary(word, pos):

    url = 'https://krdict.korean.go.kr/api/search'

    params = {
        'q': word,
        'key': 'A3F0F7F11486AF6CA2D37B85FD789B04',
        'translated': 'y',
        'trans_lang': '10,1',
        'advanced': 'y',
        'pos': pos
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data_dict = xmltodict.parse(response.text)

        return data_dict
    else:
        return(response.status_code)
    

def get_word_from_gs():

    url = 'https://sheets.googleapis.com/v4/spreadsheets/1pqJaqTMvl0pRFOqPYe54R-zPYTuuWNQuXAKB4wu7EII/values/word!A:D'

    params = {
        'key': 'AIzaSyDT2sVolBj1PhM3iyn74-FBlGD9isyLyjc',
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        
        values = data.get('values', [])

        return(values)
    else:
        return(response.status_code)
    

def get_sample():
    resp = []

    word = get_word_from_gs()

    df = pd.DataFrame(word)

    df.columns = df.iloc[0] 
    df = df[1:].reset_index(drop=True)

    
    for lvl in range(1, 7):

        df_lvl = df[df['level'] == f'{lvl}급']

        for part in PART_OF_SPEECH.keys():
            df_part = df_lvl[df_lvl['part'] == part] 

            if not df_part.empty: 
                sample_size = min(len(df_part), 5) 
                sample = df_part.sample(sample_size)
                
                entry = {
                    'lvl': lvl,
                    'part': part, 
                    'word': sample['word'].tolist()
                }
        
                resp.append(entry)
    
    return resp
    

def get_data_from_dict():
    resp = []

    for item in DATA.get('word', []):
        lvl = item.get("lvl", 0)
        part = item.get("part", "")
        words = item.get("word", [])

        for wrd in words:
            data_from_dict = get_dictionary(wrd, PART_OF_SPEECH.get(part, 0))
            channel = data_from_dict.get('channel', {})
            items = channel.get('item', [])

            if not isinstance(items, list):
                items = [items]

            for entry in items:
                entry_data = (
                    fill_data_sense_list(entry, lvl, part) 
                    if isinstance(entry.get('sense', ''), list) 
                    else fill_data_sense_dict(entry, lvl, part)
                )
                resp.append(entry_data)
    return resp
