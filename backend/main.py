from flask import Flask, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Cargar variables .env
load_dotenv()

# Configuración Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Configurar Flask
app = Flask(__name__)
CORS(app)

@app.route('/api/users')
def get_users():
    # Llamar a una tabla llamada "users"
    response = supabase.table('users').select('*').execute()
    data = response.data
    return jsonify({'users': data})


def normalize_vector(vector):
    max_value = max(vector)
    return [round(x / max_value, 3) if max_value > 0 else 0 for x in vector]

@app.route('/api/user_vector/<user_id>')
def get_user_vector(user_id):
    # Obtener todos los usuarios desde Supabase
    response = supabase.table('users').select('*').eq('id', user_id).execute()
    data = response.data

    if not data:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    user = data[0]

    # Orden esperado
    order = [
        'action', 'indie', 'adventure', 'rpg', 'strategy', 'shooter', 'casual',
        'simulation', 'puzzle', 'arcade', 'platformer', 'board_games',
        'racing', 'sports', 'fighting', 'family', 'card', 'educational',
        'game_antique', 'playtime_today_minutes'
    ]

    # Si 'board_games' no existe en tu tabla, asegúrate de crearla o poner 0 aquí
    user_vector = [user.get(field, 0) for field in order]

    normalized = normalize_vector(user_vector)

    return jsonify({
        'user_id': user['id'],
        'username': user['username'],
        'original_vector': user_vector,
        'normalized_vector': normalized
    })

if __name__ == '__main__':
    app.run(debug=True)

