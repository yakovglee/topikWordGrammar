from flask import Flask, jsonify, request
from flask_cors import CORS

from config import config
from getters import get_word_from_gs
from datetime import datetime

from model import db


ORIGINS = config["ORIGINS"]
DATABASE_URI = config["DATABASE_URI"]


app = Flask(__name__)


CORS(app, resources={r"/api/*": {"origins": ORIGINS}})

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/api/", methods=["GET"])
def api():
    args = request.args
    partOfSpeach = args.get("pos", default="명사", type=str)
    level = args.get("level", default=1, type=int)
    wordCount = args.get("wordCount", default=5, type=int)

    current_date = datetime.now().strftime("%Y-%m-%d")

    word = get_word_from_gs(pos=partOfSpeach, level=level, wordCount=wordCount)

    return jsonify(word)


if __name__ == "__main__":
    app.run(debug=True)
