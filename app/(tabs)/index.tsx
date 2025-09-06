import { StyleSheet, FlatList, Image } from "react-native";
import dayjs, { DATE_FORMAT, TIME_FORMAT } from "@/utils/dates";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetGames } from "@/hooks/supabase/getGames";
import { Card } from "@/components/Card";
import { Separator } from "@/components/Separator";

export default function HomeScreen() {
  const { games, refreshing, fetchGames } = useGetGames();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Partidos
      </ThemedText>

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
              <Card style={styles.gameCard}>
                <ThemedView style={styles.teamsSide}>
                  <ThemedView style={styles.teamContainer}>
                    <Image
                      source={{ uri: item.home_team.imageUrl }}
                      style={styles.teamBadge}
                    />
                    <ThemedText type="defaultSemiBold">
                      {item.home_team.fullName}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.teamContainer}>
                    <Image
                      source={{ uri: item.away_team.imageUrl }}
                      style={styles.teamBadge}
                    />
                    <ThemedText type="defaultSemiBold">
                      {item.away_team.fullName}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

                <ThemedView>
                  <ThemedText type="defaultSemiBold" style={styles.gameTime}>
                    {dayjs(item.datetime).format(TIME_FORMAT)}
                  </ThemedText>
                </ThemedView>
              </Card>
            </>
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Separator />}
        refreshing={refreshing}
        onRefresh={fetchGames}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  title: {
    textAlign: "center",
  },
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
  dateContainer: {
    marginHorizontal: 32,
    marginTop: 16,
  }
});
