import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/screens/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext';


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
        </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
