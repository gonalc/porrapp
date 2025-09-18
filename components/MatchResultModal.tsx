import { useState } from "react";
import { StyleSheet } from "react-native";
import { Input } from "./Input";
import { LoadingButton } from "./LoadingButton";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Modal } from "@/components/Modal";

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
    <Modal visible={visible} onRequestClose={handleClose}>
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

      <Modal.ModalActions>
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
      </Modal.ModalActions>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  modalButton: {
    flex: 1,
  },
});
