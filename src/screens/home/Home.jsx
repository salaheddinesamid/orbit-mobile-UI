import { View } from "react-native"
import { Greeting } from "../dashboard/components/Greeting"
import { Balance } from "../dashboard/components/Balance"
import { TransactionsOverview } from "../dashboard/components/TransactionsOverview"


export const Home = () => {

    const fetchAccountDetails = async () => {}
    return (
        <View style={styles.container}>
            <View style={styles.greetingContainer}>
                <Greeting name="Salah Eddine" />
            </View>
            <View style={styles.balanceContainer}>
                <Balance/>
            </View>
            <View style={styles.transactionContainer}>
                <TransactionsOverview/>
            </View>
        </View>
    )
}

const styles = {
    container : {
        flex : 1,
        padding : 10,
        marginTop : 50
    },
    greetingContainer : {
        margin : 10
    },
    balanceContainer : {
        margin : 10
    },
    transactionContainer : {
        margin : 10
    }
}