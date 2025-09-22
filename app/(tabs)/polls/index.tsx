import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/contexts/session";

export default function PollsScreen() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <ThemedView style={[styles.container, styles.loggedOut]}>
        <ThemedText type="defaultSemiBold" style={styles.loggedOutMessage}>
          Para poder crear o unirte a una porra, debes iniciar sesión.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Nuevas Porras!</ThemedText>
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
  }
});
