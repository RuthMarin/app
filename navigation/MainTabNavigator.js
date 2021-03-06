import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ConsultaScreen from '../screens/consultaScreen';
import MapScreen from '../screens/MapScreen';
import Info2 from '../screens/info';

const HomeStack = createStackNavigator({
  Consulta: ConsultaScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Vigencia PAP',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-eye`
          : 'md-eye'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Papanicolau',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-woman' : 'md-woman'}
    />
  ),
};

const MapStack = createStackNavigator({
  Links: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'CESFAM',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Cáncer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-disc' : 'md-disc'}
    />
  ),
};

const Info2Stack = createStackNavigator({
  Prevención: Info2,
});
Info2Stack.navigationOptions = {
  tabBarLabel: 'Prevención',
};


const TopNavigator = createMaterialTopTabNavigator({
  Link: {
    screen: LinksStack,
    navigationOptions: {
            tabBarVisible: true,
            header: null
        },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
            tabBarVisible: true,
             topBar: { visible: false, height: 0, }
        },
  },
  Info2:{
    tabBarLabel: 'Prevención',
    screen: Info2Stack
  }
})

const TopN = createStackNavigator({
  TopN: TopNavigator
})
TopN.navigationOptions = {
  tabBarLabel: 'Informaciones',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'}
    />
  ),
};


const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
            tabBarVisible: true,
        },
  },
  Maps: {
    screen: MapStack,
    navigationOptions: {
            tabBarVisible: true,
        },
  },
  Navegador: {
    screen: TopN
  }

});

TabNavigator.navigationOptions = {
  header: null,
}
/*
const MainNavigator = createStackNavigator({
  Tabs: TabNavigator,
  Consulta: ConsultaScreen,
});
*/
export default TabNavigator;
