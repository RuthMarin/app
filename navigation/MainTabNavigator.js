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
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
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
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Recordatorio PAP',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
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
