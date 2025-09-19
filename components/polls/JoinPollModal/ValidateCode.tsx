import { Input } from "@/components/Input";
import { LoadingButton } from "@/components/LoadingButton";
import { Modal } from "@/components/Modal";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";

type ValidateCodeProps = {
  code: string;
  setCode: (value: string) => void;
  validateCode: (code: string) => Promise<void>;
  isValidating: boolean;
  validationError: string | null;
};

export function ValidateCode({
  code,
  setCode,
  validateCode,
  isValidating,
  validationError,
}: ValidateCodeProps) {
  const warningColor = useThemeColor({}, "warning");

  return (
    <>
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
    </>
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
