from flask import Flask, jsonify
from flask_cors import CORS
from backend.rawg_api import fetch_games, fetch_game_by_id, fetch_genres, fetch_platforms

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route('/games', methods=['GET'])
def get_games():
    data = fetch_games()
    # Retornas solo la lista de resultados para simplificar
    return jsonify(data['results'])

@app.route('/games/<int:game_id>', methods=['GET'])
def get_game_by_id(game_id):
    data = fetch_game_by_id(game_id)
    return jsonify(data)

@app.route('/genres', methods=['GET'])
def get_genres():
    data = fetch_genres()
    return jsonify(data['results'])

@app.route('/platforms', methods=['GET'])
def get_platforms():
    data = fetch_platforms()
    return jsonify(data['results'])

if __name__ == '__main__':
    app.run(debug=True, port=8000)
