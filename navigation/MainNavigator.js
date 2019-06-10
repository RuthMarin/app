import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen';

const AuthNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
  }
);
export default AuthNavigator;
