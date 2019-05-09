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

  constructor(props) {
    super(props);
    this.state = {
      texto: '',
      resultado: false,
      encontrada: true
    }
    this.buscar = this.buscar.bind(this)
    this.mostrarDatos = this.mostrarDatos.bind(this)
    this.encontrada = this.encontrada.bind(this)
  }
   mostrarDatos(){
    if(this.state.resultado){
      return(
        <View>
          <Text>
          {this.state.resultado.name}
          </Text>
          <Text>
          {this.state.resultado.run}
          </Text>

          {this.state.resultado.validity ? <Text>
            Al día
          </Text>: <Text>
            Atrasado
          </Text>}


        </View>
      )
    }
  }
  buscar(){
    var runV = ''
    var i = 0
    for (i = 0; i < this.state.texto.length-1; i++) {
      runV = runV + this.state.texto[i]
    }
    runV = runV + '-' + this.state.texto[i];
    console.log(runV)
    const PatientDTO = {
      run: runV
    }
    var link = "http://scanpapp.herokuapp.com/app/consultation?run=" + runV;
    axios.get(link)
    .then(res=>{
      console.log("hola");
      console.log(res.data);
      this.setState({resultado: res.data})
      this.setState({encontrada: true})
    })
    .catch((error)=>{
      console.log("hola2");
      this.setState({encontrada: false})
      this.setState({resultado: false})

    })
  }
  encontrada(){
    if(!this.state.encontrada){
      return(
        <Text>
          Paciente no encontrada
        </Text>
      )
    }
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
          onChangeText={(text)=>this.setState({texto: text})}
        />
        <Text>
        {this.state.texto}
        </Text>
        <Button
          onPress={this.buscar}
          title="Consultar"
        />
        <View>
          {this.mostrarDatos()}
        </View>
        <View>
          {this.encontrada()}
        </View>


          <View>
            <Button
             onPress={this.buscar}
             title="Consultar"
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
    backgroundColor: '#0089B1',
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
