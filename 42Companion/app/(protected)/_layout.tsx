import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import { Tabs } from "expo-router";

export default function RootLayout() {
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
            <Image source={require("@/assets/images/42_Logo.svg")} />
          ),
        }}
      />
    </Tabs>
  );
}
