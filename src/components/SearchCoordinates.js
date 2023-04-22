import React from "react";

class SearchCoordinates extends React.Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.state = {
      currentSearch: {
        lat: props.currentSearch.lat,
        lng: props.currentSearch.lng,
      },
    };
  }

  add(e) {
    console.log(this.state);
    e.preventDefault();
    if (this.state.latitude === 0 || this.state.longitude === 0) {
      alert("All the fields are mandatory!");
      return;
    }
    this.props.onSearchSubmit(this.state);
    this.setState({
      currentSearch: {
        lat: 0,
        lng: 0,
      },
    });
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
              value={this.state.currentSearch.lat}
              onChange={(e) =>
                this.setState((prevState) => ({
                  currentSearch: {
                    ...prevState.currentSearch,
                    lat: e.target.value,
                  },
                }))
              }
            />
          </div>
          <div className="field">
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={this.state.currentSearch.lng}
              onChange={(e) =>
                this.setState((prevState) => ({
                  currentSearch: {
                    ...prevState.currentSearch,
                    lng: e.target.value,
                  },
                }))
              }
            />
          </div>
          <button className="ui button blue">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchCoordinates;
