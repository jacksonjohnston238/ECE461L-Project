# Getting Started

## Local Development
- Navigate to /app
- Activate venv `. venv/bin/activate` 
- Install python dependencies `pip install -r requirements.txt`
- Start the flask server `flask --app app run`
- Install react dependencies `npm install`
- Start the react server `npm start`

## Deployment
- Navigate to /app
- Build the react app `npm run build`
- Add new files to heroku 
```
    heroku login
    heroku git:remote -a software-squad-project
    git add .
    git commit -m "my message for heroku"
    git push heroku master
```

