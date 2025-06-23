import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useEffect, useState } from "react";
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
          onChangeText={(text) => console.log("Search text:", text)}
          autoCapitalize="none"
          autoCorrect={false}
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

  useEffect(() => {
    // Simulate fetching the login from a global state or context
    const fetchLogin = async () => {
      // Simulate an API call or context retrieval
      const fetchedLogin = "user123"; // Replace with actual logic to get the login
      setLogin(fetchedLogin);
    };
    fetchLogin();
  }, [login]);

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
    backgroundColor: "cyan",
  },
});
