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


@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.route('/checkin/<int:projectid>/<string:hwsetname>/<int:qty>')
def checkIn_hardware(projectid, hwsetname, qty):
    project_query = {"ProjectID": projectid}
    project_document = projects.find_one(project_query)
    valid_hwset = False
    for index in project_document["HWSets"]:
        if index == hwsetname:
            valid_hwset = True
    if valid_hwset:
        hwset_query = {"Name": hwsetname}
        hwset_document = hwsets.find_one(hwset_query)
        available_units = hwset_document["Availability"]
        capacity_units = hwset_document["Capacity"]
        remaining_units = capacity_units - available_units
        if qty > remaining_units:
            hwsets.update_one({"Name": hwsetname}, {"$set": {"Availability": capacity_units}})
        else:
            final_qty = available_units + qty
            hwsets.update_one({"Name": hwsetname}, {"$set": {"Availability": final_qty}})
    return {
        'projectid': projectid,
        'hwsetname': hwsetname,
        'qty': qty,
        'response': f'{qty} hardware checked into {hwsetname}'
    }


@app.route('/checkout/<int:projectid>/<string:hwsetname>/<int:qty>')
def checkOut_hardware(projectid, hwsetname, qty):
    project_query = {"ProjectID": projectid}
    project_document = projects.find_one(project_query)
    valid_hwset = False
    for index in project_document["HWSets"]:
        if index == hwsetname:
            valid_hwset = True
    if valid_hwset:
        hwset_query = {"Name": hwsetname}
        hwset_document = hwsets.find_one(hwset_query)
        init_qty = hwset_document["Availability"]
        if qty > init_qty:
            hwsets.update_one({"Name": hwsetname}, {"$set": {"Availability": 0}})
        else:
            final_qty = init_qty - qty
            hwsets.update_one({"Name": hwsetname}, {"$set": {"Availability": final_qty}})
    return {
        'projectid': projectid,
        'hwsetname': hwsetname,
        'qty': qty,
        'response': f'{qty} hardware checked out from {hwsetname}'
    }


@app.route('/join/<int:projectid>')
def joinProject(projectid):
    return {
        'response': f'Joined {projectid}'
    }


@app.route('/leave/<int:projectid>')
def leaveProject(projectid):
    return {
        'response': f'Left {projectid}'
    }


@app.route("/signup/<string:username>/<string:userID>/<string:password>/<string:confirmPassword>")
def signup(username, userID, password, confirmPassword):
    if password == confirmPassword:
        newUserDoc = {
            'Username': username,
            'UserID': userID,
            'Password': password
        }
        users.insert_one(newUserDoc)
        response = f'new user created'

    else:
        response = f'passwords must match'

    return {
        'response': f'* {response} *'
    }


@app.route("/login/<string:userID>/<string:password>")
def login(userID, password):
    user_query = {"UserID": userID}
    user_document = users.find_one(user_query)
    passwordCheck = user_document["Password"]
    if password == passwordCheck:
        response = f'successfully logged in'

    else:
        response = f'incorrect password'
    return {
        'response': f'* {response} *'
    }


if __name__ == "__main__":
    app.run(host='0.0.0.0')

# Close the database collection
# client.close()

