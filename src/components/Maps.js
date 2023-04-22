import React from "react";
import GoogleMapReact from "google-map-react";

class Marker extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <img className="ui pin" />
      </div>
    );
  }
}

class Map extends React.Component {
  constructor() {
    super();
    this.getMapCoordinates = this.getMapCoordinates.bind(this);
  }

  getMapCoordinates({ lat, lng }) {
    this.props.onMapClick({ lat, lng });
  }

  render() {
    // console.log(this.props.markerCoord.lat);
    const defaultProps = {
      center: {
        lat: 43.8021959858542,
        lng: -79.17466031119214,
      },
      zoom: 11,
    };
    return (
      <div className="ui main">
        <div className="ui two column centered grid">
          <div className="column">
            <h2>Click the map to search</h2>
          </div>
          <div className="one column centered row">
            <div className="column map" style={{ height: "40vh", width: "40vw" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onClick={this.getMapCoordinates}
              >
                {
                  <Marker
                    lat={this.props.currentSearch.lat}
                    lng={this.props.currentSearch.lng}
                    text="tst"
                  />
                }
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
