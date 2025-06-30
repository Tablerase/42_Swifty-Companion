import { Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

export const Skeleton = ({
  width,
  height,
  style,
}: {
  width: number;
  height: number;
  style: any;
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: "#E1E9EE",
          borderRadius: 4,
          opacity,
        },
        style,
      ]}
    />
  );
};
