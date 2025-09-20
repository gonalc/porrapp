import { GameResult } from "@/components/games/GameResult";
import { Loader } from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetSinglePoll } from "@/hooks/supabase/polls/getSinglePoll";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

export default function SinglePollPage() {
  const { pollId } = useLocalSearchParams();
  const parsedPollId = Array.isArray(pollId) ? pollId[0] : pollId;
  const { poll } = useGetSinglePoll(parsedPollId);

  if (!poll) {
    return <Loader isLoading />;
  }

  return (
    <ThemedView style={styles.container}>
      <GameResult game={poll.games} />

      <FlatList
        data={poll.guesses}
        renderItem={({ item }) => (
          <ThemedText>
            {item.home_team_score} - {item.away_team_score}
          </ThemedText>
        )}
        keyExtractor={(item) => item.id}
      />
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
