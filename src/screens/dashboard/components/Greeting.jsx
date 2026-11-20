import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";


export const Greeting = ({ name }) => {

    const { user } = useAuth();
    
    useEffect(()=>{
        console.log(user);
    }, [])
    return (
        <View>
            <Text style={styles.greetingText}>Welcome, {user?.username}!</Text>
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