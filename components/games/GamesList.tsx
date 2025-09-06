import { FlatList, StyleSheet } from "react-native";

import { useGetGames } from "@/hooks/supabase/getGames";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Separator } from "@/components/Separator";

import dayjs, { DATE_FORMAT } from "@/utils/dates";
import { GameCard } from "./GameCard";

export function GamesList() {
  const { games, refreshing, fetchGames } = useGetGames();

  return (
    <FlatList
      data={games}
      renderItem={({ item, index }) => {
        const previousGame = games[index - 1];
        const showDate = !previousGame || previousGame.date !== item.date;

        return (
          <>
            {showDate && (
              <ThemedView style={styles.dateContainer}>
                <ThemedText type="subtitle">
                  {dayjs(item.date).format(DATE_FORMAT)}
                </ThemedText>
              </ThemedView>
            )}
            <GameCard game={item} />
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
});
