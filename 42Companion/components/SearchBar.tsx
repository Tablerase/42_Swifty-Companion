import { ThemedView } from "@/components/ui/ThemedView";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useUser } from "@/hooks/useUser";
import { theme } from "@/constants/theme";
import { ThemedLoader } from "@/components/ui/ThemedLoader";
import { useThemeColor } from "@/hooks/useThemeColor";

const SearchBarButton = ({ onPress }: { onPress: () => void }) => {
  const { isUserLoading } = useUser();
  const loadingColor = useThemeColor({}, "primary");
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

export const SearchBar = () => {
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
          onChangeText={(text) => setLoginTextInput(text.trim())}
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

const styles = StyleSheet.create({
  searchBarContainer: {
    zIndex: 10,
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
});
