import { StyleSheet, Animated } from "react-native";
import { ThemedText } from "./ui/ThemedText";
import { theme } from "@/constants/theme";
import { useEffect, useRef } from "react";

export const LoginNotFound = ({ onHide }: { onHide: () => void }) => {
  const offScreen = -250;
  const slideAnim = useRef(new Animated.Value(offScreen)).current; // Initial position off-screen

  useEffect(() => {
    // Slide in
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // After 2 seconds, slide out and then call onHide
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: offScreen,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onHide();
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [slideAnim, onHide]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <ThemedText style={styles.noDataText} type="title">
        🔍 Login not found, try again with an existing login
      </ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    alignItems: "center",
    padding: theme.spacing.medium,
    margin: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.accent.error,
  },
  noDataText: {
    textAlign: "center",
    marginVertical: 50,
    color: theme.colors.text.secondary,
  },
});
