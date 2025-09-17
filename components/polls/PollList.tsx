import { ThemedView } from "@/components/ThemedView";
import { useGetPolls } from "@/hooks/supabase/polls/getPolls";
import { FlatList } from "react-native";
import { PollCard } from "./PollCard";

type PollListProps = {
  gameCode: string;
};

export function PollList({ gameCode }: PollListProps) {
  const { polls, isLoading, fetchPolls } = useGetPolls(gameCode);

  return (
    <ThemedView>
      <FlatList
        data={polls}
        renderItem={({ item }) => (
          <PollCard poll={item}/>
        )}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={fetchPolls}
        refreshing={isLoading}
      />
    </ThemedView>
  );
}
