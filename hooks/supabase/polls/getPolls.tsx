import { supabase } from "@/services/supabase";
import { type QueryData } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { type PollWithGame } from "./getSinglePoll";

export enum PollModality {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export type Guess = {
  id: string;
  home_team_score: number;
  away_team_score: number;
  author: string;
};

export type Poll = {
  id: string;
  game_code: string;
  author: string;
  guesses: Guess[];
  code: string;
  modality: PollModality
};

type UseGetPollsProps = {
  gameCode?: string;
  userId?: string;
};

export const useGetPolls = ({ gameCode, userId }: UseGetPollsProps) => {
  const [polls, setPolls] = useState<PollWithGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPolls = useCallback(async () => {
    setIsLoading(true);

    const getPollsQuery = supabase.from("polls").select(
      `
      id,
      game_code,
      games!polls_game_code_fkey (*),
      author,
      code,
      modality,
      guesses (
        id,
        home_team_score,
        away_team_score,
        author
      )
    `,
    );

    if (gameCode) {
      getPollsQuery.eq("game_code", gameCode);
    }

    if (userId) {
      getPollsQuery.eq("guesses.author", userId);
    }

    type Polls = QueryData<typeof getPollsQuery>;

    const { data, error } = await getPollsQuery;

    setIsLoading(false);

    if (error) {
      console.error("Error fetching polls:", error);
      throw error;
    }

    const polls: Polls = data.filter((poll) =>
      poll.guesses.some((guess) => guess.author === userId),
    );

    setPolls(polls as unknown as PollWithGame[]);

    return polls;
  }, [gameCode, userId]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  return {
    fetchPolls,
    polls,
    isLoading,
  };
};
