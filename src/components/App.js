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
      closestGreenspace: {
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
      searchedCoordinates: [
        ...this.state.searchedCoordinates,
        { id: uuid(), coordinates: coordinates },
      ],
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
        closestGreenspace: {
          park_name: response.data.park_name,
          lat: response.data.latitude,
          lng: response.data.longitude,
          desc: response.data.description,
          operationStatus: response.data.park_operating,
          distance: response.data.distance,
        },
      });
    });
  }

  onSearchSubmit(coordinates) {
    this.setState({
      searchedCoordinates: [
        ...this.state.searchedCoordinates,
        { id: uuid(), coordinates: coordinates },
      ],
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
        closestGreenspace: {
          park_name: response.data.park_name,
          lat: response.data.latitude,
          lng: response.data.longitude,
          desc: response.data.description,
          operationStatus: response.data.park_operating,
          distance: response.data.distance,
        },
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
        <ClosestGreenspace closestGreenspace={this.state.closestGreenspace} />
        <SearchedCoordinateList
          searchedCoordinates={this.state.searchedCoordinates}
        />
      </div>
    );
  }
}

export default App;
