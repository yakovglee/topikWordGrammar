from sqlalchemy import JSON, Date
from db import db
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime


class Word(db.Model):
    __tablename__ = "word"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[datetime] = mapped_column(Date)
    word: Mapped[str]
    lvl: Mapped[int]
    pos: Mapped[str]
    link: Mapped[str]
    dfn: Mapped[list[str]] = mapped_column(JSON)
    dfn_ru: Mapped[list[str]] = mapped_column(JSON)
    dfn_en: Mapped[list[str]] = mapped_column(JSON)
    word_ru: Mapped[list[str]] = mapped_column(JSON)
    word_en: Mapped[list[str]] = mapped_column(JSON)
    tags: Mapped[None | list[str]] = mapped_column(JSON)
