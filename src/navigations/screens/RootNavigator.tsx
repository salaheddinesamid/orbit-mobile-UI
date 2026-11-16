
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../../screens/login/LoginScreen';
import { RegistrationScreen } from '../../screens/registration/Registration';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{headerShown : false}}
      />
    </Stack.Navigator>
  );
}
