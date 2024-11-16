def fill_data_sense(entry, lvl, part):
    definitions = [dfn.get("definition", "nan") for dfn in entry.get("sense", [])]

    trans_dfn_ru = []
    trans_dfn_en = []
    trans_word_ru = []
    trans_word_en = []

    for sense in entry.get("sense", []):
        for trans in sense.get("translation", []):
            trans_lang = trans.get("trans_lang")
            trans_word = trans.get("trans_word", "No Translation")
            trans_dfn = trans.get("trans_dfn", "No Translation")

            if trans_lang == "러시아어":
                trans_dfn_ru.append(trans_dfn)
                trans_word_ru.append(trans_word)
            elif trans_lang == "영어":
                trans_dfn_en.append(trans_dfn)
                trans_word_en.append(trans_word)

    entry_data = {
        "lvl": lvl,
        "part": part,
        "word": entry.get("word", ""),
        "link": entry.get("link", ""),
        "dfn": definitions,
        "dfn_ru": trans_dfn_ru,
        "dfn_en": trans_dfn_en,
        "word_ru": trans_word_ru,
        "word_en": trans_word_en,
        "total": len(definitions),
    }

    return entry_data
