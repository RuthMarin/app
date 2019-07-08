import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Encuentra tu CESFAM más cercano',
  };
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        markers: [],
      };
    }


      fetchMarkerData() {
      fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.4500409,-70.6899903&radius=1500&type=HOSPITAL&keyword=CESFAM&key=AIzaSyD5Lg6rnw91AxLNg7dqy2C1MrZGcG1zsoQ')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            markers: responseJson.results,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    componentDidMount() {
      this.fetchMarkerData();
  }


    render() {
    return (
      <MapView
      style={{ flex: 1 }}
      region={{
        latitude: -33.4372,
        longitude: -70.6506,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
  >
          {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
       const coords = {
           latitude: marker.geometry.location.lat,
           longitude: marker.geometry.location.lng,
       };
       const metadata = `Status: ${marker.vicinity}`;
       return (
           <MapView.Marker
              key={index}
              coordinate={coords}
              title={marker.name}
              description={metadata}
           />
       );
    })}
  </MapView>
  );
  }
}
