import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { type PropsWithChildren } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

type LoaderProps = PropsWithChildren<{
  isLoading: boolean;
}>;

export function Loader({ isLoading, children }: LoaderProps) {
  const primaryColor = useThemeColor({}, "primary");

  if (!isLoading) return children;

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" color={primaryColor} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
