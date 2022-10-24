# Getting Started

## Local Development
- Update API calls in React to use the https://localhost:5000/ base url
- Activate venv `. venv/bin/activate` 
- Install python dependencies `pip install -r requirements.txt`
- Start the flask server `flask --app app run`
- Install react dependencies `npm install`
- Start the react server `npm start`

## Deployment
- Update API calls in React to use the '/' url
- Build the react app `npm run build`
- Navigate to /app
- Add new files to heroku 
```
    heroku login
    heroku git:remote -a software-squad-project
    git add .
    git commit -m "my message for heroku"
    git push heroku master
```

