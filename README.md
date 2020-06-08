## Create and configure the Slack App

Create the slack App, enable interactive components, get the signin secret and the slack api token 

## Setup the project

Clone this repository, create an .env file with the following keys   
```
SLACK_SIGNING_SECRET = YOUR_SIGNIN_SECRET  
SLACK_API_TOKEN =  YOUR_API_TOKEN    
PORT = 3000
```
Build then start the project, in termianl run : 

```
npm run build
npm start
```

## Let your localhost communicate with the world 

Install ngrok for tuning requests from slack to your localhost
then run 
```
ngrok http 3000
```
copy the forwarding your URL to your Request URL in Interactivity & Shortcuts section of your Slack App configuration

## Brief demonstration
