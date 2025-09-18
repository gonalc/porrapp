import { Modal } from "@/components/Modal";
import { ThemedText } from "@/components/ThemedText";
import { type Poll } from "@/hooks/supabase/polls/getPolls";

type SharePollModalProps = {
  visible: boolean;
  onClose: () => void;
  poll: Poll | null;
}

export function SharePollModal({ visible, onClose, poll }: SharePollModalProps) {
  if (!poll) return null;

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <ThemedText type="defaultSemiBold">Sharing Poll!</ThemedText>
      <ThemedText>{poll.code}</ThemedText>
    </Modal>
  )
}
