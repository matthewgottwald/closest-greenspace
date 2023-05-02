import React from "react";
import SearchedCoordinateItem from "./SearchedCoordinateItem";

// displays the searched coordinate list
class SearchedCoordinateList extends React.Component {
  constructor() {
    super();
    // this.renderGreenspaceList = this.renderGreenspaceList.bind(this);
  }

  // // Displays the list
  // renderGreenspaceList() {
  //   this.props.searchedCoordinates.map((coordinates) => {
  //     return (
  //       <SearchedCoordinateItem
  //         coordinates={coordinates}
  //         key={coordinates.id}
  //       />
  //     );
  //   });
  // }

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
            {
              // Display all searched coordinates stored
              this.props.searchedCoordinates.map((coordinates) => {
                return (
                  <SearchedCoordinateItem
                    coordinates={coordinates.coordinates}
                    key={coordinates.id}
                  />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchedCoordinateList;
