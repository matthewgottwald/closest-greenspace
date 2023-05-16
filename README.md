# Description of APP

A serverless webapp that allows the user to search for the closest provincial park by clicking on the map or entering coordinates. The back end of this project utilizes AWS Lambda, API Gateway and RDS.

# Example of a search for a park

<img width="958" alt="image" src="https://user-images.githubusercontent.com/45056814/235562707-77d3c091-51af-42a7-8eeb-fda79bcddfca.png">

# Setup

To setup the front-end: <br />
Create a file .env.local at top directory level. Inside this add a constant "REACT_APP_GOOGLE_MAPS_API_KEY" with your Google Maps API Key. <br />
bash <br />
npm i <br />

To start the app: <br />
npm start <br />

To setup the back-end:
Create a AWS Database with the ontario_provincial_parks dataset (When developing I was using the free version (has since been shutdown)) <br />
Configure an API Gateway with endpoint /greenspaces <br />
Create a lambda function with the lambda function code under amplify (this will handle the processing of the data for the front end) <br />
Update API Details under App.js
