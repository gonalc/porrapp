import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { LoadingButton } from "@/components/LoadingButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MatchResultModal } from "@/components/MatchResultModal";
import { CreatePollStep } from "@/hooks/supabase/polls/createPoll";
import { SharePollModal } from "./SharePollModal";
import { usePollsContext } from "@/contexts/polls";
import { JoinPollModal } from "./JoinPollModal";
import { useState } from "react";
import { hasGameExpired } from "@/utils/games/game-has-expired";

export function PollJoiner() {
  const {
    startPollCreation,
    isCreatingPoll,
    creationStep,
    closeModal,
    onCreatePoll,
    createdPoll,
    fetchPolls,
    game,
  } = usePollsContext();

  const [joinPollModalVisible, setJoinPollModalVisible] = useState(false);

  const gameHasExpired = hasGameExpired(game);

  if (gameHasExpired) {
    return null;
  }

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
        onPress={() => setJoinPollModalVisible(true)}
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

      <JoinPollModal
        visible={joinPollModalVisible}
        onClose={() => setJoinPollModalVisible(false)}
        fetchPolls={fetchPolls}
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
