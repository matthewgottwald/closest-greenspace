import React from "react";
import GreenspaceItem from "./SearchedCoordinateItem";

class GreenspaceResult extends React.Component {
  constructor() {
    super();
    this.renderGreenspaceList = this.renderGreenspaceList.bind(this);
  }

  renderGreenspaceList() {
    this.props.greenspaces.map((greenspace) => {
      return <GreenspaceItem greenspace={greenspace} key={greenspace.id} />;
    });
  }

  render() {
    return (
      <div className="ui main">
        <h2 className="center">Previous Coordinate Searches</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Park Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {this.props.greenspaces.map((greenspace) => {
              return (
                <GreenspaceItem greenspace={greenspace} key={greenspace.id} />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GreenspaceResult;

// render() {
//   return (
//     <div className="ui main">
//       <h2>Closest Greenspaces</h2>
//       <table className="ui celled table">
//         <thead>
//           <tr>
//             <th>Park Name</th>
//             <th>Latitude</th>
//             <th>Longitude</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td data-label="Latitude">James</td>
//             <td data-label="Age">24</td>
//             <td data-label="Job">Engineer</td>
//           </tr>
//           <tr>
//             <td data-label="Name">Jill</td>
//             <td data-label="Age">26</td>
//             <td data-label="Job">Engineer</td>
//           </tr>
//           <tr>
//             <td data-label="Name">Elyse</td>
//             <td data-label="Age">24</td>
//             <td data-label="Job">Designer</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
