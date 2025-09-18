import { ThemedView } from "@/components/ThemedView";
import { type Poll, useGetPolls } from "@/hooks/supabase/polls/getPolls";
import { FlatList } from "react-native";
import { PollCard } from "./PollCard";
import { SharePollModal } from "./SharePollModal";
import { useState } from "react";

type PollListProps = {
  gameCode: string;
};

export function PollList({ gameCode }: PollListProps) {
  const { polls, isLoading, fetchPolls } = useGetPolls(gameCode);

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
        refreshing={isLoading}
      />
      <SharePollModal
        visible={!!selectedPoll}
        onClose={() => setSelectedPoll(null)}
        poll={selectedPoll}
      />
    </ThemedView>
  );
}
