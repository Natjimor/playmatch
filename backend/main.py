from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return {"message": "Backend server is running!"}

if __name__ == '__main__':
    print("Flask server starting...")
    app.run(debug=True, port=5000)
