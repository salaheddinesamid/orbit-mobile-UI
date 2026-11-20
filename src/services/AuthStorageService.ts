
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN = 'orbit_access_token';
const REFRESH_TOKEN = 'orbit_refresh_token';

export const authStorage = {

  async saveTokens(accessToken: string, refreshToken: string) {
    await SecureStore.setItemAsync(ACCESS_TOKEN, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN, refreshToken);
  },

  async getAccessToken() {
    return SecureStore.getItemAsync(ACCESS_TOKEN);
  },

  async getRefreshToken() {
    return SecureStore.getItemAsync(REFRESH_TOKEN);
  },

  async clearTokens() {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN);
  }
};
