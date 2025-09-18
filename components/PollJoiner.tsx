import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { LoadingButton } from "./LoadingButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { MatchResultModal, type MatchResult } from "./MatchResultModal";
import { useCreatePoll } from "@/hooks/supabase/polls/createPoll";

type PollJoinerProps = {
  gameCode: string;
};

export function PollJoiner({ gameCode }: PollJoinerProps) {
  const {
    isLoading: isCreatingPoll,
    startPollCreation,
    isModalOpen,
    closeModal,
    createPoll,
  } = useCreatePoll();

  const handleMatchResultSubmit = (result: MatchResult) => {
    createPoll(gameCode, result);
  };

  const buttonStyles: StyleProp<ViewStyle> = {
    width: "auto",
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
    flex: 1,
  };

  return (
    <ThemedView style={styles.container}>
      <LoadingButton
        onPress={() => alert("Join poll")}
        isLoading={false}
        variant="secondary"
        style={buttonStyles}
      >
        <ThemedText type="defaultSemiBold">Unirme a porra</ThemedText>
      </LoadingButton>

      <LoadingButton
        onPress={startPollCreation}
        isLoading={isCreatingPoll}
        style={buttonStyles}
      >
        <ThemedText type="defaultSemiBold">Crear porra</ThemedText>
      </LoadingButton>

      <MatchResultModal
        visible={isModalOpen}
        onClose={closeModal}
        onSubmit={handleMatchResultSubmit}
        isLoading={isCreatingPoll}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 16,
  },
});
