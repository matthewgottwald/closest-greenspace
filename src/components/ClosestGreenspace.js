import React from "react";

// This class handles displaying the closest greenspace
class ClosestGreenspace extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="ui main">
        <h2 className="center">The closest provincial park is:</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Park Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Description</th>
              <th>Operation Status</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Park Name">
                {this.props.closestGreenspace.park_name}
              </td>
              <td data-label="Latitude"> {this.props.closestGreenspace.lat}</td>
              <td data-label="Longitude">
                {" "}
                {this.props.closestGreenspace.lng}
              </td>
              <td data-label="Description">
                {" "}
                {this.props.closestGreenspace.desc}
              </td>
              <td data-label="Operation Status">
                {" "}
                {this.props.closestGreenspace.operationStatus}
              </td>
              <td data-label="Distance">
                {" "}
                {this.props.closestGreenspace.distance}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ClosestGreenspace;
