import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { LoadingButton } from "./LoadingButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { MatchResultModal } from "./MatchResultModal";
import { CreatePollStep } from "@/hooks/supabase/polls/createPoll";
import { SharePollModal } from "./polls/SharePollModal";
import { usePollsContext } from "@/contexts/polls";

export function PollJoiner() {
  const {
    startPollCreation,
    isCreatingPoll,
    creationStep,
    closeModal,
    onCreatePoll,
    createdPoll,
  } = usePollsContext();

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
        visible={creationStep === CreatePollStep.INSERT_GUESS}
        onClose={closeModal}
        onSubmit={onCreatePoll}
        isLoading={isCreatingPoll}
      />

      <SharePollModal
        visible={creationStep === CreatePollStep.SHARE_CODE}
        onClose={closeModal}
        poll={createdPoll}
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
