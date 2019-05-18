import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StyleSheet, View, Platform, SectionList, Image, Text, Alert, ScrollView } from 'react-native';
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
      { id: '11', value: 'CEFAN MAIPÚ Av. Los Pajaritos 2470, Maipú' },
    ];
    return(
      <ScrollView>
        {<Image
            source={require('../assets/images/slide.png')}
            style={styles.ImageStyle}
          />}
        <SectionList
          ItemSeparatorComponent={this.FlatListItemSeparator}
          sections={[
            { title: 'Datos Personales', data: this.state.datP },
            { title: 'Estado PAP', data: this.state.vigencia },
            { title: 'Lugar Exámen', data: C },
          ]}
          renderSectionHeader={({ section }) => (
            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
          )}
          renderItem={({ item }) => {
            // Single Comes here which will be repeatative for the FlatListItems
            if(item.label == "Vigencia"){
              if(item.value == "Vigente"){
                return(
                  <View><Text
                  style={styles.SectionListItemStyle2}
                  //Item Separator View
                  onPress={this.GetSectionListItem.bind(
                    "holaaaa",
                    'Información: \n' + 'Información: \n' +'Información: \n' 
                  )}>
                 {item.value} <Image
            source={require('../assets/images/correcto.png')}
            style={styles.ImageStyle4}
          />
                </Text>
                
                </View>

                )
              }
              else{
               return(
                  <View><Text
                  style={styles.SectionListItemStyle8}
                  //Item Separator View
                  onPress={this.GetSectionListItem.bind(
                    "holaaaa",
                    'Información: \n' + 'Información: \n' +'Información: \n' 
                  )}>
                 {item.value} <Image
            source={require('../assets/images/incorrecto.png')}
            style={styles.ImageStyle4}
          />
                </Text>
                
                </View>

                )
              }
              
            }
            return(<Text
                  style={styles.SectionListItemStyle}
                  //Item Separator View
                  onPress={this.GetSectionListItem.bind(
                    "holaaaa",
                    'Información: \n' + 'Información: \n' +'Información: \n' 
                  )}>
                  {item.label} : {item.value} 
                </Text>)
          }}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  SectionHeaderStyle: {
    flex: 1,
    backgroundColor: '#0089B1',
    fontSize: 20,
    padding: 5,
    color: '#fff',
  },
  ImageStyle: {
    padding: 10,
    height: 110,
    width:360,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  SectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
  SectionListItemStyle2: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#7bf086',
  },
  ImageStyle4: {
    height: 25,
    width: 25,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
 SectionListItemStyle8: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#e86868',
  },
});

const mapStateToProps = state => {
    return {
        paciente: state.paciente
    }
}

export default connect(mapStateToProps)(ConsultaScreen);
