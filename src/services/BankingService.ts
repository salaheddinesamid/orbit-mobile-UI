import { BankingAPI } from "../apis/BankingAPI";
import { BankAccount } from "../models/bank-account.model";

/**
 * 
 * @returns bank accounts details
 */
export const getAccountDetails = async (): Promise<BankAccount> => {
  return await BankingAPI.get("/accounts/me");
};