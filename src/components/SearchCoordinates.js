import React from "react";

class SearchCoordinates extends React.Component {
  constructor() {
    super();
    this.add = this.add.bind(this)
    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  add(e) {
    e.preventDefault();
    if (this.state.latitude === 0 || this.state.longitude === 0) {
      alert("All the fields are mandatory!");
      return;
    }
    this.props.onSearchSubmit(this.state);
    this.setState({ latitude: 0, longitude: 0 });
  }

  render() {
    return (
      <div className="ui main">
        <h2>Search Coordinates</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={this.state.latitude}
              onChange={(e) => this.setState({ latitude: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={this.state.longitude}
              onChange={(e) => this.setState({ longitude: e.target.value })}
            />
          </div>
          <button className="ui button blue">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchCoordinates;
