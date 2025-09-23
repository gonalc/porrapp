import { supabase } from "@/services/supabase";
import { useCallback, useEffect, useState } from "react";
import { type Poll } from "./getPolls";
import { type Game } from "@/hooks/supabase/games/getGames";

export type PollWithGame = Poll & {
  games: Game
}

export const useGetSinglePoll = (pollId: string) => {
  const [poll, setPoll] = useState<PollWithGame | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPoll = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("polls")
      .select(`
        game_code,
        author,
        id,
        code,
        games!polls_game_code_fkey (*),
        guesses (
          id,
          author,
          poll_id,
          game_code,
          home_team_score,
          away_team_score
        )
      `)
      .eq("id", pollId)
      .single();

    if (error) {
      console.error('Error getting poll:', error);
      setIsLoading(false);
      return;
    }

    console.log('Poll fetched:', JSON.stringify(data, null, 2));

    setPoll(data as unknown as PollWithGame);

    setIsLoading(false);

    return data;
  }, [pollId]);

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  return {
    fetchPoll,
    poll,
    isLoading,
  };
};
