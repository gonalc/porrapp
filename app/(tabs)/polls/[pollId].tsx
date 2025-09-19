import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function SinglePollPage() {
  const { pollId } = useLocalSearchParams();
  const parsedPollId = Array.isArray(pollId) ? pollId[0] : pollId;

  return (
    <ThemedView style={styles.container}>
      <ThemedText>{parsedPollId}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
