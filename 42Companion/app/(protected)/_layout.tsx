import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout() {
  const { logout } = useAuth();
  const tabActiveColor = useThemeColor({}, "tabIconSelected");
  const tabColor = useThemeColor({}, "tabIconDefault");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: tabActiveColor,
        tabBarInactiveTintColor: tabColor,
        tabBarLabelPosition: "beside-icon",
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
