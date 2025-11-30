import { type PollWithGame } from "@/hooks/supabase/polls/getSinglePoll";
import { Modal } from "@/components/Modal";
import { ThemedText } from "@/components/ThemedText";
import { type Guess } from "@/hooks/supabase/polls/getPolls";

type JoinPublicPollModalProps = {
  visible: boolean;
  onClose: () => void;
  poll: PollWithGame;
  myPublicGuess: Guess;
};

export function JoinedPublicPollModal({
  poll,
  onClose,
  visible,
  myPublicGuess,
}: JoinPublicPollModalProps) {
  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <ThemedText type="defaultSemiBold">
        Te has unido a la porra mundial
      </ThemedText>
      <ThemedText>
        Tu pronóstico para el partido {poll.games.home_team.abbName} vs{" "}
        {poll.games.away_team.abbName}:
      </ThemedText>

      <ThemedText type="subtitle" style={{ textAlign: "center" }}>
        {myPublicGuess.home_team_score} - {myPublicGuess.away_team_score}
      </ThemedText>
    </Modal>
  );
}
