import React, { Component } from 'react';
import ReactNative from 'react-native';
import { StyleSheet, View, TextInput, Image,Alert, Text, ScrollView } from 'react-native';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import AnimateLoadingButton from 'react-native-animate-loading-button';
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


class HomeScreen extends Component <{}> {

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
    this.encontrada = this.encontrada.bind(this)
  }



  setToken(idPatient) {
    registerForPushNotificationsAsync(idPatient);

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this.props.setNotification);

    console.log("bai");
  }

  componentDidMount(){
    console.log(this.props.paciente);
  }

  buscar(){

    if(isNaN(this.state.texto))
    {
      // If the Given Value is Not Number Then It Will Return True and This Part Will Execute.
      Alert.alert("Ingrese solo números");
    }
    else
    {
        this.loadingButton.showLoading(true);
        // mock
        var x = this.loadingButton

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
        this.setToken(res.data.idPatient)
        this.props.setPaciente(res.data)
        this.setState({encontrada: true})
        this.props.navigation.navigate('Consulta')
      })
      .catch((error)=>{
        this.setState({encontrada: false})
          this.setState({resultado: false})
          this.loadingButton.showLoading(false)



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
            source={require('../assets/images/portada3.png')}
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
          <View style={{ marginTop:18,flex: 1, backgroundColor: 'rgb(255,255,255)', justifyContent: 'center' }}>
            <AnimateLoadingButton
              ref={c => (this.loadingButton = c)}
              containerStyle={{padding:10, overflow:'hidden', borderRadius:5, backgroundColor: '#80D2DA'}}
              title="Consultar"
              width={100}
              height={40}
              titleFontSize={17}
              style={{color: 'white'}}
              backgroundColor="rgb(128, 210, 218)"
              borderRadius={5}
              onPress={this.buscar}
            />
          </View>

        </ScrollView>

      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
    return {
        paciente: state.paciente,
        notification: state.notification
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
    height: 280,
    width: 360,
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
