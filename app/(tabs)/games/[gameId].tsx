import { GameResult } from "@/components/games/GameResult";
import { Polls } from "@/components/polls/Polls";
import { ProtectedComponent } from "@/components/ProtectedComponent";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetSingleGame } from "@/hooks/supabase/games/getSingleGame";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function GamePage() {
  const { gameId } = useLocalSearchParams();
  const gameCode = Array.isArray(gameId) ? gameId[0] : gameId;
  const { game, refreshing } = useGetSingleGame(gameCode);

  if (!game || refreshing) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        <GameResult game={game} />

        <ProtectedComponent>
          <Polls game={game} />
        </ProtectedComponent>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
});
