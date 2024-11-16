from flask import Flask, jsonify, request
from flask_cors import CORS

from config import config
from getters import create_words
from db_crud import get_words

from model import db

ORIGINS = config["ORIGINS"]
DATABASE_URI = config["DATABASE_URI"]


app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": ORIGINS}})

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/", methods=["GET"])
def api():
    args = request.args
    partOfSpeach = args.get("pos", default="명사", type=str)
    level = args.get("level", default=1, type=int)
    wordCount = args.get("wordCount", default=5, type=int)

    words = get_words(lvl=level, pos=partOfSpeach)

    if not words:
        create_words(partOfSpeach, level, wordCount)
        words = get_words(lvl=level, pos=partOfSpeach)

    return jsonify(
        [
            {
                "id": word.id,
                "word": word.word,
                "lvl": word.lvl,
                "pos": word.pos,
                "link": word.link,
                "dfn": word.dfn,
                "dfn_ru": word.dfn_ru,
                "dfn_en": word.dfn_en,
                "word_ru": word.word_ru,
                "word_en": word.word_en,
                "tags": word.tags,
            }
            for word in words
        ]
    )


if __name__ == "__main__":
    app.run(debug=True)
