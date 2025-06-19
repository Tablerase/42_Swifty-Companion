import { AUTH_CONFIG } from "@/constants/authConfig";
import { StoredTokenData, TokenData } from "@/types/auth";
import * as SecureStore from "expo-secure-store";

export class AuthService {
  static async storeToken(token: TokenData) {
    try {
      const storedData: StoredTokenData = {
        ...token,
        expires_at: Date.now() + token.expires_in * 1000,
      };

      await SecureStore.setItemAsync(
        AUTH_CONFIG.TOKEN_KEY,
        JSON.stringify(storedData)
      );
      console.log("Token Stored successfully");
    } catch (error) {
      console.error("Failed to store token:", error);
      throw error;
    }
  }

  static async getToken(): Promise<StoredTokenData | null> {
    try {
      const tokenString = await SecureStore.getItemAsync(AUTH_CONFIG.TOKEN_KEY);
      if (!tokenString) return null;

      const tokenData: StoredTokenData = JSON.parse(tokenString);
      if (Date.now() >= tokenData.expires_at) {
        await this.clearToken();
        return null;
      }

      return tokenData;
    } catch (error) {
      console.error("Failed to get token:", error);
      return null;
    }
  }

  static async clearToken() {
    try {
      await SecureStore.deleteItemAsync(AUTH_CONFIG.TOKEN_KEY);
      console.log("Token cleared from storage successfully");
      // ... User if stored
    } catch (error) {
      console.error("Failed to clear token:", error);
    }
  }

  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null;
  }
}
