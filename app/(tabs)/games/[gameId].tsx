import { TeamCard } from "@/components/games/TeamCard";
import { Polls } from "@/components/polls/Polls";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetSingleGame } from "@/hooks/supabase/games/getSingleGame";
import dayjs, { DATE_FORMAT, TIME_FORMAT } from "@/utils/dates";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

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

  const isFinished = game.status === "Finalizado";

  return (
    <ThemedView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.tournamentHeader}>
          <ThemedText type="defaultSemiBold" style={styles.tournamentName}>
            {game.tournament_name}
          </ThemedText>
          <ThemedText style={styles.matchDay}>
            Jornada {game.match_day} • {game.season}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.matchupContainer}>
          <TeamCard team={game.home_team} />

          <View style={styles.scoreContainer}>
            <ThemedText
              style={styles.gameDateTime}
              type="caption"
            >{`${dayjs(game.date).format(DATE_FORMAT)} ${dayjs(game.datetime).format(TIME_FORMAT)}`}</ThemedText>
            {isFinished ? (
              <>
                <View style={styles.scoreBox}>
                  <ThemedText type="title" style={styles.scoreText}>
                    {game.score.homeTeam.totalScore}
                  </ThemedText>
                  <ThemedText style={styles.scoreSeparator}>-</ThemedText>
                  <ThemedText type="title" style={styles.scoreText}>
                    {game.score.awayTeam.totalScore}
                  </ThemedText>
                </View>
                <ThemedText style={styles.statusText}>
                  {game.score.period.name}
                </ThemedText>
              </>
            ) : (
              <>
                <ThemedText type="title" style={styles.vsText}>
                  VS
                </ThemedText>
                <ThemedText style={styles.statusText}>{game.status}</ThemedText>
              </>
            )}
          </View>

          <TeamCard team={game.away_team} />
        </ThemedView>

        <ThemedView style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>🏟️ Estadio</ThemedText>
            <ThemedText style={styles.detailValue}>{game.location}</ThemedText>
          </View>
        </ThemedView>

        <Polls gameCode={game.code} />
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
  tournamentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  tournamentName: {},
  matchDay: {
    opacity: 0.7,
  },
  matchupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  gameDateTime: {
    marginBottom: 8,
    textAlign: "center",
  },
  scoreContainer: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: "bold",
    minWidth: 50,
    textAlign: "center",
  },
  scoreSeparator: {
    fontSize: 24,
    marginHorizontal: 16,
    opacity: 0.5,
  },
  vsText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    opacity: 0.7,
  },
  statusText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 16,
    opacity: 0.8,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    flex: 2,
    textAlign: "right",
  },
});
