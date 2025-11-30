import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native";

type LoggedOutMessageProps = {
  message?: string;
};

export function LoggedOutMessage({
  message = "Para poder crear o unirte a una porra, debes iniciar sesión.",
}: LoggedOutMessageProps) {
  return (
    <ThemedView style={[styles.container, styles.loggedOut]}>
      <ThemedText type="defaultSemiBold" style={styles.loggedOutMessage}>
        {message}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  loggedOut: {
    justifyContent: "center",
    alignItems: "center",
  },
  loggedOutMessage: {
    fontSize: 20,
    textAlign: "center",
  },
});
