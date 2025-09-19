import { Image, Pressable, StyleSheet } from "react-native";

import type { Game } from "@/hooks/supabase/games/getGames";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Card } from "@/components/Card";

import dayjs, { TIME_FORMAT } from "@/utils/dates";
import { GameScore } from "./GameScore";

type GameCardProps = {
  game: Game;
  onPress: () => void;
};

export function GameCard({ game, onPress }: GameCardProps) {
  const showDate = game.status === "Sin comenzar";

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.gameCard}>
        <ThemedView style={styles.teamsSide}>
          <ThemedView style={styles.teamContainer}>
            <Image
              source={{ uri: game.home_team.imageUrlSizes.M }}
              style={styles.teamBadge}
            />
            <ThemedText type="defaultSemiBold">
              {game.home_team.fullName}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.teamContainer}>
            <Image
              source={{ uri: game.away_team.imageUrlSizes.M }}
              style={styles.teamBadge}
            />
            <ThemedText type="defaultSemiBold">
              {game.away_team.fullName}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView>
          {showDate ? (
            <ThemedText type="defaultSemiBold" style={styles.gameTime}>
              {dayjs(game.datetime).format(TIME_FORMAT)}
            </ThemedText>
          ) : (
            <GameScore score={game.score} />
          )}
        </ThemedView>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gameTime: {
    textAlign: "center",
  },
  gamesContainer: {
    flex: 1,
    gap: 16,
  },
  gameCard: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    justifyContent: "space-between",
  },
  teamBadge: {
    width: 35,
    height: 35,
  },
  teamsSide: {
    gap: 8,
  },
  teamContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
});
