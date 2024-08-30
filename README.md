# Python AI Debater

## About

- This program offers a CLI interface of a debate between AI and itself.
- The AI model used in this case is Gemini Flash 1.5.
- You need to have an API key configured in your enviroment variables
    
    `GOOGLE_API_KEY = "*************"`

## To Use CLI Version
- To use it I advice the creation of a Python3 virtual environment and installing the requirements in [requirements.txt](./requirements.txt).
- You can then run the app [debate.py](./debate.py).
- It takes some CLI arguments. You can use the command `python3 debate.py -h` or `python3 debate.py --help` to see how to use the CLI arguments.

## To Use Web-based Version
- To use the web interface, you need to install npm and node-js. Then you can run `npm install` which will install all the necessary npm packages required by the project.
- Next, I advice the creation of a Python3 virtual environment and installing the requirements in [requirements.txt](./requirements.txt) by using the command `pip install -r requirements.txt`
- Then you need to run the backend web app by running `python3 webapp.py`.
- Then you can run the command `npm start` to start the front end of the web application.

**End**