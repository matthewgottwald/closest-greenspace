import React from "react";

class SearchCoordinates extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      currentSearch: {
        lat: props.currentSearch.lat,
        lng: props.currentSearch.lng,
      },
    };
  }

  // Submits the searched coordinates to be searched
  search(e) {
    e.preventDefault();
    if (this.state.latitude === 0 || this.state.longitude === 0) {
      alert("All the fields are mandatory!");
      return;
    }
    this.props.onSearchSubmit(this.state.currentSearch);
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
        <form className="ui form" onSubmit={this.search}>
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
