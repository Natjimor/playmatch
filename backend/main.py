import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

RAWG_API_KEY = "39ffc44387634851a4576b77fbd49bba"  
RAWG_BASE_URL = "https://api.rawg.io/api"

def fetch_games():
    url = f"{RAWG_BASE_URL}/games"
    params = {
        "key": RAWG_API_KEY,
        "page_size": 10,
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def fetch_game_by_id(game_id):
    url = f"{RAWG_BASE_URL}/games/{game_id}"
    params = {"key": RAWG_API_KEY}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def fetch_genres():
    url = f"{RAWG_BASE_URL}/genres"
    params = {"key": RAWG_API_KEY}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def fetch_platforms():
    url = f"{RAWG_BASE_URL}/platforms"
    params = {"key": RAWG_API_KEY}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

@app.route("/")
def root():
    return jsonify({"message": "¡El backend de PlayMatch con Flask está funcionando!"})

@app.route("/games")
def get_games():
    try:
        games = fetch_games()
        return jsonify(games)
    except requests.HTTPError as e:
        return jsonify({"error": str(e)}), 500

@app.route("/games/<int:game_id>")
def get_game(game_id):
    try:
        game = fetch_game_by_id(game_id)
        return jsonify(game)
    except requests.HTTPError as e:
        return jsonify({"error": str(e)}), 500

@app.route("/genres")
def get_genres():
    try:
        genres = fetch_genres()
        return jsonify(genres)
    except requests.HTTPError as e:
        return jsonify({"error": str(e)}), 500

@app.route("/platforms")
def get_platforms():
    try:
        platforms = fetch_platforms()
        return jsonify(platforms)
    except requests.HTTPError as e:
        return jsonify({"error": str(e)}), 500

@app.route("/recommendations", methods=["POST"])
def get_recommendations():
    preferences = request.json

    mock_recommendations = [
        {
            "id": 1,
            "name": "Juego Ejemplo",
            "background_image": "https://via.placeholder.com/300",
            "genres": [{"name": "Indie"}, {"name": "Adventure"}],
        }
    ]
    return jsonify({"recommendations": mock_recommendations})

if __name__ == "__main__":
    app.run(port=8000, debug=True)
