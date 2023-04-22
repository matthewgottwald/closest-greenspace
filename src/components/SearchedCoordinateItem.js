import React from "react";

class GreenspaceItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { id, park_name, latitude, longitude, distance } =
      this.props.greenspace;
    return (
      <tr>
        <td data-label="Latitude">{park_name}</td>
        <td data-label="Age">{latitude}</td>
        <td data-label="Job">{longitude}</td>
      </tr>
    );
  }
}

export default GreenspaceItem;
