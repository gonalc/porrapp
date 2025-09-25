import { GameResult } from "@/components/games/GameResult";
import { Loader } from "@/components/Loader";
import { LoggedOutMessage } from "@/components/polls/LoggedOutMessage";
import { Polls } from "@/components/polls/Polls";
import { ProtectedComponent } from "@/components/ProtectedComponent";

import { ThemedView } from "@/components/ThemedView";
import { useGetSingleGame } from "@/hooks/supabase/games/getSingleGame";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function GamePage() {
  const { gameId } = useLocalSearchParams();
  const gameCode = Array.isArray(gameId) ? gameId[0] : gameId;
  const { game, refreshing } = useGetSingleGame(gameCode);

  if (!game) {
    return <Loader isLoading />
  }

  return (
    <Loader isLoading={refreshing}>
      <ThemedView style={styles.scrollView}>
        <ThemedView style={styles.container}>
          <GameResult game={game} />

          <ProtectedComponent fallback={<LoggedOutMessage />}>
            <Polls game={game} />
          </ProtectedComponent>
        </ThemedView>
      </ThemedView>
    </Loader>
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
