import { supabase } from "@/services/supabase";
import { useCallback, useState } from "react";
import { useSession } from "@/contexts/session";

export type Guess = {
  homeTeamScore: number;
  awayTeamScore: number;
};

export const useCreatePoll = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guess, setGuess] = useState<Guess>({
    homeTeamScore: 0,
    awayTeamScore: 0,
  });

  const userId = session?.user.id;

  const createPoll = useCallback(
    async (gameCode: string, firstGuess: Guess) => {
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
        console.log("Poll created successfully:", data);

        const { data: guessData, error: guessError } = await supabase
          .from("guesses")
          .insert({
            poll_id: data.id,
            home_team_score: firstGuess.homeTeamScore,
            away_team_score: firstGuess.awayTeamScore,
            game_code: gameCode,
          })
          .select()
          .single();

        if (guessError) {
          console.error("Error creating guess:", guessError);

          throw new Error("Failed to create guess");
        }
        console.log("Guess created successfully:", guessData);
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
