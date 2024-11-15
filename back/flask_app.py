from flask import Flask, jsonify, request
from flask_cors import CORS

from config import config
from getters import get_word_from_gs

from datetime import datetime

from const import DATA

ORIGINS = config["ORIGINS"]

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ORIGINS}})


@app.route("/api/", methods=["GET"])
def api():
    args = request.args
    partOfSpeach = args.get("pos", default="명사", type=str)
    level = args.get("level", default=1, type=int)
    wordCount = args.get("wordCount", default=5, type=int)
    global DATA

    current_date = datetime.now().strftime("%Y-%m-%d")

    DATA["date"] = current_date
    DATA["word"] = get_word_from_gs(pos=partOfSpeach, level=level, wordCount=wordCount)

    return jsonify(DATA)


if __name__ == "__main__":
    app.run(debug=True)
