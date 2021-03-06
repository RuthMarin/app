import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StyleSheet, View, Platform, SectionList, Image, Text, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import { Button } from 'react-native'
import * as actions from '../redux/actions';
import { Permissions, Notifications } from 'expo';

async function registerForPushNotificationsAsync(idPatient) {
  const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    console.log( await Permissions.getAsync(Permissions.NOTIFICATIONS))
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Expo.Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;

    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device

    let token = await Notifications.getExpoPushTokenAsync();
    const tokenP = {
      idPatient: idPatient,
      accessToken: token
    }
    var link = 'http://scanpapp.herokuapp.com/app/access_token';
    axios.put(link, tokenP)
    .then(res=>{
      console.log(res.data);
    })
    .catch((error)=>{

    })

}


class ConsultaScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      texto: '',
      resultado: false,
      encontrada: true,
      datP: {},
      vigencia: {},
      info: {},
      visible: [false, 1],
      dir: {}

    }
    this.cambiarVisible = this.cambiarVisible.bind(this)
    this.cambiarVisible2 = this.cambiarVisible2.bind(this)
    this.ocultar = this.ocultar.bind(this)
    this.textoPopup = this.textoPopup.bind(this)
    this.desloguear = this.desloguear.bind(this)
    this.handleNotification = this.handleNotification.bind(this)
  }

  componentDidMount(){
    this.setToken(this.props.paciente.idPatient)
    console.log("asdadsdsad");
    console.log(this.props);
    var link = "http://scanpapp.herokuapp.com/app/consultation?run=" + this.props.paciente.paciente;

    var datP = [];
    datP.push({
      label: "Nombre",
      value: this.props.paciente.name
    })
    datP.push({
      label: "Edad",
      value: this.props.paciente.age
    })
    datP.push({
      label: "Fecha de Nacimiento",
      value: this.props.paciente.birthDate
    })
    console.log(datP);
    this.setState({datP})
    var vigencia = [];

    if (this.props.paciente.validity) {
      const nuevo = this.state.visible.slice()
      nuevo[1] = 1;
      this.setState({visible: nuevo})
      vigencia.push({
        label: "Vigencia",
        value: "Vigente"
      })
      vigencia.push({
        label: "Fecha Último Pap",
        value: this.props.paciente.lastPapDate
      })
      vigencia.push({
        label: "Fecha de Validez",
        value: this.props.paciente.validityDate
      })

    }
    else {
      const nuevo = this.state.visible.slice()
      nuevo[1] = 2;
      nuevo[0] = true;
      this.setState({visible: nuevo})
      vigencia.push({
        label: "Vigencia",
        value: "No Vigente"
      })
      vigencia.push({
        label: "Fecha Último Pap",
        value: this.props.paciente.lastPapDate
      })
      vigencia.push({
        label: "Fecha de Validez",
        value: this.props.paciente.validityDate
      })
      vigencia.push({
        label: "Tiempo de Atraso",
        value: this.props.paciente.diffDays + " dias " + this.props.paciente.diffMonths + " meses " + this.props.paciente.diffYears + " años"
      })
    }
    this.setState({vigencia})

    var dir = []
    dir.push({
      label: "Nombre CESFAM",
      value: this.props.paciente.nameCenter
    })
    dir.push({
      label: "Dirección CESFAM",
      value: this.props.paciente.addressCenter
    })
    this.setState({dir})

  }

  setToken(idPatient) {
    registerForPushNotificationsAsync(idPatient);

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this.handleNotification);
    console.log(this._notificationSubscription);
    console.log("bai");
  }

  handleNotification = (notification) => {
    this.props.setNotification(notification)
    this.props.navigation.navigate('Consulta')
  };

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

  cambiarVisible(){
    const nuevo = this.state.visible.slice()
    nuevo[0] = true;
    nuevo[1] = 3;
    this.setState({visible: nuevo})
  }

  cambiarVisible2(){
    const nuevo = this.state.visible.slice()
    nuevo[0] = true;
    nuevo[1] = 4;
    this.setState({visible: nuevo})
  }

  ocultar(){
    const nuevo = this.state.visible.slice()
    nuevo[0] = false
    this.setState({visible: nuevo})
  }

  textoPopup(){
    if(this.state.visible[1] == 2){
      return(
        <Text>
          Tu PAP está atrasado, por tu bien y el de tu familia, realízate el examen cuanto antes.
        </Text>
      )
    }
    else if (this.state.visible[1] == 3) {
      return(
        <Text>
          Tu PAP está vigente por 3 años desde la fecha que te lo realizaste.
        </Text>
      )
    }
    else if(this.state.visible[1] == 4){
      return(
        <Text>
          Tu PAP superó el período de 3 años.
        </Text>
      )
    }
  }

  tituloDialogo(){
    if(this.state.visible[1] == 2){
      return(
        <DialogTitle title="ALERTA" />
      )
    }
    else if (this.state.visible[1] == 3) {
      return(
        <DialogTitle title="Estado del PAP" />
      )
    }
    else{
      return(
        <DialogTitle title="Estado del PAP" />
      )
    }
  }

  desloguear(){
    this.props.logOut()
    this.props.navigation.navigate('Login')
  }


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
    console.log(this.state.datP);
    return(
      <ScrollView>
        <Image
            source={require('../assets/images/slide.png')}
            style={styles.ImageStyle}
          />
          <Dialog
            visible={this.state.visible[0]}
            onTouchOutside={this.ocultar}
            dialogTitle={this.tituloDialogo()}
          >

            <DialogContent>
                {this.textoPopup()}
            </DialogContent>
          </Dialog>
        <SectionList
          ItemSeparatorComponent={this.FlatListItemSeparator}
          sections={[
            { title: 'Datos Personales', data: this.state.datP },
            { title: 'Estado PAP', data: this.state.vigencia },
            { title: 'Lugar Exámen', data: this.state.dir },
          ]}
          renderSectionHeader={({ section }) => (
            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
          )}
          renderItem={({ item }) => {
            // Single Comes here which will be repeatative for the FlatListItems
            if(item.label == "Vigencia"){
              if(item.value == "Vigente"){
                return(
                  <View style={styles.SectionListItemStyle2}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{width: 300, fontSize: 15}}>
                        <Text>
                          {item.value}
                          <Image
                           source={require('../assets/images/correcto.png')}
                           style={styles.ImageStyle4}
                           />
                        </Text>
                      </View>
                      <View style={{width: 50}}>
                        <Text onPress={this.cambiarVisible} style={{height: 25}} >
                         <Image
                            source={require('../assets/images/preguntaIcon.png')}
                            style={styles.ImageStyle5}
                          />
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              }
              else{
               return(
                 <View style={styles.SectionListItemStyle8}>
                   <View style={{flex: 1, flexDirection: 'row'}}>
                     <View style={{width: 300, fontSize: 15}}>
                       <Text>
                         {item.value}
                         <Image
                          source={require('../assets/images/incorrecto.png')}
                          style={styles.ImageStyle4}
                          />
                       </Text>
                     </View>
                     <View style={{width: 50}}>
                       <Text onPress={this.cambiarVisible2} style={{height: 25}} >
                        <Image
                           source={require('../assets/images/preguntaIcon.png')}
                           style={styles.ImageStyle5}
                         />
                       </Text>
                     </View>
                   </View>
                 </View>
                )
              }

            }
            return(
              <Text
                style={styles.SectionListItemStyle}
                //Item Separator View
                >
                {item.label} : {item.value}
              </Text>
            )
          }}
          keyExtractor={(item, index) => index}
        />
        <Button
          onPress={this.desloguear}
          title="Salir"
          color="#841584"
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
    height: 20,
    width: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  ImageStyle5: {
    height: 20,
    width: 20,
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
        paciente: state.paciente,
        notification: state.notification
    }
}

export default connect(mapStateToProps, actions)(ConsultaScreen);
