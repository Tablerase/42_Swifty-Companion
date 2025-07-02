import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ui/ThemedText";
import { useUser } from "@/hooks/useUser";
import { Image } from "expo-image";
import { theme } from "@/constants/theme";
import { Skeleton } from "./Skeleton";
import { CursusUser42 } from "@/types/user";

export const UserHeaderCard = ({
  cursus,
}: {
  cursus: CursusUser42 | undefined;
}) => {
  const { user, isUserLoading } = useUser();

  const progressBarPercent = ((cursus?.level || 0) % 1) * 100;

  return (
    <View style={styles.userHeaderCard}>
      {user && !isUserLoading ? (
        <Image
          placeholder={"KLRpB]of~Wj[fQof~XfQIo"}
          source={user?.image?.versions.medium}
          style={styles.avatar}
          contentFit="cover"
        />
      ) : (
        <Skeleton
          width={150}
          height={150}
          style={styles.avatar}
          animated={isUserLoading}
        />
      )}

      <View style={styles.userHeaderCardDetails}>
        {user && !isUserLoading ? (
          <>
            <ThemedText
              style={styles.userHeaderCardDisplayName}
              type="subtitle"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {user.displayname}
            </ThemedText>
            <ThemedText type="caption" style={styles.userHeaderCardEmail}>
              {user.email}
            </ThemedText>
            <View style={styles.userHeaderCardValues}>
              <ThemedText
                type="caption"
                style={styles.UserHeaderCardValuesItem}
              >
                {user.correction_point} Ev.P
              </ThemedText>
              <ThemedText
                type="caption"
                style={styles.UserHeaderCardValuesItem}
              >
                {user.wallet} ₳
              </ThemedText>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressBarPercent}%` },
                ]}
              />
              <View style={styles.progressBarLabel}>
                <ThemedText type="caption">{cursus?.level}</ThemedText>
              </View>
            </View>
          </>
        ) : (
          <>
            <Skeleton
              width={150}
              height={40}
              style={styles.userHeaderCardDisplayName}
              animated={isUserLoading}
            />
            <Skeleton
              width={120}
              height={theme.fontSizes.medium}
              style={styles.userHeaderCardEmail}
              animated={isUserLoading}
            />
            <View style={styles.userHeaderCardValues}>
              <Skeleton
                width={60}
                height={theme.fontSizes.small}
                style={styles.UserHeaderCardValuesItem}
                animated={isUserLoading}
              />
              <Skeleton
                width={50}
                height={theme.fontSizes.small}
                style={styles.UserHeaderCardValuesItem}
                animated={isUserLoading}
              />
            </View>
            <Skeleton
              width={150}
              height={20}
              style={styles.progressBarContainer}
              animated={isUserLoading}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userHeaderCard: {
    flex: 2,
    minHeight: 200,
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.medium,
    margin: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.primary.main + "aa",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: theme.colors.secondary.light,
  },
  userHeaderCardDetails: {
    marginLeft: theme.spacing.large,
    gap: 5,
    flexShrink: 1,
  },
  userHeaderCardDisplayName: {
    backgroundColor: theme.colors.secondary.main,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  userHeaderCardEmail: {
    backgroundColor: theme.colors.ternary.main,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.small,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  userHeaderCardValues: {
    flexDirection: "row",
    gap: 10,
  },
  UserHeaderCardValuesItem: {
    backgroundColor: theme.colors.primary.light,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.small,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: theme.colors.neutral.light,
    borderRadius: theme.borderRadius.small,
    overflow: "hidden",
    marginTop: theme.spacing.small,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: theme.colors.secondary.light,
    borderRadius: theme.borderRadius.small,
    zIndex: 1,
  },
  progressBarLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    zIndex: 2,
  },
});
