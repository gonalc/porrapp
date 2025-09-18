import { ThemedView } from "@/components/ThemedView";
import { type Poll } from "@/hooks/supabase/polls/getPolls";
import { FlatList } from "react-native";
import { PollCard } from "./PollCard";
import { SharePollModal } from "./SharePollModal";
import { useState } from "react";
import { usePollsContext } from "@/contexts/polls";

export function PollList() {
  const { polls, isFetchingPolls, fetchPolls } = usePollsContext();

  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);

  return (
    <ThemedView>
      <FlatList
        data={polls}
        renderItem={({ item }) => (
          <PollCard poll={item} onLongPress={() => setSelectedPoll(item)} />
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
