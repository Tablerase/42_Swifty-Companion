import { ThemedView } from "@/components/ui/ThemedView";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/hooks/useUser";
import { theme } from "@/constants/theme";
import { ThemedLoader } from "@/components/ui/ThemedLoader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedImageBackground } from "@/components/ui/ThemedImageBackground";
import { apiService } from "@/services/apiService";
import { User42Details } from "@/types/user";
import { UserInfos } from "@/components/UserInfos";
import { SearchBar } from "@/components/SearchBar";
import { LoginNotFound } from "@/components/LoginNotFound";

export default function Profile() {
  const {
    loginToSearch,
    setLoginToSearch,
    setUser,
    setIsUserLoading,
    userNotFound,
    setUserNotFound,
  } = useUser();

  useEffect(() => {
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
          displayname: result.displayname,
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
        setUserNotFound(false);
        setUser(foundUser);
      } else {
        console.log("User not found", loginToSearch);
        setUserNotFound(true);
        setUser(null);
      }
    };

    const handleFetch = async () => {
      const trimLogin = loginToSearch ? loginToSearch.trim() : "";
      if (trimLogin.length > 0) {
        console.log("Fetch in progress...");
        setIsUserLoading(true);
        try {
          await fetchUser();
        } catch (error) {
          console.log("User fetch error:", error);
        } finally {
          console.log("Fetch ended");
          setIsUserLoading(false);
        }
      }
    };

    handleFetch();
  }, [loginToSearch, setUser, setIsUserLoading]);

  // User info at launch
  useEffect(() => {
    const fetchMe = async () => {
      return await apiService.apiClient.get("/me");
    };

    const handleFetchMe = async () => {
      const me: any = await fetchMe();
      if (me && me.login) {
        setLoginToSearch(me.login);
      }
    };

    handleFetchMe();
  }, []);

  return (
    <ThemedImageBackground
      placeholder={"CDMEp-0X01Sw0GNy~Knj"}
      source={require("@/assets/images/LibraryServerThemed.png")}
    >
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <SearchBar />
        {userNotFound && (
          <LoginNotFound onHide={() => setUserNotFound(false)} />
        )}
        <UserInfos />
      </SafeAreaView>
    </ThemedImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfosContainer: {
    flex: 15,
  },
});
