import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { type PropsWithChildren } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

type LoadingButtonProps = PropsWithChildren<{
  isLoading: boolean;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}>;

export function LoadingButton({
  isLoading,
  onPress,
  children,
  variant = "primary",
  disabled = false,
}: LoadingButtonProps) {
  const buttonBackgroundColor = useThemeColor({}, variant);
  const loaderColor = useThemeColor({}, "background");

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
    >
      {isLoading ? <ActivityIndicator color={loaderColor} /> : children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
