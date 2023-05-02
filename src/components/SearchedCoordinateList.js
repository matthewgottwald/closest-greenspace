import React from "react";
import SearchedCoordinateItem from "./SearchedCoordinateItem";

class SearchedCoordinateList extends React.Component {
  constructor() {
    super();
    this.renderGreenspaceList = this.renderGreenspaceList.bind(this);
  }

  renderGreenspaceList() {
    this.props.searchedCoordinates.map((coordinates) => {
      return (
        <SearchedCoordinateItem
          coordinates={coordinates}
          key={coordinates.id}
        />
      );
    });
  }

  render() {
    return (
      <div className="ui main">
        <h2 className="center">Previous Coordinate Searches</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {this.props.searchedCoordinates.map((coordinates) => {
              return (
                <SearchedCoordinateItem
                  coordinates={coordinates.coordinates}
                  key={coordinates.id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchedCoordinateList;
