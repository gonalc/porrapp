import { LoadingButton } from "@/components/LoadingButton";
import { Modal } from "@/components/Modal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";

type JoinedPollProps = {
  onClose: () => void;
};

export function JoinedPoll({ onClose }: JoinedPollProps) {
  const accentColor = useThemeColor({}, "accent");

  return (
    <ThemedView>
      <ThemedText type="subtitle">¡Te has unido a la porra!</ThemedText>

      <ThemedView style={styles.iconContainer}>
        <IconSymbol name="checkmark" color={accentColor} size={56} />
      </ThemedView>

      <Modal.ModalActions>
        <LoadingButton isLoading={false} onPress={onClose}>
          <ThemedText type="defaultSemiBold">Cerrar</ThemedText>
        </LoadingButton>
      </Modal.ModalActions>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
});
