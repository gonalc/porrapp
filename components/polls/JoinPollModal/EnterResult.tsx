import { GameResultInput } from "@/components/games/GameResultInput";
import { LoadingButton } from "@/components/LoadingButton";
import { Modal } from "@/components/Modal";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";

type EnterResultProps = {
  onSubmit: (result: { homeScore: number; awayScore: number }) => void;
};

export function EnterResult({ onSubmit }: EnterResultProps) {
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  const handleSubmit = () => {
    onSubmit({
      homeScore: parseInt(homeScore),
      awayScore: parseInt(awayScore),
    });
    setHomeScore("");
    setAwayScore("");
  };

  return (
    <>
      <ThemedText type="defaultSemiBold">Resultado del partido</ThemedText>

      <GameResultInput
        homeScore={homeScore}
        awayScore={awayScore}
        setHomeScore={setHomeScore}
        setAwayScore={setAwayScore}
      />

      <Modal.ModalActions>
        <LoadingButton onPress={handleSubmit} isLoading={false}>
          <ThemedText type="defaultSemiBold">Confirmar</ThemedText>
        </LoadingButton>
      </Modal.ModalActions>
    </>
  );
}
