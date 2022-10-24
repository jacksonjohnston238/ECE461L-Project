from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='./build', static_url_path='/')
# app = Flask(__name__)
CORS(app)

# if __name__ == "__main__":
#     app.run(host='0.0.0.0', debug=False, 
#     port=os.environ.get('PORT', 80))
if __name__ == "__main__":
    app.run(host='0.0.0.0')

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/checkin/<int:projectid>/<int:qty>")
def checkIn_hardware(projectid, qty):
    return {
        'projectid': projectid,
        'qty': qty,
        'response': f'{qty} hardware checked in'
    }

@app.route("/checkout/<int:projectid>/<int:qty>")
def checkOut_hardware(projectid, qty):
    return {
        'projectid': projectid,
        'qty': qty,
        'response': f'{qty} hardware checked out'
    }

@app.route("/join/<int:projectid>")
def joinProject(projectid):
    return {
        'response' : f'Joined {projectid}'
    }

@app.route("/leave/<int:projectid>")
def leaveProject(projectid):
    return {
        'response' : f'Left {projectid}'
    }