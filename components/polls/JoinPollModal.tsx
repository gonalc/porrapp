import { Modal } from "@/components/Modal";
import { ThemedText } from "@/components/ThemedText";
import { Input } from "@/components/Input";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { LoadingButton } from "@/components/LoadingButton";
import { useValidateCode } from "@/hooks/supabase/polls/validateCode";
import { useThemeColor } from "@/hooks/useThemeColor";

type JoinModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function JoinPollModal({ visible, onClose }: JoinModalProps) {
  const warningColor = useThemeColor({}, "warning");

  const [code, setCode] = useState("");
  const { isValidating, validateCode, validationError } = useValidateCode();

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <ThemedText type="defaultSemiBold">Unirme a una porra</ThemedText>
      <ThemedText>Introduce el código de la porra.</ThemedText>

      <Input
        value={code}
        onChangeText={setCode}
        style={styles.input}
        autoCapitalize="characters"
      />

      {validationError && (
        <ThemedText
          type="defaultSemiBold"
          style={[styles.errorMessage, { color: warningColor }]}
        >
          {validationError}
        </ThemedText>
      )}

      <Modal.ModalActions>
        <LoadingButton
          onPress={() => validateCode(code)}
          isLoading={isValidating}
        >
          <ThemedText type="defaultSemiBold">Unirse</ThemedText>
        </LoadingButton>
      </Modal.ModalActions>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    minWidth: "100%",
    marginTop: 16,
  },
  errorMessage: {
    marginBottom: 16,
  },
});
