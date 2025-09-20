import { type Guess } from "@/hooks/supabase/polls/getPolls";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, Dimensions } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type GuessCardProps = {
  guess: Guess;
  userId: string;
};

export function GuessCard({
  guess: { home_team_score, away_team_score, author },
  userId,
}: GuessCardProps) {
  const surfaceColor = useThemeColor({}, "surface");
  const accentColor = useThemeColor({}, "accent");

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 54) / 3;

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: surfaceColor, width: cardWidth },
      ]}
    >
      <ThemedText type="defaultSemiBold">
        {home_team_score} - {away_team_score}
      </ThemedText>
      {userId === author && (
        <ThemedView
          style={[styles.myGuessMark, { backgroundColor: accentColor }]}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: 'center',
    gap: 8,
  },
  myGuessMark: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
