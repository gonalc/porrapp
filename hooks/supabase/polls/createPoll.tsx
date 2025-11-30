import { supabase } from "@/services/supabase";
import { useCallback, useState } from "react";
import { useSession } from "@/contexts/session";
import { type MatchResult } from "@/components/MatchResultModal";
import { type PollWithGame } from "./getSinglePoll";
import { type CreationPoll } from "@/contexts/polls";
import { PollModality } from "./getPolls";

export enum CreatePollStep {
  MODAL_CLOSED,
  INSERT_GUESS,
  SHARE_CODE,
  PUBLIC_POLL_JOINED
}

export const useCreatePoll = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [creationStep, setCreationStep] = useState(CreatePollStep.MODAL_CLOSED);
  const [guess, setGuess] = useState<MatchResult>({
    homeScore: "0",
    awayScore: "0",
  });
  const [poll, setPoll] = useState<PollWithGame | null>(null);

  const userId = session?.user.id;

  const createPoll = useCallback(
    async (gameCode: string, firstGuess: CreationPoll) => {
      try {
        setIsLoading(true);

        let pollData;

        if (firstGuess.isPublic) {
          const { data: existingPublicPoll, error: checkError } = await supabase
            .from("polls")
            .select(`*, games(*), guesses(*)`)
            .eq("game_code", gameCode)
            .eq("modality", PollModality.PUBLIC)
            .maybeSingle();

          if (checkError) {
            console.error("Error checking for existing public poll:", checkError);
            throw new Error("Failed to check for existing public poll");
          }

          if (existingPublicPoll) {
            pollData = existingPublicPoll;
          } else {
            const { data, error } = await supabase
              .from("polls")
              .insert({
                game_code: gameCode,
                author: userId,
                modality: PollModality.PUBLIC,
              })
              .select(`*, games(*), guesses(*)`)
              .single();

            if (error) {
              console.error("Error creating public poll:", error);
              throw new Error("Failed to create poll");
            }

            pollData = data;
          }
        } else {
          const { data, error } = await supabase
            .from("polls")
            .insert({
              game_code: gameCode,
              author: userId,
              modality: PollModality.PRIVATE,
            })
            .select(`*, games(*), guesses(*)`)
            .single();

          if (error) {
            console.error("Error creating poll:", error);
            throw new Error("Failed to create poll");
          }

          pollData = data;
        }

        setPoll(pollData);

        const { error: guessError } = await supabase.from("guesses").insert({
          poll_id: pollData.id,
          home_team_score: firstGuess.homeScore,
          away_team_score: firstGuess.awayScore,
          game_code: gameCode,
          author: userId,
        });

        if (guessError) {
          throw new Error("Failed to create guess");
        }

        setCreationStep(firstGuess.isPublic ? CreatePollStep.PUBLIC_POLL_JOINED : CreatePollStep.SHARE_CODE);
      } catch (error) {
        console.error("Unexpected error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [userId],
  );

  const startPollCreation = () => {
    setCreationStep(CreatePollStep.INSERT_GUESS);
  };

  const closeModal = () => {
    setCreationStep(CreatePollStep.MODAL_CLOSED);
    setPoll(null);
    setGuess({
      homeScore: "0",
      awayScore: "0",
    });
  };

  return {
    createPoll,
    isLoading,
    startPollCreation,
    setGuess,
    guess,
    closeModal,
    poll,
    creationStep,
  };
};
