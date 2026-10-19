import { StyleSheet, TextInput } from 'react-native'

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 10
    }
})

export const InputField = ({ placeholder, value, onChangeText, secureTextEntry }) => {
    return (
        <TextInput
        style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}