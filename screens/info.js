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
        <Text style={styles.textStyle}>   </Text><TouchableOpacity style={styles.touchable} onPress={ ()=>{ Linking.openURL('https://www.minsal.cl/wp-content/uploads/2017/11/ENS-2016-17_PRIMEROS-RESULTADOS.pdf')}}>
       <View style={styles.view}>
         <Text style={styles.text}>{this.props.title}</Text>
       </View>
       <Image
         source={require('../assets/images/1.png')}
         style={styles.ImageStyle} />
       </TouchableOpacity>
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
      source={require('../assets/images/2.png')}
      style={styles.ImageStyle} />
    </TouchableOpacity>
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
  height: 150,
  width:160,
  resizeMode: 'stretch',
  alignItems: 'center',
},
touchable: {
  alignItems: 'center',
  justifyContent: 'center'
},
text: {
  fontSize: 18,
  textAlign: 'center'
},
container: { backgroundColor:'#4286f4'},
  viewStyleOne: {
    width:40,
    height:40,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#b642f4'
  },
  textStyle:{
    textAlign:'center'
  },
  ImageStyle2: {
    padding: 10,
    height: 90,
    width:360,
    resizeMode: 'stretch',
    alignItems: 'center',
  }
})
