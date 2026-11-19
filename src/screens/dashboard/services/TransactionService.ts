import { TransactionsAPI } from "../../../apis/TransactionsAPI";


export const getAllTransactions = (nationalId : String) => {
    return TransactionsAPI.get('', { params: { nationalId } });
}