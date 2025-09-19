import { supabase } from "@/services/supabase";
import { useCallback, useState } from "react";
import { type Poll } from "./getPolls";
import { useSession } from "@/contexts/session";

export enum JoinPollSteps {
  CODE_VALIDATION,
  ENTERING_RESULT,
  JOINING_POLL_CONFIRMATION,
}

export const useValidateCode = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [isJoiningPoll, setIsJoiningPoll] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [foundPoll, setFoundPoll] = useState<Poll | null>(null);
  const [joinPollStep, setJoinPollStep] = useState<JoinPollSteps>(
    JoinPollSteps.CODE_VALIDATION,
  );
  const { data: session } = useSession();

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

      setFoundPoll(data);
      setJoinPollStep(JoinPollSteps.ENTERING_RESULT);
      return data;
    } catch (error) {
      console.error("Error validating code: ", error);
      setValidationError("El código es inválido");
    } finally {
      setIsValidating(false);
    }
  }, []);

  const joinPoll = useCallback(async ({
    homeScore,
    awayScore,
  }: {
    homeScore: number;
    awayScore: number;
  }) => {
    if (!foundPoll || !session) return Promise.resolve();

    setValidationError(null);
    setIsJoiningPoll(true);

    try {
      const { error } = await supabase.from("guesses").insert({
        poll_id: foundPoll.id,
        home_team_score: homeScore,
        away_team_score: awayScore,
        game_code: foundPoll.game_code,
        author: session.user.id,
      });

      if (error) {
        console.error("Error joining poll: ", error);
        setValidationError("Hubo un error al unirse a la porra.");

        return Promise.resolve();
      }

      setJoinPollStep(JoinPollSteps.JOINING_POLL_CONFIRMATION);
    } catch (error) {
      console.error("Error joining poll: ", error);
      setValidationError("Hubo un error al unirse a la porra.");
    } finally {
      setIsJoiningPoll(false);
    }
  }, [foundPoll, session]);

  return {
    validateCode,
    isValidating,
    validationError,
    joinPollStep,
    joinPoll,
    isJoiningPoll,
  };
};
