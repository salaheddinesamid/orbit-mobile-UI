import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from './login/LoginScreen';
import { RegistrationScreen } from './registration/Registration';

const RootStack = createNativeStackNavigator({
  screens: {
    Login : {
        screen : LoginScreen,
        options : {title : "Log in"}
    },
    Registration : {
      screen : RegistrationScreen,
      options : { title : "Become a customer" }
    },
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome'},
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);