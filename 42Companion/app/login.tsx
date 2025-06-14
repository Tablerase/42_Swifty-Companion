import { ThemedButtonIcon } from "@/components/ui/ThemedButtonIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";

/**
 * 42 API
 * web auth flow: https://api.intra.42.fr/apidoc/guides/web_application_flow
 * expo auth session: https://docs.expo.dev/versions/latest/sdk/auth-session/
 * expo auth with oauth: https://docs.expo.dev/guides/authentication/
 */
// Handle web popup
WebBrowser.maybeCompleteAuthSession();

// Endpoints
const authorizeApiURL = "https://api.intra.42.fr/oauth/authorize";
const tokenApiURL = "https://api.intra.42.fr/oauth/token";
const discovery = {
  authorizationEndpoint: authorizeApiURL,
  tokenEndpoint: tokenApiURL,
};
// const redirectUri = "companion42://oauth";
const redirectUri = makeRedirectUri({
  scheme: "companion42",
  path: "login",
});

export default function Login() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_42API_CLIENT_ID,
      scopes: ["public"],
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log("Login success: ", code);
      const res = fetch("https://api.intra.42.fr/v2/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${code}`,
        },
      });
      console.log(res);
    }
  }, [response]);

  // const handle42Login = async () => {
  //   console.log("Login with 42 Pressed");

  //   const params = {
  //     client_id: process.env.EXPO_PUBLIC_42API_CLIENT_ID,
  //     redirect_uri: redirectUri,
  //     response_type: "code",
  //     scope: "public",
  //   };

  //   try {
  //     const queryString = new URLSearchParams(params).toString();
  //     console.log("Params", queryString);
  //     const res = await fetch(`${apiURL}?${queryString}`, {
  //       method: "GET",
  //     });
  //     console.log("42 API fetch for code:", res);
  //   } catch (error) {
  //     console.log("Error - 42 API fetch for code: ", error);
  //   }
  // };

  const textColor = useThemeColor({}, "background");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText type="title" style={{ paddingBottom: 100 }}>
        Login Page
      </ThemedText>
      <ThemedText
        style={{ textAlign: "center", padding: theme.spacing.medium }}
      >
        To access 42 API data, you need to be logged with your 42 account :
      </ThemedText>
      <ThemedButtonIcon
        disabled={!request}
        title="Login with "
        icon={
          <Image
            source={require("@/assets/images/42_Logo.svg")}
            style={{ width: 24, height: 24, tintColor: textColor }}
            contentFit="contain"
          />
        }
        iconPosition="right"
        // onPress={handle42Login}
        onPress={() => promptAsync()}
      />
    </View>
  );
}
