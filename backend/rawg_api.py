import requests

API_KEY = "39ffc44387634851a4576b77fbd49bba"
BASE_URL = "https://api.rawg.io/api"

def fetch_games():
    url = f"{BASE_URL}/games?key={API_KEY}"
    response = requests.get(url)
    return response.json()

def fetch_game_by_id(game_id):
    url = f"{BASE_URL}/games/{game_id}?key={API_KEY}"
    response = requests.get(url)
    return response.json()

def fetch_genres():
    url = f"{BASE_URL}/genres?key={API_KEY}"
    response = requests.get(url)
    return response.json()

def fetch_platforms():
    url = f"{BASE_URL}/platforms?key={API_KEY}"
    response = requests.get(url)
    return response.json()
