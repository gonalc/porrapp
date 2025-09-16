import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useGetPolls } from "@/hooks/supabase/polls/getPolls";
import { FlatList } from "react-native";

type PollListProps = {
  gameCode: string;
};

export function PollList({ gameCode }: PollListProps) {
  const { polls, isLoading } = useGetPolls(gameCode);

  return (
    <ThemedView>
      <FlatList
        data={polls}
        renderItem={({ item }) => (
          <ThemedText>{item.id}</ThemedText>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </ThemedView>
  );
}
