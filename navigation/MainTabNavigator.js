import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ConsultaScreen from '../screens/consultaScreen';

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
          ? `ios-eye${focused ? '' : '-outline'}`
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






const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
            tabBarVisible: true,
        },
  },
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
