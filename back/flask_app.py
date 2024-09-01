from flask import Flask, jsonify
import requests
import xmltodict
import random
from datetime import datetime
import pandas as pd


PART_OF_SPEECH = {
    "명사" : 1,
    "형용사" : 6,
    "동사" : 5,
    "부사" : 8,
    "의존명사" : 11,
    "대명사 ": 2,
    "수사": 3,
    "관형사" : 7,
    "감탄사" : 9,
    "접사" : 10,
    "줄어든말" : 0
}

LEVEL_RANGE = {
    'start': [1, 811, 1945, 3648, 5933, 8387],
    'end': [810, 1944, 3647, 5932, 8386, 11094]
}

DATA ={
  "date": "2024-01-01",
}

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
    


def get_rnd_idx():
    idx_word = {}
    for idx in range(0, 6):
        idx_word[idx+1] = random.sample(range(LEVEL_RANGE['start'][idx], LEVEL_RANGE['end'][idx]), 5)

    return idx_word


def get_word():
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


def extract_translations(sense_list):
    translations = []
    
    for sense in sense_list:
        trans_list = sense.get('translation', [])
        
        for trans in trans_list:
            trans_word = trans.get('trans_word', 'No Translation')
            trans_dfn = trans.get('trans_dfn', 'No Definition')
            
            translations.append({

                'trans_word': trans_word,
                'trans_dfn': trans_dfn
            })
    
    return translations

def fill_data_sense_list(entry, lvl):
    entry_data = {
        'lvl': lvl,
        'part': entry.get('pos', '(('),
        'word': entry.get('word', '(('),
        'link': entry.get('link', ''),
        'dfn': [dfn.get('definition', 'nan') for dfn in entry.get('sense', {})],
        'trans_dfn': [trans.get('trans_dfn', 'No Translation') for sense in entry.get('sense') for trans in sense.get('translation', [])],
        'trans_word': [trans.get('trans_word', 'No Translation') for sense in entry.get('sense') for trans in sense.get('translation', [])],
    }

    return entry_data

def fill_data_sense_dict(entry, lvl):
    entry_data = {
        'lvl': lvl,
        'part': entry.get('pos', '(('),
        'word': entry.get('word', '(('),
        'link': entry.get('link', ''),
        'dfn': [entry.get('sense', {}).get('definition', 'nan')],
        'trans_dfn': [trans.get('trans_dfn', 'No Translation') for trans in entry.get('sense', {}).get('translation', 'nan')],
        'trans_word': [trans.get('trans_word', 'No Translation') for trans in entry.get('sense', {}).get('translation', 'nan')],
    }

    return entry_data

def get_data_from_dict():
    resp = []

    for item in DATA['word']:
        lvl = item["lvl"]
        part = item["part"]
        words = item["word"]

        


        for wrd in words:
            data_from_dict = get_dictionary(wrd, PART_OF_SPEECH.get(part, 0))
            
            channel = data_from_dict.get('channel', {})
            items = channel.get('item', '')

            if isinstance(items, list):  

                for entry in items:
                    
                    if isinstance(entry.get('sense', ''), list):  
                        entry_data = fill_data_sense_list(entry, lvl)
                    else:
                        entry_data = fill_data_sense_dict(entry, lvl)

                resp.append(entry_data)

    return resp







app = Flask(__name__)




@app.route("/")
def hello_world():
    global DATA

    current_date = datetime.now().strftime('%Y-%m-%d')
    
    if (current_date != DATA['date']):

        DATA['date'] = current_date
        DATA['word'] = get_word()
        DATA['data'] = get_data_from_dict()

        
    return jsonify(DATA)



if __name__ == "__main__":
    app.run()
    # # print(hello_world())
    # # print(get_dictionary('개', 1))
    # print(get_data_from_dict())