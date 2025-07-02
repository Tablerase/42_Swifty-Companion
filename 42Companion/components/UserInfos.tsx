import { ScrollView, StyleSheet } from "react-native";
import { useUser } from "@/hooks/useUser";
import { CursusUser42 } from "@/types/user";
import { UserHeaderCard } from "./UserHeaderCard";
import { UserSkills } from "./UserSkills";
import { UserProjects } from "./UserProjects";

export const UserInfos = () => {
  const { user } = useUser();

  const cursus: CursusUser42 | undefined =
    user?.cursus_users?.find((cursus) => {
      return cursus.cursus.slug === "42cursus";
    }) ||
    user?.cursus_users?.find((cursus) => {
      return cursus.cursus.slug === "c-piscine";
    });

  return (
    <>
      <ScrollView style={styles.userInfosContainer}>
        <UserHeaderCard cursus={cursus} />
        <UserSkills cursus={cursus} />
        <UserProjects cursus={cursus} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  userInfosContainer: {
    flex: 1,
    // backgroundColor: "#ff000033",
  },
});
