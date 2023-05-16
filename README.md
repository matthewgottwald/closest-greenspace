# Description of APP

A serverless webapp that allows the user to search for the closest provincial park by clicking on the map or entering coordinates. The back end of this project utilizes AWS Lambda, API Gateway and RDS.

# Example of a search for a park

<img width="960" alt="Screenshot 2023-05-16 134321" src="https://github.com/matthewgottwald/closest-greenspace/assets/45056814/f01f2b34-ce3e-4ac9-824d-3fae7e133612">

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
