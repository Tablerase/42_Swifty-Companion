import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchBar = () => {
  return (
    <>
      <ThemedView style={styles.searchBarContainer}>
        <MaterialCommunityIcons name="account-search" size={24} color="black" />
        <TextInput
          placeholder="Login to search"
          style={{ paddingHorizontal: 10 }}
        />
      </ThemedView>
    </>
  );
};

const UserInfos = () => {
  return (
    <>
      <ScrollView style={styles.userInfosContainer}>
        <ThemedText>Users infos</ThemedText>
      </ScrollView>
    </>
  );
};

export default function Profile() {
  const [login, setLogin] = useState<string>("");

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <SearchBar />
      <UserInfos />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "pink",
  },
  userInfosContainer: {
    flex: 15,
    minHeight: 500,
    backgroundColor: "cyan",
  },
});
