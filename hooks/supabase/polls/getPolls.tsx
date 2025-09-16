import { supabase } from "@/services/supabase";
import { type QueryData } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

type Guess = {
  id: string;
  home_team_score: number;
  away_team_score: number;
  author: string;
};

type Poll = {
  id: string;
  game_code: string;
  author: string;
  guesses: Guess[];
};

export const useGetPolls = (gameCode: string) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPolls = useCallback(async () => {
    setIsLoading(true);

    const getPollsQuery = supabase
      .from("polls")
      .select(
        `
      id,
      game_code,
      author,
      guesses (
        id,
        home_team_score,
        away_team_score,
        author
      )
    `,
      )
      .eq("game_code", gameCode);

    type Polls = QueryData<typeof getPollsQuery>;

    const { data, error } = await getPollsQuery;

    console.log("POLLS: ", JSON.stringify(data, null, 2));

    setIsLoading(false);

    if (error) {
      console.error("Error fetching polls:", error);
      throw error;
    }

    const polls: Polls = data;

    setPolls(polls);

    return polls;
  }, [gameCode]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  return {
    fetchPolls,
    polls,
    isLoading,
  };
};
