import axios from "axios";
import { authStorage } from "../services/AuthStorageService";

export const BankingAPI = axios.create({
  baseURL: "http://localhost:8080/api/v1/banking/",
  timeout: 10000,
  withCredentials : true
});

BankingAPI.interceptors.request.use(
  async (config) => {
    const accessToken = await authStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

BankingAPI.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);