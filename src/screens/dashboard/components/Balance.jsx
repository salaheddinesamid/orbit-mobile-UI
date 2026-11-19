import { Text, View } from "react-native"
import { colors } from "../../../themes/colors"


export const Balance = ({ accountDetails }) =>{

    return (
        <View style={styles.container}>
            <View style = {styles.accountNumberContainer}>
                <Text style={{fontSize : 20, fontWeight : "bold" , marginBottom : 10}}>Current Account</Text>
                <Text style={{fontSize : 15, fontWeight : "bold"}}>Account Number</Text>
                <Text style={{fontSize : 10}}>XXXXXXXXXXX</Text>
            </View>
            <View style = {styles.balanceContainer}>
                <Text style={{fontSize : 15, fontWeight : "bold"}}>12,000.00 DH</Text>
            </View>
        </View>
    )
}

const styles = {
    container : {
        borderRadius : 10
    },
    accountNumberContainer : {
        backgroundColor : colors.mint,
        marginBottom : 0,
        padding : 10,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10
    },
    balanceContainer : {
        backgroundColor : colors.white,
        justifyContent : "flex-end",
        alignItems : "flex-end",
        padding : 10,
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10
    }
}