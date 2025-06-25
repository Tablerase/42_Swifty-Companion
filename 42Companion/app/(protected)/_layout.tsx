import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "@/hooks/useAuth";
import { UserProvider } from "@/contexts/UserContext";
import { ImageBackground } from "expo-image";
import { theme } from "@/constants/theme";

export default function RootNavigator() {
  return (
    <UserProvider>
      <ProtectedNavigator />
    </UserProvider>
  );
}

export function ProtectedNavigator() {
  const { logout } = useAuth();
  const tabActiveColor = useThemeColor({}, "tabIconSelected");
  const tabColor = useThemeColor({}, "tabIconDefault");
  const tabBackgroundColor = useThemeColor({}, "secondaryBackground");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontFamily: "SpaceMono" },
        tabBarActiveTintColor: tabActiveColor,
        tabBarInactiveTintColor: tabColor,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: { backgroundColor: tabBackgroundColor },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="card-account-details"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="logout-variant"
              size={24}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Run the logout function
            logout();
          },
        }}
      />
    </Tabs>
  );
}
