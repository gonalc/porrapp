import { Loader } from "@/components/Loader";
import { LoggedOutMessage } from "@/components/polls/LoggedOutMessage";
import { PollListBase } from "@/components/polls/PollListBase";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/contexts/session";
import { useGetPolls } from "@/hooks/supabase/polls/getPolls";
import { StyleSheet } from "react-native";

export default function WorldPolls() {
  const { data: session } = useSession();
  const { polls, isLoading, fetchPolls } = useGetPolls({
    userId: session?.user.id,
    onlyPublicPolls: true,
  });

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
