import { Button, Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../themes/colors';

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor : colors.ink,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: 45,
    }
})

export const LoginButton = ({ title, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.loginButton}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
        </TouchableOpacity>
    )
}