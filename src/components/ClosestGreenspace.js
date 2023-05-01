import React from "react";

class SearchCoordinates extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="ui main">
        <h2>The closest greenspace is</h2>
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
              <td data-label="Latitude">24</td>
              <td data-label="Longitude">Engineer</td>
              <td data-label="Description">Engineer</td>
              <td data-label="Operation Status">Engineer</td>
              <td data-label="Distance">Engineer</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchCoordinates;
