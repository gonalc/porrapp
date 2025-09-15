import { supabase } from "@/services/supabase";
import { useCallback, useState } from "react";
import { useSession } from "@/contexts/session";
import { type MatchResult } from "@/components/MatchResultModal";

export const useCreatePoll = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guess, setGuess] = useState<MatchResult>({
    homeScore: "0",
    awayScore: "0",
  });

  const userId = session?.user.id;

  const createPoll = useCallback(
    async (gameCode: string, firstGuess: MatchResult) => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("polls")
          .insert({
            game_code: gameCode,
            author: userId,
          })
          .select()
          .single();

        if (error) {
          console.error("Error creating poll:", error);

          throw new Error("Failed to create poll");
        }

        const { error: guessError } = await supabase.from("guesses").insert({
          poll_id: data.id,
          home_team_score: firstGuess.homeScore,
          away_team_score: firstGuess.awayScore,
          game_code: gameCode,
        });

        if (guessError) {
          throw new Error("Failed to create guess");
        }

        closeModal();
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    createPoll,
    isLoading,
    startPollCreation,
    setGuess,
    guess,
    isModalOpen,
    closeModal,
  };
};
