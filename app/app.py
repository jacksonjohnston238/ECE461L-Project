from flask import Flask
from flask_cors import CORS, cross_origin
# from and import statements in order to access specific functions with these libraries
from pymongo import MongoClient
from cryptography.fernet import Fernet
import json
client = MongoClient("mongodb+srv://ecedatabaseuser:wHHLGhPoC95vByvV@cluster0.gopiidc.mongodb.net/?retryWrites=true&w=majority")
# Initializes the database to be the test database in the client in MongoDB
database = client["ECE461L-FinalProject-Database"]
users = database.Users
hwsets = database.HardwareSets
projects = database.Projects

key = Fernet.generate_key()
fernet = Fernet(key)

app = Flask(__name__, static_folder='./build', static_url_path='/')

CORS(app)


@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route('/projects/<string:userID>')
def getProjects(userID):
    # Return projects userID is in
    projectsList = []
    for project in projects.find():
        del project['_id']
        if userID in project['Authorized Users']:
            projectsList.append(project)

    # Return list of hwsets
    hwsetsList = []
    for hwset in hwsets.find():
        del hwset['_id']
        hwsetsList.append(hwset)

    return {
        'projects' : projectsList,
        'hwsets' : hwsetsList
    }


@app.route('/checkin/<int:projectid>/<string:hwsetname>/<int:qty>')
def checkIn_hardware(projectid, hwsetname, qty):

    hwset_query = {"Name": hwsetname}
    hwset_document = hwsets.find_one(hwset_query)
    available_units = hwset_document["Availability"]

    project = projects.find_one({"ProjectID": projectid})
    project_hardware = project['HWSets']
    checked_out = project_hardware[hwsetname]

    if qty > checked_out:
        qty_checked_in = checked_out
    else:
        qty_checked_in = qty

    project_hardware[hwsetname] = project_hardware[hwsetname] - qty_checked_in
    projects.update_one({"ProjectID": projectid}, {"$set": {"HWSets": project_hardware}})
    hwsets.update_one({"Name": hwsetname}, {"$set": {"Availability": qty_checked_in + available_units}})

    return {
        'projectid': projectid,
        'hwsetname': hwsetname,
        'qty': qty,
        'response': f'{qty_checked_in} hardware checked into {hwsetname}'
    }


@app.route('/checkout/<int:projectid>/<string:hwsetname>/<int:qty>')
def checkOut_hardware(projectid, hwsetname, qty):

    hwset_query = {"Name": hwsetname}
    hwset_document = hwsets.find_one(hwset_query)
    availability = hwset_document["Availability"]

    project = projects.find_one({"ProjectID": projectid})
    project_hardware = project['HWSets']

    if qty > availability:
        qty_checked_out = availability
        hwsets.update_one({"Name": hwsetname}, {"$set": {"Availability": 0}})
    else:
        qty_checked_out = qty

    project_hardware[hwsetname] = project_hardware[hwsetname] + qty_checked_out
    projects.update_one({"ProjectID": projectid}, {"$set": {"HWSets": project_hardware}})
    hwsets.update_one({"Name": hwsetname}, {"$set": {"Availability": availability - qty_checked_out}})

    return {
        'projectid': projectid,
        'hwsetname': hwsetname,
        'qty': qty,
        'response': f'{qty_checked_out} hardware checked out from {hwsetname}'
    }


@app.route('/join/<int:projectid>/<string:userid>')
def joinProject(projectid, userid):
    project = projects.find_one({"ProjectID": projectid})
    users = project['Users']
    users.append(userid)

    projects.update_one({"ProjectID": projectid}, {"$set": {"Users": users}})

    return {
        'response': f'Joined {projectid}'
    }


@app.route('/leave/<int:projectid>/<string:userid>')
def leaveProject(projectid, userid):
    project = projects.find_one({"ProjectID": projectid})
    users = project['Users']
    users.remove(userid)

    projects.update_one({"ProjectID": projectid}, {"$set": {"Users": users}})

    return {
        'response': f'Left {projectid}'
    }


@app.route("/signup/<string:username>/<string:userID>/<string:password>/<string:confirmPassword>")
def signup(username, userID, password, confirmPassword):
    if password == confirmPassword:
        # encryptedID = fernet.encrypt(userID.encode())
        encryptedPassword = fernet.encrypt(password.encode())
        newUserDoc = {
            'Username': username,
            'UserID': userID,
            'Password': encryptedPassword
        }
        if users.find_one({"UserID": userID}) != None:
            response = 'account with that userID already exists'
        else:
            users.insert_one(newUserDoc)
            response = 'new user created'
    else:
        response = 'passwords must match'
    return {
        'response': response,
        'userID': userID
    }


@app.route("/login/<string:userID>/<string:password>")
def login(userID, password):
    # encryptedID = fernet.encrypt(userID.encode())
    user_query = {"UserID": userID}
    user_document = users.find_one(user_query)
    if user_document == None:
        return {
            'response' : 'userID not found'
        }
    passwordCheck = user_document["Password"]
    decryptedCheck = fernet.decrypt(passwordCheck).decode()
    if password == decryptedCheck:
        response = 'successfully logged in'

    else:
        response = 'incorrect password'
    return {
        'response': response,
        'userID': userID
    }

# Create a project
@app.route("/createproject/<string:projectName>/<string:description>/<string:projectID>/<string:authorizedUsers>")
def createProject(projectName, description, projectID, authorizedUsers):
    authorizedUserArray = authorizedUsers.split(',')
    project_document = {
        'ProjectID': projectID,
        'ProjectName': projectName,
        'Users': [],
        'Project Description': description,
        'HWSets': {'HWSet1': 0, 'HWSet2': 0},
        'Authorized Users': authorizedUserArray
    }
    if projects.find_one({"ProjectID": projectID}) != None:
            response = 'project with that ProjectID already exists'
    else:
        projects.insert_one(project_document)
        response = 'new project created'

    return {
        'response': response
    }

if __name__ == "__main__":
    app.run(host='0.0.0.0')

# Close the database collection
# client.close()

