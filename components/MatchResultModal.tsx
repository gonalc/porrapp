import { useState } from "react";
import { StyleSheet } from "react-native";
import { Checkbox } from "expo-checkbox";
import { LoadingButton } from "./LoadingButton";
import { ThemedText } from "./ThemedText";
import { Modal } from "@/components/Modal";
import { GameResultInput } from "./games/GameResultInput";
import { ThemedView } from "./ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { type CreationPoll } from "@/contexts/polls";
import { type Guess } from "@/hooks/supabase/polls/getPolls";

export type MatchResult = {
  homeScore: string;
  awayScore: string;
};

type MatchResultModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (result: CreationPoll) => void;
  isLoading?: boolean;
  homeTeamName?: string;
  awayTeamName?: string;
  myPublicGuess: Guess | null;
};

export function MatchResultModal({
  visible,
  onClose,
  onSubmit,
  isLoading = false,
  homeTeamName = "Local",
  awayTeamName = "Visitante",
  myPublicGuess = null,
}: MatchResultModalProps) {
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [isPublicPoll, setIsPublicPoll] = useState(false);

  const accentColor = useThemeColor({}, "accent");

  const handleSubmit = () => {
    onSubmit({ homeScore, awayScore, isPublic: isPublicPoll });
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

      {myPublicGuess ? (
        <ThemedView style={styles.publicPollContainer}>
          <ThemedText type="defaultSemiBold">
            Ya has participado en la porra mundial
          </ThemedText>
          <ThemedText type="subtitle">
            {myPublicGuess.home_team_score} - {myPublicGuess.away_team_score}
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.isPublicPollContainer}>
          <Checkbox
            value={isPublicPoll}
            onValueChange={setIsPublicPoll}
            color={accentColor}
            disabled={!!myPublicGuess}
          />
          <ThemedText type="defaultSemiBold">
            Participar en la porra mundial
          </ThemedText>
        </ThemedView>
      )}

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
  isPublicPollContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 16,
  },
  publicPollContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    paddingBottom: 16,
  },
});
