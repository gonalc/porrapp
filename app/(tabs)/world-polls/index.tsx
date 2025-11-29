import { Loader } from "@/components/Loader";
import { LoggedOutMessage } from "@/components/polls/LoggedOutMessage";
import { PollListBase } from "@/components/polls/PollListBase";
import { PublicPollStatsWidget } from "@/components/polls/PublicPollStatsWidget";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/contexts/session";
import { PollModality, useGetPolls } from "@/hooks/supabase/polls/getPolls";
import { useGetPublicPollStats } from "@/hooks/supabase/polls/getPublicPollStats";
import { StyleSheet } from "react-native";

export default function WorldPolls() {
  const { data: session } = useSession();
  const { polls, isLoading, fetchPolls } = useGetPolls({
    userId: session?.user.id,
    filterByModality: PollModality.PUBLIC,
  });
  const { stats, isLoading: isLoadingStats } = useGetPublicPollStats(
    session?.user.id,
  );

  if (!session) {
    return (
      <LoggedOutMessage message="Para poder ver o participar en las porras mundiales necesitas iniciar sesión." />
    );
  }

  return (
    <Loader isLoading={false}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Porras mundiales
        </ThemedText>
        <PublicPollStatsWidget stats={stats} isLoading={isLoadingStats} />
        <PollListBase
          polls={polls}
          isFetchingPolls={isLoading}
          fetchPolls={fetchPolls}
          showTeams
          showDates
        />
      </ThemedView>
    </Loader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  title: {
    marginBottom: 16,
  },
});
