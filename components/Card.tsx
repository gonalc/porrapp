import { type PropsWithChildren } from "react";
import { type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export function Card({ children, style }: CardProps) {
  const backgroundColor = useThemeColor({}, "background");
  const neutralSupportColor = useThemeColor({}, "neutralSupport");

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: backgroundColor, shadowColor: neutralSupportColor },
        style,
      ]}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
