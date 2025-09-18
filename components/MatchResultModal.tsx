import { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Input } from "./Input";
import { LoadingButton } from "./LoadingButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export type MatchResult = {
  homeScore: string;
  awayScore: string;
};

type MatchResultModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (result: MatchResult) => void;
  isLoading?: boolean;
  homeTeamName?: string;
  awayTeamName?: string;
};

export function MatchResultModal({
  visible,
  onClose,
  onSubmit,
  isLoading = false,
  homeTeamName = "Local",
  awayTeamName = "Visitante",
}: MatchResultModalProps) {
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  const handleSubmit = () => {
    onSubmit({ homeScore, awayScore });
    setHomeScore("");
    setAwayScore("");
  };

  const handleClose = () => {
    setHomeScore("");
    setAwayScore("");
    onClose();
  };

  const isSubmitDisabled = homeScore.trim() === "" || awayScore.trim() === "";

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={handleClose}
      testID="match-result-modal"
    >
      <TouchableWithoutFeedback onPress={handleClose} testID="modal-backdrop">
        <ThemedView style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ThemedView style={styles.modalContent}>
              <ThemedText type="defaultSemiBold" style={styles.modalTitle}>
                Introduce el resultado del partido
              </ThemedText>

              <ThemedView style={styles.inputContainer}>
                <ThemedView style={styles.scoreInputWrapper}>
                  <ThemedText type="default" style={styles.teamLabel}>
                    {homeTeamName}
                  </ThemedText>
                  <Input
                    value={homeScore}
                    onChangeText={setHomeScore}
                    keyboardType="numeric"
                    maxLength={2}
                    style={styles.scoreInput}
                    testID="home-score-input"
                    placeholder="0"
                  />
                </ThemedView>

                <ThemedText type="title" style={styles.vs}>
                  VS
                </ThemedText>

                <ThemedView style={styles.scoreInputWrapper}>
                  <ThemedText type="default" style={styles.teamLabel}>
                    {awayTeamName}
                  </ThemedText>
                  <Input
                    value={awayScore}
                    onChangeText={setAwayScore}
                    keyboardType="numeric"
                    maxLength={2}
                    style={styles.scoreInput}
                    testID="away-score-input"
                    placeholder="0"
                  />
                </ThemedView>
              </ThemedView>

              <ThemedView style={styles.modalActions}>
                <LoadingButton
                  onPress={handleClose}
                  variant="secondary"
                  style={styles.modalButton}
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  <ThemedText type="defaultSemiBold">Cancelar</ThemedText>
                </LoadingButton>

                <LoadingButton
                  onPress={handleSubmit}
                  style={styles.modalButton}
                  disabled={isSubmitDisabled}
                  isLoading={isLoading}
                >
                  <ThemedText type="defaultSemiBold">Confirmar</ThemedText>
                </LoadingButton>
              </ThemedView>
            </ThemedView>
          </TouchableWithoutFeedback>
        </ThemedView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 24,
    margin: 20,
    borderRadius: 12,
    minWidth: 300,
    maxWidth: 400,
  },
  modalTitle: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 16,
  },
  scoreInputWrapper: {
    flex: 1,
    alignItems: "center",
  },
  teamLabel: {
    marginBottom: 8,
    textAlign: "center",
    fontSize: 14,
  },
  scoreInput: {
    textAlign: "center",
    marginBottom: 0,
    fontSize: 18,
    fontWeight: "bold",
  },
  vs: {
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.7,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});
