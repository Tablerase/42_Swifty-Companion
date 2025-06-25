import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/hooks/useUser";
import { theme } from "@/constants/theme";
import { ThemedLoader } from "@/components/ui/ThemedLoader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedImageBackground } from "@/components/ui/ThemedImageBackground";
import { apiService } from "@/services/apiService";
import { User42Details } from "@/types/user";

const SearchBarButton = ({ onPress }: { onPress: () => void }) => {
  const { isUserLoading } = useUser();
  const loadingColor = useThemeColor({}, "success");
  const accentColor = useThemeColor({}, "ternary");

  return isUserLoading ? (
    <TouchableOpacity
      disabled={true}
      style={[styles.searchBarSend, { backgroundColor: accentColor }]}
      onPress={onPress}
    >
      <ThemedLoader size={20} color={loadingColor} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.searchBarSend} onPress={onPress}>
      <MaterialCommunityIcons
        name="send"
        size={24}
        color={theme.colors.primary.main}
      />
    </TouchableOpacity>
  );
};

const SearchBar = () => {
  const [loginTextInput, setLoginTextInput] = useState<string>("");
  const { setLoginToSearch, isUserLoading } = useUser();
  const searchColor = theme.colors.secondary.light;

  return (
    <>
      <ThemedView style={styles.searchBarContainer}>
        <MaterialCommunityIcons
          name="account-search"
          size={24}
          color={searchColor}
        />
        <TextInput
          placeholder="Login to search"
          style={{
            paddingHorizontal: 10,
            flex: 1,
            fontFamily: "SpaceMono",
            color: theme.colors.text.secondary,
          }}
          onChangeText={(text) => setLoginTextInput(text)}
          value={loginTextInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <SearchBarButton
          onPress={() => {
            setLoginToSearch(loginTextInput);
          }}
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
  const { loginToSearch, setUser, setIsUserLoading } = useUser();

  useEffect(() => {
    const fetchMe = async () => {
      // TODO: Use me as User if User is empty
      // const me = await apiService.apiClient.get("/me");
      // console.log("Me: ", me);
    };

    const fetchUser = async () => {
      const params = new URLSearchParams({
        "filter[login]": loginToSearch || "",
      });
      const listOfUsers: any = await apiService.apiClient.get(
        `/users?${params}`
      );
      const result =
        listOfUsers && Object.keys(listOfUsers).length > 0
          ? listOfUsers[0]
          : null;
      // console.log("List of users:", listOfUsers);

      if (result) {
        const foundUser: User42Details = {
          id: result.id,
          login: result.login,
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
          kind: result.kind,
          image: result.image,
          correction_point: result.correction_point,
          wallet: result.wallet,
        };
        const detailsFoundUser: any = await apiService.apiClient.get(
          "/users/" + foundUser.id
        );
        // console.log("Details Found User:", detailsFoundUser);
        foundUser.projects_users = detailsFoundUser.projects_users;
        foundUser.cursus_users = detailsFoundUser.cursus_users;
        // console.log("Parsed user:", foundUser);

        // After parse
        setUser(foundUser);
      } else {
        // TODO: Handle no user found
        setUser(null);
      }
    };

    const trimLogin = loginToSearch ? loginToSearch.trim() : "";
    if (trimLogin.length > 0) {
      console.log("Fetch in progress...");
      setIsUserLoading(true);
      try {
        fetchUser();
      } catch (error) {
        console.log("User fetch error:", error);
      } finally {
        console.log("Fetch ended");
        setIsUserLoading(false);
      }
    }
  }, [loginToSearch]);

  return (
    <ThemedImageBackground
      placeholder={"CDMEp-0X01Sw0GNy~Knj"}
      source={require("@/assets/images/LibraryServerThemed.png")}
    >
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <SearchBar />
        <UserInfos />
      </SafeAreaView>
    </ThemedImageBackground>
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
    backgroundColor: theme.colors.primary.main,
  },
  searchBarSend: {
    backgroundColor: theme.colors.secondary.light,
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
  },
  userInfosContainer: {
    flex: 15,
  },
});
