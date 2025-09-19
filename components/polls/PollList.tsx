import { ThemedView } from "@/components/ThemedView";
import { type Poll } from "@/hooks/supabase/polls/getPolls";
import { FlatList } from "react-native";
import { PollCard } from "./PollCard";
import { SharePollModal } from "./SharePollModal";
import { useState } from "react";
import { usePollsContext } from "@/contexts/polls";
import { useRouter } from "expo-router";

export function PollList() {
  const router = useRouter();

  const { polls, isFetchingPolls, fetchPolls } = usePollsContext();

  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);

  return (
    <ThemedView>
      <FlatList
        data={polls}
        renderItem={({ item }) => (
          <PollCard
            poll={item}
            onLongPress={() => setSelectedPoll(item)}
            onPress={() => router.push(`/polls/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={fetchPolls}
        refreshing={isFetchingPolls}
      />
      <SharePollModal
        visible={!!selectedPoll}
        onClose={() => setSelectedPoll(null)}
        poll={selectedPoll}
      />
    </ThemedView>
  );
}
