import React, { Component } from 'react';

import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default class App extends Component<{}> {

  constructor()
  {
    super();

    this.state={


    }
  }

  CheckValueIsNumberOrNot=()=>{

    if(isNaN(this.state.Value))
    {
      // If the Given Value is Not Number Then It Will Return True and This Part Will Execute.
      Alert.alert("Ingrese solo números");
    }
    else
    {
      // If the Given Value is Number Then It Will Return False and This Part Will Execute.
      Alert.alert("Value is Number");
    }

  }


  render() {
    return (
      <View style={styles.MainContainer}>

          <TextInput

              placeholder="Enter Some Text here"

              onChangeText={ TextInputValue => this.setState({Value: TextInputValue}) }

              style={styles.TextInputStyle}
            />

           <Button title="Ingrese solo números" onPress={this.CheckValueIsNumberOrNot} />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextInputStyle:{

       textAlign: 'center',
       height: 50,
       width: '95%',
       marginBottom: 10
     },
});
