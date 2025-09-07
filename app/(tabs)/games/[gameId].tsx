import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetSingleGame } from "@/hooks/supabase/getSingleGame";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function GamePage() {
  const { gameId } = useLocalSearchParams();
  const { game } = useGetSingleGame(Array.isArray(gameId) ? gameId[0] : gameId);

  if (!game) {
    return null;
  }

  console.log(JSON.stringify(game, null, 2));

  return (
    <ThemedView style={styles.container}>
      <ThemedText>{game.code}</ThemedText>
    </ThemedView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
