def fill_data_sense(entry, lvl, part):
    definitions = [dfn.get('definition', 'nan') for dfn in entry.get('sense', [])]
    translations = [
        trans.get('trans_dfn', 'No Translation')
        for sense in entry.get('sense', [])
        for trans in sense.get('translation', [])
    ]
    translated_words = [
        trans.get('trans_word', 'No Translation')
        for sense in entry.get('sense', [])
        for trans in sense.get('translation', [])
    ]
    
    entry_data = {
        'lvl': lvl,
        'part': part,
        'word': entry.get('word', ''),
        'link': entry.get('link', ''),
        'dfn': definitions,
        'trans_dfn': translations,
        'trans_word': translated_words,
        'total': len(definitions)  
    }

    return entry_data
