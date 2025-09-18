import { Modal } from "@/components/Modal";
import { ThemedText } from "@/components/ThemedText";
import { type Poll } from "@/hooks/supabase/polls/getPolls";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TouchableOpacity } from "react-native";

type SharePollModalProps = {
  visible: boolean;
  onClose: () => void;
  poll: Poll | null;
};

export function SharePollModal({
  visible,
  onClose,
  poll,
}: SharePollModalProps) {
  const backgroundColor = useThemeColor({}, "background");
  const neutralSupportColor = useThemeColor({}, "neutralSupport");

  if (!poll) return null;

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <ThemedText type="defaultSemiBold">Comparte esta porra</ThemedText>
      <ThemedText>
        Utiliza este código para que más personas se unan a la porra.
      </ThemedText>

      <TouchableOpacity onPress={() => alert(poll.code)}>
        <ThemedText
          type="subtitle"
          style={[
            styles.code,
            {
              borderColor: neutralSupportColor,
              backgroundColor: backgroundColor,
            },
          ]}
        >
          {poll.code}
        </ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.caption}>
        Toca el código para copiarlo
      </ThemedText>
    </Modal>
  );
}

const styles = StyleSheet.create({
  code: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: "auto",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  caption: {
    textAlign: "center",
  },
});
