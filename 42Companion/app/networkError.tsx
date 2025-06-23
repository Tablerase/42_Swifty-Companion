import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

export default function NetworkErrorScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Network Error</ThemedText>
      <ThemedText style={styles.message}>
        Please check your internet connection or server status and try again.
      </ThemedText>
      <ThemedButton onPress={() => router.back()} title="Retry" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
