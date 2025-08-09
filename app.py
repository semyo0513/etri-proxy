from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = "-7325d3870001"

@app.route("/etri/morpheme", methods=["POST"])
def morpheme():
    data = request.get_json()
    text = data.get("text", "")

    headers = {"Content-Type": "application/json; charset=UTF-8"}
    payload = {
        "access_key": API_KEY,
        "argument": {
            "text": text,
            "analysis_code": "morp"
        }
    }

    etri_url = "http://aiopen.etri.re.kr:8000/WiseNLU"
    try:
        response = requests.post(etri_url, headers=headers, json=payload)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"result": -1, "reason": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
