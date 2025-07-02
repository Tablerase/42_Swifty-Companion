import { ThemedButtonIcon } from "@/components/ui/ThemedButtonIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { ActivityIndicator, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { getRandomBytes } from "expo-crypto";
import { AuthService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { ThemedImageBackground } from "@/components/ui/ThemedImageBackground";

/**
 * 42 API
 * app: https://profile.intra.42.fr/oauth/applications/
 * web auth flow: https://api.intra.42.fr/apidoc/guides/web_application_flow
 * expo auth session: https://docs.expo.dev/versions/latest/sdk/auth-session/
 */

// Handle web popup
WebBrowser.maybeCompleteAuthSession();

// Endpoints
const authorizeApiURL = "https://api.intra.42.fr/oauth/authorize";
const tokenApiURL = "https://api.intra.42.fr/oauth/token";
const redirectUri = "companion42://login";

// Generate cryptographically secure random string
export const generateSecureState = () => {
  const bytes = getRandomBytes(32);
  return bytes.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, "0"),
    ""
  );
};

export default function Login() {
  const textColor = theme.colors.text.secondary;
  const tintColor = useThemeColor({}, "tint");
  const { checkAuth, isLoading, setIsLoading } = useAuth();

  const handle42Login = async () => {
    const uid = generateSecureState();

    console.log("Login with 42 Pressed");

    // ! Only for educationnal purpose (should be handle in a secure backend)
    const clientId = process.env.EXPO_PUBLIC_42API_CLIENT_ID;
    const clientSecret = process.env.EXPO_PUBLIC_42API_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      console.error("42 API env is not configured");
      return;
    }
    const params = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "public",
      state: uid,
    };

    try {
      setIsLoading(true);
      // Exchange code
      const queryString = new URLSearchParams(params).toString();
      const authUrl = `${authorizeApiURL}?${queryString}`;

      console.log("Opening auth URL:", authUrl);
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );
      console.log("WebBrowser result:", result);

      // Access token
      if (result.type === "success" && result.url) {
        const url = new URL(result.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        // Check for CSRF
        if (state !== uid) {
          throw new Error("State mismatch - possible CSRF attack");
        }
        if (code) {
          const tokenParams = new FormData();
          tokenParams.append("grant_type", "authorization_code");
          tokenParams.append("client_id", clientId);
          tokenParams.append("client_secret", clientSecret);
          tokenParams.append("code", code);
          tokenParams.append("state", uid);
          tokenParams.append("redirect_uri", redirectUri);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

          try {
            const tokenResponse = await fetch(tokenApiURL, {
              method: "POST",
              body: tokenParams,
              signal: controller.signal,
            });

            if (!tokenResponse.ok) {
              throw new Error(`Token exchange failed: ${tokenResponse.status}`);
            }

            const tokenData = await tokenResponse.json();
            console.log("Token data:", tokenData);
            await AuthService.storeToken(tokenData);
            await checkAuth();
          } finally {
            clearTimeout(timeoutId);
          }
        } else {
          throw new Error("No authorization code received");
        }
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Authorization failed: Request timed out.", error);
        setIsLoading(false);
        router.push("/networkError");
      } else {
        console.log("Authorization cancelled or failed", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator color={tintColor} />;
  }

  return (
    <ThemedImageBackground
      source={require("@/assets/images/School42Themed.png")}
      placeholder={"CZOyPJD,t%xa?]t5oyoz"}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText
          type="title"
          style={{ paddingBottom: 100 }}
          lightColor={theme.colors.ternary.main}
        >
          Login Page
        </ThemedText>
        <ThemedText
          style={{ textAlign: "center", padding: theme.spacing.large }}
          lightColor={textColor}
        >
          To access 42 API data, you need to be logged with your 42 account :
        </ThemedText>
        <ThemedButtonIcon
          // disabled={!request}
          title="Login with "
          icon={
            <Image
              source={require("@/assets/images/42_Logo.svg")}
              style={{ width: 24, height: 24, tintColor: textColor }}
              contentFit="contain"
            />
          }
          iconPosition="right"
          onPress={handle42Login}
        />
      </View>
    </ThemedImageBackground>
  );
}
