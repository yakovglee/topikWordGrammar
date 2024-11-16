from db import db
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime


class Word(db.Model):
    __tablename__ = "word"

    id: Mapped[int] = mapped_column(primary_key=True)
    date: Mapped[datetime]
    word: Mapped[str]
    lvl: Mapped[int]
    pos: Mapped[str]
    tags: Mapped[None | str]
