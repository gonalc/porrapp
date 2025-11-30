import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSession } from "@/contexts/session";
import { useMemo } from "react";
import { PollModality, type PollWithGameAndParticipants } from "@/hooks/supabase/polls/getPolls";
import { IconSymbol } from "../ui/IconSymbol";

type PollCardProps = {
  poll: PollWithGameAndParticipants;
  onLongPress?: () => void;
  onPress?: () => void;
  showTeams?: boolean;
};

export function PollCard({
  poll,
  onLongPress = () => {},
  onPress,
  showTeams,
}: PollCardProps) {
  const surfaceColor = useThemeColor({}, "surface");
  const accentColor = useThemeColor({}, "accent");
  const textColor = useThemeColor({}, "text");

  console.log('POLL CARD: ', JSON.stringify(poll, null, 2))

  const { data: session } = useSession();

  const myGuess = useMemo(
    () => poll.guesses.find((guess) => guess.author === session?.user.id),
    [poll.guesses, session?.user.id],
  );

  if (!myGuess) {
    return null;
  }

  const { homeTeam, awayTeam } = poll.games.score;
  const homeTeamScore = homeTeam.totalScore;
  const awayTeamScore = awayTeam.totalScore;

  return (
    <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
      <ThemedView style={[styles.container, { backgroundColor: surfaceColor }]}>
        {showTeams && (
          <Image
            source={{ uri: poll.games.home_team.imageUrlSizes.M }}
            style={styles.teamLogo}
          />
        )}
        <ThemedView
          style={[styles.resultsContainer, { backgroundColor: surfaceColor }]}
        >
          <ThemedText type="defaultSemiBold" style={styles.myGuess}>
            {myGuess.home_team_score} - {myGuess.away_team_score}
          </ThemedText>
          {poll.modality === PollModality.PUBLIC && (
            <IconSymbol name="globe.europe.africa" color={accentColor} />
          )}
          {poll.games.status !== "Sin comenzar" && (
            <ThemedText>
              {homeTeamScore} - {awayTeamScore}
            </ThemedText>
          )}
        </ThemedView>
        {showTeams && (
          <Image
            source={{ uri: poll.games.away_team.imageUrlSizes.M }}
            style={styles.teamLogo}
          />
        )}
        <ThemedView style={[styles.participantsContainer, { backgroundColor: surfaceColor }]}>
          <ThemedText>{poll.guesses.length} </ThemedText>
          <IconSymbol size={28} name="person.fill" color={textColor} />
        </ThemedView>
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
  teamLogo: {
    width: 30,
    height: 30,
  },
  resultsContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  participantsContainer: {
    alignItems: "center",
    flexDirection: "row",
  }
});
