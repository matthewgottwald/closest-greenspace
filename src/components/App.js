import React from "react";
import "./App.css";
import Header from "./Header";
import SearchCoordinates from "./SearchCoordinates";
import SearchedCoordinateList from "./SearchedCoordinateList";
import ClosestGreenspace from "./ClosestGreenspace";
import Amplify, { API } from "aws-amplify";
import { v4 as uuid } from "uuid";
import Map from "./Maps";

const myAPI = "apic0a8a592";
const path = "/greenspaces";

class App extends React.Component {
  constructor() {
    super();
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.state = {
      searchedCoordinates: [],
      closestGreenspace: [],
      closestGreenspace1: {
        park_name: null,
        lat: null,
        lng: null,
        desc: null,
        operationStatus: null,
        distance: null,
      },
      currentSearch: { lat: 0, lng: 0 },
    };
  }

  onMapClick(coordinates) {
    this.setState({
      searchedCoordinates: [...this.state.searchedCoordinates, coordinates],
      currentSearch: coordinates,
    });

    const myInit = {
      response: true,
      queryStringParameters: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    };

    API.get(myAPI, path, myInit).then((response) => {
      console.log(response.data);
      this.setState({
        closestGreenspace1: {
          park_name: response.data[0],
          lat: response.data[1],
          lng: response.data[2],
          distance: response.data[3],
        },
      });
    });

    // API.get(myAPI, path, myInit).then((response) => {
    //   this.setState({
    //     closestGreenspace: [
    //       ...this.state.closestGreenspace,
    //       {
    //         id: uuid(),
    //         park_name: response.data[0],
    //         latitude: response.data[1],
    //         longitude: response.data[2],
    //         distance: response.data[3],
    //       },
    //     ],
    //   });
    // });
  }

  onSearchSubmit(coordinates) {
    this.setState({
      searchedCoordinates: [...this.state.searchedCoordinates, coordinates],
    });

    const myInit = {
      response: true,
      queryStringParameters: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    };

    API.get(myAPI, path, myInit).then((response) => {
      this.setState({
        closestGreenspace: [
          ...this.state.closestGreenspace,
          {
            id: uuid(),
            park_name: response.data[0],
            latitude: response.data[1],
            longitude: response.data[2],
            distance: response.data[3],
          },
        ],
      });
    });
  }

  render() {
    return (
      <div className="ui container">
        <Header />
        <div className="ui grid">
          <div className="ui eleven wide column">
            <Map
              onMapClick={this.onMapClick}
              currentSearch={this.state.currentSearch}
            />
          </div>
          <div className="ui one wide column"></div>
          <div className="ui four wide column">
            <SearchCoordinates
              onSearchSubmit={this.onSearchSubmit}
              currentSearch={this.state.currentSearch}
            />
          </div>
        </div>
        <ClosestGreenspace closestGreenspace={this.state.closestGreenspace1} />
        <SearchedCoordinateList greenspaces={this.state.closestGreenspace} />
      </div>
    );
  }
}

export default App;
