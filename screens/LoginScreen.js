import React from 'react';
import { StyleSheet, View, TextInput, Image, Text, ScrollView, Button } from 'react-native';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.state= {

    }
    this.click = this.click.bind(this)
  }

  click(){
    this.props.navigation.navigate('Home')
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
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
