import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {}, [isAuthenticated]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : isAuthenticated ? (
        <Redirect href={"/profile"} />
      ) : (
        <Redirect href={"/login"} />
      )}
    </>
  );
}
