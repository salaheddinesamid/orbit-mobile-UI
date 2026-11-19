import { StyleSheet, Text, View } from "react-native";


export const Greeting = ({ name }) => {
    return (
        <View>
            <Text style={styles.greetingText}>Welcome, {name}!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    greetingText : {
        fontSize : 20,
        fontWeight : "bold",
        marginBottom : 10
    }
})