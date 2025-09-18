import {
  Modal as BaseModal,
  TouchableWithoutFeedback,
  StyleSheet,
  type ModalProps,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { type PropsWithChildren } from "react";

function ModalActions({ children }: PropsWithChildren) {
  return <ThemedView style={styles.modalActions}>{children}</ThemedView>;
}

export function Modal(props: ModalProps) {
  const { children, visible, onRequestClose } = props;

  return (
    <BaseModal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
      transparent
      {...props}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <ThemedView style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ThemedView style={styles.modalContent}>{children}</ThemedView>
          </TouchableWithoutFeedback>
        </ThemedView>
      </TouchableWithoutFeedback>
    </BaseModal>
  );
}

Modal.ModalActions = ModalActions;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 24,
    margin: 20,
    borderRadius: 12,
    minWidth: 300,
    maxWidth: 400,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
  },
});
