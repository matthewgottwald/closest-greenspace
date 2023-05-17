import json
import pymysql

# Configuration values of Database (Must Modify This Database is now disabled)
endpoint = 'greenspaces-database.ctsnk4nhnrde.us-east-2.rds.amazonaws.com'
username = 'admin'
password = 'Enter'
database_name = 'greenspaces'
active_table = 'ontario_provincial_parks'
operating_park = True
non_operating_park = True

# Connect to database
connection = pymysql.connect(
    host=endpoint, user=username, passwd=password, db=database_name)


# def exception_handler(e):
#     if (e == "Missing queryStringParameters"):
#         status_code = 400
#         return {
#             'statusCode': status_code,
#             'body': json.dumps(str(e))
#         }


# This function will return the closest provincial park
def getClosestPark(event):
    cursor = connection.cursor()

    # Get the Latitude and Longitude from the request
    if ('queryStringParameters' in event and 'latitude' in event['queryStringParameters'] and 'longitude' in event['queryStringParameters']):
        cur_latitude = float(event["queryStringParameters"]["latitude"])
        cur_longitude = float(event["queryStringParameters"]["longitude"])
    else:
        # return error if query string not provided
        return {
            'statusCode': 400,
            'body': json.dumps(str("Missing queryStringParameters"))
        }

    # radius of the search
    search_distance = 25

    # Get the required data from the database - increase the radius until we get a result
    while (cursor.rowcount <= 0):
        # General Query - Search all operating and non-operating parks
        if operating_park and non_operating_park:
            cursor.execute(
                'SELECT park_name, latitude, longitude, description, park_operating, SQRT(POW(111.2 * (latitude - ' + str(cur_latitude) + '), 2) + POW(111.2 * (' + str(cur_longitude) + ' - longitude) * COS(latitude / 57.3), 2)) AS distance  FROM ' + active_table + ' HAVING distance < ' + str(search_distance) + ' ORDER BY distance')

        # Search only operating parks
        elif operating_park and not non_operating_park:
            cursor.execute(
                'SELECT park_name, latitude, longitude, description, park_operating, SQRT(POW(111.2 * (latitude - ' + str(cur_latitude) + '), 2) + POW(111.2 * (' + str(cur_longitude) + ' - longitude) * COS(latitude / 57.3), 2)) AS distance  FROM ' + active_table + ' WHERE park_operating = "TRUE" HAVING distance < ' + str(search_distance) + ' ORDER BY distance')

        # Search only non-operating parks
        elif not operating_park and non_operating_park:
            cursor.execute(
                'SELECT park_name, latitude, longitude, description, park_operating, SQRT(POW(111.2 * (latitude - ' + str(cur_latitude) + '), 2) + POW(111.2 * (' + str(cur_longitude) + ' - longitude) * COS(latitude / 57.3), 2)) AS distance  FROM ' + active_table + ' WHERE park_operating = "FALSE" HAVING distance < ' + str(search_distance) + ' ORDER BY distance')

        # Double the radius if no results found
        search_distance = search_distance * 2

    closest_greenspaces = cursor.fetchall()
    print(closest_greenspaces)

    response = {'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps({"park_name": closest_greenspaces[0][0],
                                    "latitude": closest_greenspaces[0][1],
                                    "longitude": closest_greenspaces[0][2],
                                    "description": closest_greenspaces[0][3],
                                    "park_operating": closest_greenspaces[0][4],
                                    "distance": closest_greenspaces[0][5]})
                }
    return response


# function called when lambda is invoked
def handler(event, context):
    print('received event:')
    print(event)

    # try:
    if (event["httpMethod"] == "GET"):
        return getClosestPark(event)
    # except Exception as e:
    #     return exception_handler(e)
