import { StyleSheet, FlatList, Image } from "react-native";
import dayjs, { DATE_FORMAT } from "@/utils/dates";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetGames } from "@/hooks/supabase/getGames";
import { Card } from "@/components/Card";

export default function HomeScreen() {
  const { games } = useGetGames();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Partidos!</ThemedText>

      <FlatList
        data={games}
        renderItem={({ item }) => (
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
              <ThemedText type="defaultSemiBold">
                {dayjs(item.date).format(DATE_FORMAT)}
              </ThemedText>
            </ThemedView>
          </Card>
        )}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
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
    gap: 8
  },
  teamContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
});
