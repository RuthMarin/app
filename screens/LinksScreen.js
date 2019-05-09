import React from 'react';
import { ScrollView, StyleSheet, View, TextInput, Text, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

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
      <ScrollView style={styles.container}>
        
        <View>
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

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
