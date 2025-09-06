import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export function Separator() {
  const neutralSupportColor = useThemeColor({}, "neutralSupport");

  return <ThemedView style={[styles.separator, { backgroundColor: neutralSupportColor }]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
});
