import { Modal } from "@/components/Modal";
import { useState } from "react";
import {
  JoinPollSteps,
  useValidateCode,
} from "@/hooks/supabase/polls/validateCode";
import { ValidateCode } from "./ValidateCode";
import { EnterResult } from "./EnterResult";
import { ThemedText } from "@/components/ThemedText";

type JoinModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function JoinPollModal({ visible, onClose }: JoinModalProps) {
  const [code, setCode] = useState("");
  const {
    isValidating,
    validateCode,
    validationError,
    joinPollStep,
    joinPoll,
  } = useValidateCode();

  const showModalContent = () => {
    switch (joinPollStep) {
      case JoinPollSteps.JOINING_POLL_CONFIRMATION:
        return (
          <>
            <ThemedText>Te uniste a la porra con éxito.</ThemedText>
          </>
        );
      case JoinPollSteps.ENTERING_RESULT:
        return <EnterResult onSubmit={joinPoll} />;
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
