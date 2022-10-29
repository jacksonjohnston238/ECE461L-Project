from flask import Flask
from flask_cors import CORS, cross_origin
# from and import statements in order to access specific functions with these libraries
from pymongo import MongoClient
client = MongoClient("mongodb+srv://ecedatabaseuser:wHHLGhPoC95vByvV@cluster0.gopiidc.mongodb.net/?retryWrites=true&w=majority")
# Initializes the database to be the test database in the client in MongoDB
database = client["ECE461L-FinalProject-Database"]
users = database.Users
hwsets = database.HardwareSets
projects = database.Projects

app = Flask(__name__, static_folder='./build', static_url_path='/')

CORS(app)

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

@app.route("/signup/<string:username>/<string:userID>/<string:password>/<string:confirmPassword>")
def signup(username, userID, password, confirmPassword):
    if password == confirmPassword:
        newUserDoc = {
            'Username' : username,
            'UserID' : userID,
            'Password' : password
        }
        users.insert_one(newUserDoc)
        response = f'new user created'

    else:
        response = f'passwords must match'

    return {
        'response' : f'* {response} *'
    }


# Close the database collection

