import { FlatList, StyleSheet } from "react-native";

import { type Game, useGetGames } from "@/hooks/supabase/games/getGames";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Separator } from "@/components/Separator";

import { DateFormats, displayDate } from "@/utils/dates";
import { GameCard } from "./GameCard";
import { useRouter } from "expo-router";

export function GamesList() {
  const { games, refreshing, fetchGames } = useGetGames();
  const router = useRouter();

  const getTournamentLabel = ({ tournament_name, match_day }: Pick<Game, "tournament_name" | "match_day">) => {
    const matchDay = isNaN(Number(match_day)) ? match_day : `Jornada ${match_day}`;

    return `${tournament_name} ${matchDay}`;
  }

  return (
    <FlatList
      data={games}
      renderItem={({ item, index }) => {
        const previousGame = games[index - 1];
        const showDate = !previousGame || previousGame.date !== item.date;
        const showTournament = !previousGame || previousGame.tournament_name !== item.tournament_name;

        return (
          <>
            {showDate && (
              <ThemedView style={styles.dateContainer}>
                <ThemedText type="subtitle">
                  {displayDate(item.date, DateFormats.DATE)}
                </ThemedText>
              </ThemedView>
            )}

            {showTournament && (
              <ThemedView style={styles.tournamentContainer}>
                <ThemedText type="defaultSemiBold">
                  {getTournamentLabel({
                    tournament_name: item.tournament_name,
                    match_day: item.match_day
                  })}
                </ThemedText>
              </ThemedView>
            )}

            <GameCard game={item} onPress={() => router.navigate(`/games/${item.code}`)} />
          </>
        );
      }}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Separator />}
      refreshing={refreshing}
      onRefresh={fetchGames}
    />
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    marginHorizontal: 32,
    marginTop: 16,
  },
  tournamentContainer: {
    marginHorizontal: 32,
  },
});
