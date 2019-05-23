import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StyleSheet, View, TextInput, Image,Alert, Text, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';


class HomeScreen extends Component<{}> {

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
      if(this.state.resultado.validity){
        return(
          <View>
            <Text>
              Nombre: {this.state.resultado.name}
            </Text>
            <Text>
              {this.state.resultado.run}
            </Text>
            <Text>
              Años :{this.state.resultado.age}
            </Text>
            <Text>
              Toma de Examen:{this.state.resultado.lastPapDate}
            </Text>
            <Text>
              Vigencia :{this.state.resultado.validityDate}
            </Text>
            <Text>
              Al día
            </Text>
          </View>
        )
      }
      else{
        return(
          <View>
            <Text>
              Nombre: {this.state.resultado.name}
            </Text>
            <Text>
              {this.state.resultado.run}
            </Text>
            <Text>
              Años :{this.state.resultado.age}
            </Text>
            <Text>
              Toma de Examen:{this.state.resultado.lastPapDate}
            </Text>
            <Text>
              Vigencia :{this.state.resultado.validityDate}
            </Text>
            <Text>
              Atrasado
            </Text>
            <Text>
              Años :{this.state.resultado.diffYears}
            </Text>
            <Text>
              Meses :{this.state.resultado.diffMonths}
            </Text>
            <Text>
              Días:{this.state.resultado.diffDays}
            </Text>
          </View>
        )
      }

    }
  }
  buscar(){
    
    if(isNaN(this.state.texto))
    {
      // If the Given Value is Not Number Then It Will Return True and This Part Will Execute.
      Alert.alert("Ingrese solo números");
    }
    else
    {
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
      console.log(this.props);

      var link = "http://scanpapp.herokuapp.com/app/consultation?run=" + runV;
      axios.get(link)
      .then(res=>{
        console.log("hola");
        console.log(res.data);
        this.props.setPaciente(res.data)
        this.setState({encontrada: true})
        this.props.navigation.navigate('Consulta')
      })
      .catch((error)=>{
        console.log("hola2");
        this.setState({encontrada: false})
        this.setState({resultado: false})

      })
    }

  }
  encontrada(){
    if(!this.state.encontrada){
      return(
       <View style={{marginTop: 18, padding:2,
       backgroundColor: '#dc2424',
       alignItems: 'center', width:200,height: 32, borderRadius:3}}>
            <Text style={{textAlign: 'center',color: '#ffffff'}}>
              Paciente no encontrado  <Image
                  source={require('../assets/images/error.png')}
                  style={styles.ImageStyle4}
                />
            </Text>
          </View>

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
              keyboardType='numeric'
              onChangeText={(text)=> this.onChanged(text)}
              value={this.state.myNumber}
              maxLength={9}  //setting limit of input
              onFocus={(event) => this.onFocus(event)}
              onChangeText={(text)=>this.setState({texto: text})}
            />
          </View>
          <View >

            {this.encontrada()}
          </View>

          <View style={{marginTop:18}}>
            <Button
             onPress={this.buscar}
             title="Consultar"
              containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:5, backgroundColor: '#80D2DA'}}
              disabledContainerStyle={{backgroundColor: '#ffc8eb'}}
              style={{fontSize: 17, color: 'white'}}>
              Consultar
            </Button>
          </View>

          <View>
            {this.mostrarDatos()}
          </View>


        </ScrollView>

      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
    return {
        paciente: state.paciente
    }
}

export default connect(mapStateToProps, actions)(HomeScreen);


const styles = StyleSheet.create({
  contenedorGrande: {
     flex: 1,
    backgroundColor: '#fff',
    resizeMode: 'cover',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  ImageStyle4: {
    height: 20,
    width: 20,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
},
});
