import { createStackNavigator } from 'react-navigation'
import Login from '../screens/LoginScreen'

const AuthNavigator = createStackNavigator(
  {
    Login: { screen: Login },
  }
);
export default AuthNavigator;
