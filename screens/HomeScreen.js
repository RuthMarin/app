import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StyleSheet, View, TextInput, Image, Text, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class App extends Component<{}> {

  _scrollToInput (reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }
  onFocus(e) {
    const node = ReactNative.findNodeHandle(e.target)
    this.refs.scroll.scrollToFocusedInput(node)
  }

  render() {
    return (
      <KeyboardAwareScrollView
      contentContainerStyle={styles.contenedorGrande}
      enableOnAndroid={true}
        ref="scroll"
      >
          <ScrollView contentContainerStyle={styles.container}>

          <Image
            source={require('../assets/images/fff.png')}
            style={styles.ImageStyle2}
          />
          <Image
            source={require('../assets/images/qqq.png')}
            style={styles.ImageStyle3}
          />
          <View style={styles.SectionStyle}>
            <Image
              source={require('../assets/images/icon-cervical-vph.png')}
              style={styles.ImageStyle}
            />


            <TextInput
              style={{ flex: 1 }}
              placeholder="Ingresa tu R.U.N aquí"
              underlineColorAndroid="transparent"
              onFocus={(event) => this.onFocus(event)}
            />


          </View>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Ingresa tu R.U.N aquí"
            underlineColorAndroid="transparent"
            onFocus={(event) => this.onFocus(event)}
          /><TextInput
            style={{ flex: 1 }}
            placeholder="Ingresa tu R.U.N aquí"
            underlineColorAndroid="transparent"
            onFocus={(event) => this.onFocus(event)}
          /><TextInput
            style={{ flex: 1 }}
            placeholder="Ingresa tu R.U.N aquí"
            underlineColorAndroid="transparent"
            onFocus={(event) => this.onFocus(event)}
          />
          <View>
            <Button
              containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:5, backgroundColor: 'white'}}
              disabledContainerStyle={{backgroundColor: '#ffc8eb'}}
              style={{fontSize: 17, color: '#1b4d83'}}>
              Consultar
            </Button>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contenedorGrande: {
     flex: 1,
    backgroundColor: '#243771',
    resizeMode: 'cover',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0089B1',
    borderRadius: 5,
    
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#0089B1',
    height: 40,
    borderRadius:100,
    margin: 10,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
   ImageStyle2: {
    padding: 10,
    margin: 5,
    height: 100,
    width: 190,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  ImageStyle3: {
    padding: 10,
    margin: 5,
    height: 140,
    width: 160,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
},
});
