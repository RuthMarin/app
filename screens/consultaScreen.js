import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StyleSheet, View, Platform, SectionList, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

class ConsultaScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      texto: '',
      resultado: false,
      encontrada: true,
      datP: {},
      vigencia: {},
      info: {}
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
      var datP = [];
      datP.push({
        label: "Nombre",
        value: res.data.name
      })
      datP.push({
        label: "Edad",
        value: res.data.age
      })
      datP.push({
        label: "Fecha de Nacimiento",
        value: res.data.birthDate
      })
      console.log(datP);
      this.setState({datP})
      var vigencia = [];

      if (res.data.validity) {
        vigencia.push({
          label: "Vigencia",
          value: "Vigente"
        })
        vigencia.push({
          label: "Fecha Último Pap",
          value: res.data.lastPapDate
        })
        vigencia.push({
          label: "Fecha de Validez",
          value: res.data.validityDate
        })

      }
      else {
        vigencia.push({
          label: "Vigencia",
          value: "No Vigente"
        })
        vigencia.push({
          label: "Fecha Último Pap",
          value: res.data.lastPapDate
        })
        vigencia.push({
          label: "Fecha de Validez",
          value: res.data.validityDate
        })
        vigencia.push({
          label: "Tiempo de Atraso",
          value: res.data.diffDays + " dias " + res.data.diffMonths + " meses " + res.data.diffYears + " años"
        })
      }

      this.setState({vigencia})
      console.log(vigencia);




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
  GetSectionListItem = item => {
    //Function for click on an item
    Alert.alert(item);
  };
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  render(){
    var A = [
      { id: '1', value: 'Afghanistan' },
      { id: '2', value: 'Afghanistan' },
      { id: '3', value: 'Afghanistan' },
    ];
    var B = [
      { id: '4', value: 'Benin' },
      { id: '5', value: 'Bhutan' },
      { id: '6', value: 'Bosnia' },
      { id: '7', value: 'Botswana' },
      { id: '8', value: 'Brazil' },
      { id: '9', value: 'Brunei' },
      { id: '10', value: 'Bulgaria' },
    ];
    var C = [
      { id: '11', value: 'Cambodia' },
      { id: '12', value: 'Cameroon' },
      { id: '13', value: 'Canada' },
      { id: '14', value: 'Cabo' },
    ];
    return(
      <View>
        {/*this.mostrarDatos()*/}
        <SectionList
          ItemSeparatorComponent={this.FlatListItemSeparator}
          sections={[
            { title: 'Datos Personales', data: this.state.datP },
            { title: 'Vigencia', data: this.state.vigencia },
            { title: 'Información', data: C },
          ]}
          renderSectionHeader={({ section }) => (
            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
          )}
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <Text
              style={styles.SectionListItemStyle}
              //Item Separator View
              onPress={this.GetSectionListItem.bind(
                "holaaaa",
                'Id: ' + item.label + ' Name: ' + item.value
              )}>
              {item.label} : {item.value}
            </Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  SectionHeaderStyle: {
    backgroundColor: '#CDDC89',
    fontSize: 20,
    padding: 5,
    color: '#fff',
  },

  SectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
});

const mapStateToProps = state => {
    return {
        paciente: state.paciente
    }
}

export default connect(mapStateToProps)(ConsultaScreen);
