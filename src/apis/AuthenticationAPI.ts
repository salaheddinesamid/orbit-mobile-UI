import axios from "axios"

export const AuthenticationAPI = axios.create({
    baseURL : "http://localhost:8080/api/auth",
    timeout : 10000,
})

AuthenticationAPI.interceptors.response.use(
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