import { type Poll } from "@/hooks/supabase/polls/getPolls";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useSession } from "@/contexts/session";
import { useMemo } from "react";

type PollCardProps = {
  poll: Poll;
  onLongPress?: () => void;
  onPress?: () => void;
};

export function PollCard({ poll, onLongPress = () => {}, onPress }: PollCardProps) {
  const surfaceColor = useThemeColor({}, "surface");
  const { data: session } = useSession();

  const myGuess = useMemo(
    () => poll.guesses.find((guess) => guess.author === session?.user.id),
    [poll.guesses, session?.user.id],
  );

  if (!myGuess) {
    return null;
  }

  return (
    <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
      <ThemedView style={[styles.container, { backgroundColor: surfaceColor }]}>
        <ThemedText type="defaultSemiBold" style={styles.myGuess}>
          {myGuess.home_team_score} - {myGuess.away_team_score}
        </ThemedText>
        <ThemedText>{poll.guesses.length} participantes</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  myGuess: {
    fontSize: 24,
  },
});
