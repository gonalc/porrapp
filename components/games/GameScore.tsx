import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import type { Game } from "@/hooks/supabase/games/getGames";

type GameScoreProps = {
  score: Game['score'];
};

export function GameScore({ score }: GameScoreProps) {
  return (
    <ThemedView>
      <ThemedText type="defaultSemiBold">
        {score.homeTeam.totalScore}
      </ThemedText>
      <ThemedText type="defaultSemiBold">
        {score.awayTeam.totalScore}
      </ThemedText>
    </ThemedView>
  )
}
