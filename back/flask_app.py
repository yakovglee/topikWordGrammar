from flask import Flask, jsonify
from flask_cors import CORS

from getters import get_sample, get_data_from_dict

from datetime import datetime

from const import DATA

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    global DATA

    current_date = datetime.now().strftime('%Y-%m-%d')
    
    if (current_date != DATA['date']):

        DATA['date'] = current_date
        DATA['word'] = get_sample()
        DATA['data'] = get_data_from_dict()

        
    return jsonify(DATA)


if __name__ == "__main__":
    app.run(debug=True)
