import { AuthenticationAPI } from '../apis/AuthenticationAPI';

export const authenticate = (loginData: { email: string; password: string }): Promise<void> => {
    return AuthenticationAPI.post("", loginData)
}