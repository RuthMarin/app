import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { StyleSheet, View, TextInput, Image, Text, ScrollView, Button } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };
  constructor(props){
    super(props);
    this.state= {

    }
    this.click = this.click.bind(this)
  }

  click(){
    this.props.navigation.navigate('Login')
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return(
      <View>
        <ExpoConfigView />
        <Text>
        Hola
        </Text>
        <Button
          title="Click"
          onPress={this.click}
        />
      </View>
    );
  }
}
