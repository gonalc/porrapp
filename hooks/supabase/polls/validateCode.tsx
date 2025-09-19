import { supabase } from "@/services/supabase";
import { useCallback, useState } from "react";

export enum JoinPollSteps {
  CODE_VALIDATION,
  ENTERING_RESULT,
}

export const useValidateCode = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validatedCode, setValidatedCode] = useState<string | null>(null);
  const [joinPollStep, setJoinPollStep] = useState<JoinPollSteps>(
    JoinPollSteps.CODE_VALIDATION,
  );

  const validateCode = useCallback(async (code: string) => {
    setIsValidating(true);
    setValidationError(null);

    try {
      const { data, error } = await supabase
        .from("polls")
        .select()
        .eq("code", code)
        .single();

      if (error) {
        console.error("Error validating code: ", error);
        setValidationError("El código es inválido");

        return;
      }

      setValidatedCode(code);
      setJoinPollStep(JoinPollSteps.ENTERING_RESULT);
      return data;
    } catch (error) {
      console.error("Error validating code: ", error);
      setValidationError("El código es inválido");
    } finally {
      setIsValidating(false);
    }
  }, []);

  return { validateCode, isValidating, validationError, joinPollStep };
};
