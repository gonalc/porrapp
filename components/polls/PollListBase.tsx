import { type Poll } from "@/hooks/supabase/polls/getPolls";
import { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { FlatList } from "react-native";
import { PollCard } from "./PollCard";
import { useRouter } from "expo-router";
import { SharePollModal } from "./SharePollModal";
import { type PollWithGame } from "@/hooks/supabase/polls/getSinglePoll";
import { ThemedText } from "@/components/ThemedText";
import dayjs, { DateFormats } from "@/utils/dates";

type PollListBaseProps = {
  polls: PollWithGame[];
  isFetchingPolls: boolean;
  fetchPolls: () => Promise<Poll[]>;
  showTeams?: boolean;
  showDates?: boolean;
};

export function PollListBase({
  polls,
  isFetchingPolls,
  fetchPolls,
  showTeams = false,
  showDates = false,
}: PollListBaseProps) {
  const router = useRouter();

  const [selectedPoll, setSelectedPoll] = useState<PollWithGame | null>(null);

  return (
    <ThemedView>
      <FlatList
        data={polls}
        renderItem={({ item, index }) => {
          const previousPoll = polls[index - 1];
          const showDate =
            !previousPoll || previousPoll.games.date !== item.games.date;

          if (!showDates || !showDate) {
            return (
              <PollCard
                poll={item}
                onLongPress={() => setSelectedPoll(item)}
                onPress={() => router.push(`/polls/${item.id}`)}
                showTeams={showTeams}
              />
            );
          }

          return (
            <>
              <ThemedView>
                <ThemedText type="subtitle">
                  {dayjs(item.games.date).format(DateFormats.DATE)}
                </ThemedText>
              </ThemedView>
              <PollCard
                poll={item}
                onLongPress={() => setSelectedPoll(item)}
                onPress={() => router.push(`/polls/${item.id}`)}
                showTeams={showTeams}
              />
            </>
          );
        }}
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
