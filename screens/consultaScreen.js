import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StyleSheet, View, TextInput, Image, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

class ConsultaScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      texto: '',
      resultado: false,
      encontrada: true
    }
  }

  componentDidMount(){
    console.log(this.props.paciente.paciente);
    var link = "http://scanpapp.herokuapp.com/app/consultation?run=" + this.props.paciente.paciente;
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

  render(){
    return(
      <View>
        {this.mostrarDatos()}
      </View>
    )
  }

}

const mapStateToProps = state => {
    return {
        paciente: state.paciente
    }
}

export default connect(mapStateToProps)(ConsultaScreen);
