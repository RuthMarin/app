import React from "react";
import {  StyleSheet, FlatList, ScrollView, Image , View, Text} from "react-native";

import { Cell, Separator, TableView } from "react-native-tableview-simple";

const data = [
  { id: 1, title: "El cáncer cervicouterino es una alteración celular que se manifiesta inicialmente a través de lesiones de lento desarrollo. Es provocado por el Virus Papiloma Humano (VPH), el cual se transmite por contacto durante las relaciones sexuales" },

];

export default class Info extends React.Component {
  static navigationOptions = {
    title: 'Cancer Cervico Uterino',
  };


  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (

      <ScrollView >
      <Image
        source={require('../assets/images/cancer.jpg')}
        style={styles.ImageStyle2}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, separators }) => (

          <Text style={styles.SectionHeaderStyle}>
          {item.title}
          </Text>

        )}
        ItemSeparatorComponent={({ highlighted }) => (
          <Separator isHidden={highlighted} />
        )}

      />
      <Image
        source={require('../assets/images/choose.jpg')}
        style={styles.ImageStyle}
      />

       </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  SectionHeaderStyle: {
    flex: 1,
    backgroundColor: '#b18be5',
    fontSize: 15,
    padding: 5,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  ImageStyle: {
    padding: 10,
    height: 220,
    width:360,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  ImageStyle2: {
    padding: 10,
    height: 300,
    width:360,
    resizeMode: 'stretch',
    alignItems: 'center',
  },


});
