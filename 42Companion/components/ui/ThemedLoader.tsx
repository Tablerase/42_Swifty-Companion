import { useThemeColor } from "@/hooks/useThemeColor";
import { ActivityIndicator } from "react-native";

export const ThemedLoader = ({
  size = 100,
  color,
}: {
  size: number;
  color: string;
}) => {
  const tintColor = useThemeColor({}, "tint");

  return (
    <>
      <ActivityIndicator size={size} color={color ? color : tintColor} />
    </>
  );
};
