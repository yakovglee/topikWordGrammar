def fill_data_sense_list(entry, lvl, part):
    entry_data = {
        'lvl': lvl,
        'part': part,
        'word': entry.get('word', '(('),
        'link': entry.get('link', ''),
        'dfn': [dfn.get('definition', 'nan') for dfn in entry.get('sense', {})],
        'trans_dfn': [trans.get('trans_dfn', 'No Translation') for sense in entry.get('sense') for trans in sense.get('translation', [])],
        'trans_word': [trans.get('trans_word', 'No Translation') for sense in entry.get('sense') for trans in sense.get('translation', [])],
    }

    return entry_data

def fill_data_sense_dict(entry, lvl, part):
    entry_data = {
        'lvl': lvl,
        'part': part,
        'word': entry.get('word', '(('),
        'link': entry.get('link', ''),
        'dfn': [entry.get('sense', {}).get('definition', 'nan')],
        'trans_dfn': [trans.get('trans_dfn', 'No Translation') for trans in entry.get('sense', {}).get('translation', 'nan')],
        'trans_word': [trans.get('trans_word', 'No Translation') for trans in entry.get('sense', {}).get('translation', 'nan')],
    }

    return entry_data
