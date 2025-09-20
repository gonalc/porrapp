import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type Game } from "@/hooks/supabase/games/getGames";
import { StyleSheet } from "react-native";
import { TeamCard } from "@/components/games/TeamCard";
import dayjs, { DATE_FORMAT, TIME_FORMAT } from "@/utils/dates";

type GameResultProps = {
  game: Game;
};

export function GameResult({ game }: GameResultProps) {
  const LIVE_STATUS: Set<Game["status"]> = new Set(["En juego", "Finalizado"]);

  return (
    <>
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

        <ThemedView style={styles.scoreContainer}>
          <ThemedText
            style={styles.gameDateTime}
            type="caption"
          >{`${dayjs(game.date).format(DATE_FORMAT)} ${dayjs(game.datetime).format(TIME_FORMAT)}`}</ThemedText>
          {LIVE_STATUS.has(game.status) ? (
            <>
              <ThemedView style={styles.scoreBox}>
                <ThemedText type="title" style={styles.scoreText}>
                  {game.score.homeTeam.totalScore}
                </ThemedText>
                <ThemedText style={styles.scoreSeparator}>-</ThemedText>
                <ThemedText type="title" style={styles.scoreText}>
                  {game.score.awayTeam.totalScore}
                </ThemedText>
              </ThemedView>
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
        </ThemedView>

        <TeamCard team={game.away_team} />
      </ThemedView>

      <ThemedView style={styles.detailsContainer}>
        <ThemedView style={styles.detailRow}>
          <ThemedText style={styles.detailLabel}>🏟️ Estadio</ThemedText>
          <ThemedText style={styles.detailValue}>{game.location}</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  matchupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  scoreContainer: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  gameDateTime: {
    marginBottom: 8,
    textAlign: "center",
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
  tournamentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
    width: "100%",
  },
  tournamentName: {},
  matchDay: {
    opacity: 0.7,
  },
  detailsContainer: {},
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  detailLabel: {
    fontSize: 16,
    opacity: 0.8,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
  },
});
