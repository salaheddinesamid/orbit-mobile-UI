import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {colors} from "../themes/colors";
import { InputField } from '../components/InputField';
import { LoginButton } from '../components/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { authenticate } from '../services/AuthService';


export const LoginScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleLogin = async() => {
        try{
            const response = await authenticate({ email: username, password: password });
        }catch(error){
            setError(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image source={require('/Users/salaheddine/Desktop/orbit-UI/assets/orbit_logo.png')} style={styles.logo} />
            </View>
            
            <View>
                <Text style={styles.greeting}>Welcome Back!</Text>
                <Text style={styles.subGreeting}>Sign in to manage your money.</Text>
            </View>

            {error && <ErrorMessage message={error} />}
            
            <View style={styles.loginForm}>
                <InputField
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View>
                <LoginButton title="Login" onPress={handleLogin} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
    color : colors.ink
  },
  logoBox : {
    padding : 30,
  },
  logo : {
    height : 100,
    width : 100
  },
  greeting : {
    fontSize: 30,
    fontWeight: 'bold',
    color : colors.ink
  },
  subGreeting : {

  },
  loginForm : {
    marginTop : 20
  }
})