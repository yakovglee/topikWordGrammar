from db import db
from model import Word
from datetime import datetime


def get_words_by_date(date=None):

    if date is None:
        date = datetime.now().date()

    words = (
        db.session.execute(db.select(Word).filter(Word.date == date)).scalars().all()
    )

    return words


def create_word(
    date,
    word,
    lvl,
    pos,
    link,
    dfn,
    dfn_ru,
    dfn_en,
    word_ru,
    word_en,
    tags=None,
):
    word = Word(
        date=date,
        word=word,
        lvl=lvl,
        pos=pos,
        link=link,
        dfn=dfn,
        dfn_ru=dfn_ru,
        dfn_en=dfn_en,
        word_ru=word_ru,
        word_en=word_en,
        tags=tags,
    )
    db.session.add(word)
    db.session.commit()
