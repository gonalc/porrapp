import { Modal } from "@/components/Modal";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import {
  JoinPollSteps,
  useValidateCode,
} from "@/hooks/supabase/polls/validateCode";
import { ValidateCode } from "./ValidateCode";

type JoinModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function JoinPollModal({ visible, onClose }: JoinModalProps) {
  const [code, setCode] = useState("");
  const { isValidating, validateCode, validationError, joinPollStep } =
    useValidateCode();

  const showModalContent = () => {
    switch (joinPollStep) {
      case JoinPollSteps.ENTERING_RESULT:
        return (
          <>
            <ThemedText>Entering result</ThemedText>
          </>
        );
      default:
        return (
          <ValidateCode
            code={code}
            setCode={setCode}
            validateCode={validateCode}
            isValidating={isValidating}
            validationError={validationError}
          />
        );
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      {showModalContent()}
    </Modal>
  );
}
