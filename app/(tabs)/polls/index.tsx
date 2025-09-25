import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/contexts/session";
import { useGetPolls } from "@/hooks/supabase/polls/getPolls";
import { Loader } from "@/components/Loader";
import { PollListBase } from "@/components/polls/PollListBase";
import { LoggedOutMessage } from "@/components/polls/LoggedOutMessage";

export default function PollsScreen() {
  const { data: session } = useSession();
  const { polls, isLoading, fetchPolls } = useGetPolls({
    userId: session?.user.id,
  });

  if (!session) {
    return <LoggedOutMessage />;
  }

  return (
    <Loader isLoading={isLoading}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Porras
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
