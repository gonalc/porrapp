import { Modal } from "@/components/Modal";
import { useState } from "react";
import {
  JoinPollSteps,
  useValidateCode,
} from "@/hooks/supabase/polls/validateCode";
import { ValidateCode } from "./ValidateCode";
import { EnterResult } from "./EnterResult";
import { JoinedPoll } from "./JoinedPoll";
import { type Poll } from "@/hooks/supabase/polls/getPolls";

type JoinModalProps = {
  visible: boolean;
  onClose: () => void;
  fetchPolls: () => Promise<Poll[]>;
};

export function JoinPollModal({
  visible,
  onClose,
  fetchPolls,
}: JoinModalProps) {
  const [code, setCode] = useState("");
  const {
    isValidating,
    validateCode,
    validationError,
    joinPollStep,
    joinPoll,
    isJoiningPoll,
  } = useValidateCode();

  const showModalContent = () => {
    switch (joinPollStep) {
      case JoinPollSteps.JOINING_POLL_CONFIRMATION:
        return <JoinedPoll onClose={onClose} />;
      case JoinPollSteps.ENTERING_RESULT:
        return (
          <EnterResult
            onSubmit={async (result) => {
              await joinPoll(result);
              await fetchPolls();
            }}
            isLoading={isJoiningPoll}
          />
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
