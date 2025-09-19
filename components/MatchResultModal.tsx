import { useState } from "react";
import { StyleSheet } from "react-native";
import { LoadingButton } from "./LoadingButton";
import { ThemedText } from "./ThemedText";
import { Modal } from "@/components/Modal";
import { GameResultInput } from "./games/GameResultInput";

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

      <GameResultInput
        homeScore={homeScore}
        awayScore={awayScore}
        setHomeScore={setHomeScore}
        setAwayScore={setAwayScore}
        homeTeamName={homeTeamName}
        awayTeamName={awayTeamName}
      />

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
  modalButton: {
    flex: 1,
  },
});
