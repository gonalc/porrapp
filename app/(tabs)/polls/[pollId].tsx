import { GameResult } from "@/components/games/GameResult";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetSinglePoll } from "@/hooks/supabase/polls/getSinglePoll";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function SinglePollPage() {
  const { pollId } = useLocalSearchParams();
  const parsedPollId = Array.isArray(pollId) ? pollId[0] : pollId;
  const { poll } = useGetSinglePoll(parsedPollId);

  if (!poll) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <GameResult game={poll.games} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
});
