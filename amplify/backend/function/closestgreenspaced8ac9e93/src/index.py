import json
import pymysql
from math import radians, cos, sin, asin, sqrt

pi = 3.141592653589793

# Configuration values of Database
endpoint = 'greenspaces-database.ctsnk4nhnrde.us-east-2.rds.amazonaws.com'
username = 'admin'
password = 'greenspaces'
database_name = 'greenspaces'
active_table = 'kitchener_greenspaces'
city = None
subcategory = None

# Connection
connection = pymysql.connect(
    host=endpoint, user=username, passwd=password, db=database_name)
cursor = connection.cursor()


def handler(event, context):
    print('received event:')
    print(event)

    # Get the Latitude and Longitude from the request
    cur_latitude = float(event["queryStringParameters"]["latitude"])
    cur_longitude = float(event["queryStringParameters"]["longitude"])

    cur_latitude_rad = cur_latitude * (pi / 180)
    cur_longitude_rad = cur_longitude * (pi / 180)

    # Get the required data from the database
    # General Query - NO city, subcategory
    if (city is None) and (subcategory is None):
        cursor.execute(
            'SELECT greenspace_name, latitude, longitude, SQRT(POW(111.2 * (latitude - ' + str(cur_latitude) + '), 2) + POW(111.2 * (' + str(cur_longitude) + ' - longitude) * COS(latitude / 57.3), 2)) AS distance  FROM ' + active_table + ' HAVING distance < 25 ORDER BY distance')

    # City Query - No subcategory
    elif (city is not None) and (subcategory is None):
        cursor.execute('SELECT greenspace_name, latitude, longitude FROM ' +
                       active_table + ' WHERE city = ' + city)

    # City + Subcategory Query
    elif (city is not None) and (subcategory is not None):
        cursor.execute('SELECT greenspace_name, latitude, longitude FROM ' +
                       active_table + ' WHERE city = ' + city + ' AND subcategory = ' + subcategory)

    closest_greenspaces = cursor.fetchall()

    return {
        'statusCode': 200,
        'headers': {
            # 'Content-Type': 'application/json'
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(closest_greenspaces[0])
    }


# def dist(lat1, long1, lat2, long2):
#     # convert decimal degrees to radians
#     lat1, long1, lat2, long2 = map(radians, [lat1, long1, lat2, long2])
#     # haversine formula
#     dlon = long2 - long1
#     dlat = lat2 - lat1
#     a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
#     c = 2 * asin(sqrt(a))
#     r = 6371  # Radius of earth in kilometers is 6371
#     km = r * c
#     return km
