import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { MapView } from "expo";

export default class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        markers: [],
        latitude: 0,
        longitude: 0,
        flex:0,
      };
      this.mapa = this.mapa.bind(this)
      this.regionChange = this.regionChange.bind(this)
    }


    fetchMarkerData(latitude, longitude) {
      var link = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude +',' + longitude + '&radius=2000&language=es&type=HOSPITAL&keyword=CESFAM&key=AIzaSyD5Lg6rnw91AxLNg7dqy2C1MrZGcG1zsoQ'
      fetch(link)
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
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          this.fetchMarkerData(position.coords.latitude, position.coords.longitude);
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      setTimeout(()=>this.setState({flex: 1}),5);
    }

    componentDidUpdate(prevProps, prevState){
      if(this.state.flex != prevState.flex){
        console.log("asndbsjhdbfs\n");
        this.mapa()
        console.log("adsasd\n");
      }
    }

    regionChange(region){
      this.setState({
        latitude: region.latitude,
        longitude: region.longitude
      }, ()=>{
        this.fetchMarkerData(region.latitude, region.longitude)
      })

      console.log(region);

    }

    mapa(){
        return(
          <MapView
            provider={MapView.PROVIDER_GOOGLE}
            style={{flex: this.state.flex}}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onRegionChangeComplete={this.regionChange}

          >
              {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
               const coords = {
                   latitude: marker.geometry.location.lat,
                   longitude: marker.geometry.location.lng,
               };
               const metadata = `Dirección: ${marker.vicinity}`;
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
        )

    }


    render() {
      return (
        <View style={{flex:1}}>
          {this.mapa()}
        </View>
        );
  }
}
