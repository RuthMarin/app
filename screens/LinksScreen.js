import React from "react";
import {  StyleSheet, FlatList, ScrollView, Image , View, Text} from "react-native";

import { Cell, Separator, TableView } from "react-native-tableview-simple";

const data = [
  { id: 1, title: "¿Qué es el papanicolau?" },
  { id: 2, title: "Es un examen en que se obtienen células descamadas o sueltas del cuello uterino y permite detectar alteraciones o lesiones, antes que se transformen en un cáncer al cuello uterino" },
  { id: 3, title: "¿Quiénes deben realizarse este examen?" },
  { id: 4, title: "Todas las mujeres entre 25 y 64 años, cada tres años, especialmente las mayores de 35 años y todas aquellas de otra edad con factores de riesgo" },
  { id: 5, title: "¿Dónde hacerse el examen?" },
  { id: 6, title: "En tu Centro de Salud más cercano. Recuerda que el PAP es parte del Examen de Medicina Preventiva" }
];

export default class Info extends React.Component {
  static navigationOptions = {
    title: 'Hazte el PAP',
  };


  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (

      <ScrollView >

      <Image
        source={require('../assets/images/slideInfo.jpeg')}
        style={styles.ImageStyle}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.title}
        renderItem={({ item, separators, index }) => {
          let style = [
           styles.SectionHeaderStyle,
           {'backgroundColor': index % 2 === 0 ? '#f95e97' : '#00afa4'}
          ];
          return(
            <Text style={style}>
            {item.title}
            </Text>
          )

        }}
        ItemSeparatorComponent={({ highlighted }) => (
          <Separator isHidden={highlighted} />
        )}

      />
      <Image
        source={require('../assets/images/down.jpeg')}
        style={styles.ImageStyle2}  />
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  SectionHeaderStyle: {
    flex: 1,
    backgroundColor: '#2cb28b',
    fontSize: 15,
    padding: 5,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  ImageStyle: {
    padding: 10,
    height: 400,
    width:360,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  ImageStyle2: {
    padding: 10,
    height: 90,
    width:360,
    resizeMode: 'stretch',
    alignItems: 'center',
  },


});
