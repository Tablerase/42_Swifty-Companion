import { AUTH_CONFIG, two_hours_in_ms } from "@/constants/authConfig";
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

      let tokenData: StoredTokenData | null = JSON.parse(tokenString);
      // TODO: handle expiration with refresh token
      if (tokenData && Date.now() >= tokenData.expires_at) {
        // if (tokenData && Date.now() <= tokenData.expires_at) {
        console.log("Token has expired, attempting to refresh...");
        const refreshedToken = await this.refreshToken(tokenData);
        if (refreshedToken) {
          console.log("Token refreshed successfully.");
          return refreshedToken;
        } else {
          console.log("Failed to refresh token. Clearing stored token.");
          await this.clearToken();
          return null;
        }
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
      // Maybe User if stored
    } catch (error) {
      console.error("Failed to clear token:", error);
    }
  }

  static async refreshToken(
    token: StoredTokenData
  ): Promise<StoredTokenData | null> {
    console.log("Refreshing token");
    try {
      // ! Only for educationnal purpose (should be handle in a secure backend)
      const clientId = process.env.EXPO_PUBLIC_42API_CLIENT_ID;
      const clientSecret = process.env.EXPO_PUBLIC_42API_CLIENT_SECRET;
      if (!clientId || !clientSecret) {
        console.error("42 API env is not configured");
        throw new Error("42 API env is not configured");
      }
      const tokenApiURL = "https://api.intra.42.fr/oauth/token";
      const tokenParams = new FormData();
      tokenParams.append("grant_type", "refresh_token");
      tokenParams.append("refresh_token", token.refresh_token);
      tokenParams.append("client_id", clientId);
      tokenParams.append("client_secret", clientSecret);

      const controller = new AbortController();
      setTimeout(() => controller.abort(), 5000); // 5s timeout

      const tokenResponse = await fetch(tokenApiURL, {
        method: "POST",
        body: tokenParams,
        signal: controller.signal,
      });

      if (!tokenResponse.ok) {
        throw new Error(
          `Resfresh Token exchange failed: ${tokenResponse.status}`
        );
      }

      const tokenData = await tokenResponse.json();
      console.log("Refreshed Token data:", tokenData);
      await AuthService.storeToken(tokenData);
      return tokenData;
    } catch (error: any) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  }

  static async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null;
  }
}
