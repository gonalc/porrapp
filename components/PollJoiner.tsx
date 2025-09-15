import { Modal, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { LoadingButton } from "./LoadingButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useCreatePoll } from "@/hooks/supabase/polls/createPoll";

type PollJoinerProps = {
  gameCode?: string;
};

export function PollJoiner({ gameCode }: PollJoinerProps) {
  const {
    isLoading: isCreatingPoll,
    startPollCreation,
    isModalOpen,
    closeModal,
  } = useCreatePoll();

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

      <Modal
        animationType="fade"
        transparent
        visible={isModalOpen}
        onRequestClose={closeModal}
      >
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <ThemedText type="defaultSemiBold">Crear porra</ThemedText>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
});
