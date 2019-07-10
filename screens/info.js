import React from "react";
import { TouchableOpacity, StyleSheet, FlatList, ScrollView, Image , View, Text, Linking, Button} from "react-native";


export default class Info2 extends React.Component {
  static navigationOptions={
    header: null
  }
  render() {
    return (
      <ScrollView style={styles.container}>
      <Image
        source={require('../assets/images/minsal.png')}
        style={styles.ImageStyle2}
      />
      <View style={styles.viewStyleThree}>
        <Text style={styles.textStyle}> Junto con su PAP recuerda realizarte exámenes
        preventivos, para más información revisa los siguientes documentos de factores de
         riesgo y enfermadades crónicas {"\n"}
      </Text>
      <TouchableOpacity style={styles.touchable} onPress={ ()=>{ Linking.openURL('https://www.minsal.cl/wp-content/uploads/2017/11/ENS-2016-17_PRIMEROS-RESULTADOS.pdf')}}>
       <View style={styles.view}>
         <Text style={styles.text}>{this.props.title}</Text>
       </View>
       <Image
         source={require('../assets/images/oke.png')}
         style={styles.ImageStyle} />
       </TouchableOpacity><Text style={styles.titulo}> ENCUESTA NACIONAL DE SALUD 2016-2017 Primeros resultados {"\n"}
     </Text>
      </View>
      <View style={styles.viewStyleThree}>
        <Text style={styles.textStyle}>   </Text>
      </View>
  <View style={styles.viewStyleTwo}>
     <TouchableOpacity style={styles.touchable} onPress={ ()=>{ Linking.openURL('https://www.minsal.cl/wp-content/uploads/2018/01/2-Resultados-ENS_MINSAL_31_01_2018.pdf')}}>
    <View style={styles.view}>
      <Text style={styles.text}>{this.props.title}</Text>
    </View>
    <Image
      source={require('../assets/images/xlx.png')}
      style={styles.ImageStyle} />
    </TouchableOpacity><Text style={styles.titulo}> ENCUESTA NACIONAL DE SALUD 2016-2017 Segunda entrega de resultados{"\n"}
  </Text>
  </View>
  <View style={styles.viewStyleThree}>
    <Text style={styles.textStyle}>   </Text>
  </View>



</ScrollView>

  );

}
}


const styles = StyleSheet.create({
view: {
  position: 'absolute',
  backgroundColor: 'transparent'
},

ImageStyle: {
  padding: 10,
  height: 200,
  width:260,
  resizeMode: 'stretch',
  alignItems: 'center',
},
touchable: {
  alignItems: 'center',
  justifyContent: 'center'
},
text: {
  fontSize: 21,
  textAlign: 'center',
  color: '#fff',

},
container: {   backgroundColor: '#b18be5'},
  viewStyleOne: {
    width:50,
    height:40,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#b18be5'
  },
  textStyle:{
    textAlign:'center',
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'

  },
  titulo:{
    textAlign:'center',
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },
  ImageStyle2: {
    padding: 10,
    height: 90,
    width:360,
    resizeMode: 'stretch',
    alignItems: 'center',
  }
})
