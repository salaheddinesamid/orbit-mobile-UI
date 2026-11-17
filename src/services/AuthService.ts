import { AuthenticationAPI } from '../apis/AuthenticationAPI';

export const authenticate = (loginData: { username: string; password: string }): Promise<void> => {
    return AuthenticationAPI.post("", loginData)
}