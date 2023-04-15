import React from "react";
import "./App.css";
import Header from "./Header";
import SearchCoordinates from "./SearchCoordinates";
import GreenspaceResult from "./GreenspaceResult";
import Amplify, { API } from "aws-amplify";
import { v4 as uuid } from "uuid";

const myAPI = "apic0a8a592";
const path = "/greenspaces";
const myInit = {
  response: true,
  queryStringParameters: {
    latitude: "43.44752191219844",
    longitude: "-80.50109506414753",
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.state = {
      searchedCoorindates: [],
      greenspaces: [],
    };
  }

  onSearchSubmit(coordinates) {
    this.setState({
      searchedCoorindates: [...this.state.searchedCoorindates, coordinates],
    });
    let latitude = coordinates.latitude;
    let longitude = coordinates.longitude;
    API.get(myAPI, path, myInit).then((response) => {
      this.setState({
        greenspaces: [
          ...this.state.greenspaces,
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
        <SearchCoordinates onSearchSubmit={this.onSearchSubmit} />
        <GreenspaceResult greenspaces={this.state.greenspaces} />
      </div>
    );
  }
}

export default App;
