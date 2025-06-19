import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { SplashScreen, Stack } from "expo-router";

// Prevent splash screen auto hide
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
    </AuthProvider>
  );
}

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="(protected)"
          options={{ animation: "simple_push" }}
        />
      </Stack.Protected>
    </Stack>
  );
};

const SplashScreenController = () => {
  const { isLoading } = useAuth();

  if (!isLoading) {
    // Hide splash screen when loading done
    SplashScreen.hideAsync();
  }

  return null;
};
