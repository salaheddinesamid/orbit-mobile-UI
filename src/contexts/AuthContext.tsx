
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from 'react';

import { AuthenticationAPI } from '../apis/AuthenticationAPI';
import { authStorage } from '../services/AuthStorageService';

import { User, LoginResponse } from '../models/login-response.model';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (username: string, password: string) => {

        const response = await AuthenticationAPI.post<LoginResponse>(
            '',
            { username, password }
        );
        console.log(response?.data);
        const data = response.data;

        await authStorage.saveTokens(
            data.accessToken,
            ""
        );

        setUser(data.user);
    };

    const logout = async () => {

        try {
            await AuthenticationAPI.post('/logout');
        } finally {
            await authStorage.clearTokens();
            setUser(null);
        }
    };

    const loadSession = async () => {

        try {
            const token = await authStorage.getAccessToken();

            if (!token) {
                setUser(null);
                return;
            }

            const response = await AuthenticationAPI.get<User>('/customers/me');

            setUser(response.data);

        } catch (error) {
            await authStorage.clearTokens();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                isLoading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};
