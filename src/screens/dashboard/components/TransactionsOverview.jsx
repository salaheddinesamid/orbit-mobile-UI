import { useEffect, useState } from 'react';
import { getAllTransactions }  from '../services/TransactionService';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../themes/colors'

export const TransactionsOverview = () => {


    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTransactions = async () => {
        try {
            const response = await getAllTransactions("BK654321");
            console.log('Transactions fetched successfully:', response.data);
            setTransaction(response.data.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    if (loading) {
        return <Text>Loading transactions...</Text>;
    }

    if (error) {
        return <Text>Error fetching transactions: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Transactions</Text>
            <View style = {styles.transactionList}>
                {transaction.map((txn) => (
                <View key={txn.transactionId} style={{flexDirection : "row", justifyContent : "space-between", paddingVertical : 10, borderBottomWidth : 0.3, borderBottomColor : colors.lightGray}}>
                    <Text>{`${txn.reference}`}</Text>
                    <Text style={{fontWeight : "bold"}}>{`${txn.amount} DH`}</Text>
                </View>
            ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : "white",
        borderRadius : 10,
        padding : 20,
    },
    title : {
        fontSize : 18,
        fontWeight : "bold",
        marginBottom : 10
    },
    transactionList : {
    }
})