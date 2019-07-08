import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ConsultaScreen from '../screens/consultaScreen';
import MapScreen from '../screens/MapScreen';

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


const TopNavigator = createMaterialTopTabNavigator({
  Link: {
    screen: LinksStack,
    navigationOptions: {
            tabBarVisible: true,
        },
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
            tabBarVisible: true,
        },
  }
})

const TopN = createStackNavigator({
  TopN: TopNavigator
})
TopN.navigationOptions = {
  tabBarLabel: 'Informaciones',
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
