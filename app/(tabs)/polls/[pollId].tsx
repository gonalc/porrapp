import { GameResult } from "@/components/games/GameResult";
import { Loader } from "@/components/Loader";
import { GuessCard } from "@/components/polls/GuessCard";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/contexts/session";
import { useGetSinglePoll } from "@/hooks/supabase/polls/getSinglePoll";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

export default function SinglePollPage() {
  const { pollId } = useLocalSearchParams();
  const parsedPollId = Array.isArray(pollId) ? pollId[0] : pollId;
  const { poll } = useGetSinglePoll(parsedPollId);
  const { data: session } = useSession();

  if (!poll || !session) {
    return <Loader isLoading />;
  }

  return (
    <ThemedView style={styles.container}>
      <GameResult game={poll.games} />

      <FlatList
        data={poll.guesses}
        renderItem={({ item }) => <GuessCard guess={item} userId={session.user.id} />}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.listContainer}
        columnWrapperStyle={styles.row}
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
  listContainer: {
    flex: 1,
    width: "100%",
  },
  row: {
    justifyContent: "space-between",
  }
});
