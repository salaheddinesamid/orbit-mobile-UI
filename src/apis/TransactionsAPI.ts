import axios from 'axios';

export const TransactionsAPI = axios.create({
    baseURL : "http://localhost:8080/api/v1/banking/transactions",
    timeout : 10000,
})

TransactionsAPI.interceptors.response.use(
    (response)=> response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login page)
            console.error("Unauthorized access - redirecting to login.");
            // You can add your redirection logic here
        }
        return Promise.reject(error);
    }
)