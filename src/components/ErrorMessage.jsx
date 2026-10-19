import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../themes/colors'

const styles = StyleSheet.create({
    container : {
        backgroundColor : colors.coral,
        padding: 10,
        marginBottom: 0,
        marginTop: 15,
        borderRadius: 5,
    },
    text : {
        color : colors.white,
        fontSize : 14
    }
})
export const ErrorMessage = ({ message }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}