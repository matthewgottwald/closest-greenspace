import React from "react";

// Displays the the searched coordinate item
class SearchedCoordinateItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { lat, lng } = this.props.coordinates;
    return (
      <tr>
        <td data-label="Age">{lat}</td>
        <td data-label="Job">{lng}</td>
      </tr>
    );
  }
}

export default SearchedCoordinateItem;
