import { supabase } from "@/services/supabase";
import { useCallback, useEffect, useState } from "react";
import { type PollWithGame } from "./getSinglePoll";
import dayjs from "@/utils/dates";

export enum PollModality {
  PUBLIC = "public",
  PRIVATE = "private",
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
  modality: PollModality;
};

type UseGetPollsProps = {
  gameCode?: string;
  userId?: string;
  filterByModality?: PollModality;
};

export type PollWithGameAndParticipants = PollWithGame & {
  participants: number;
};

export const useGetPolls = ({
  gameCode,
  userId,
  filterByModality,
}: UseGetPollsProps) => {
  const [polls, setPolls] = useState<PollWithGameAndParticipants[]>([]);
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
      ),
      total_guesses:guesses!inner(count)
    `,
    );

    if (gameCode) {
      getPollsQuery.eq("game_code", gameCode);
    }

    if (userId) {
      getPollsQuery.eq("guesses.author", userId);
    }

    if (filterByModality) {
      getPollsQuery.eq("modality", filterByModality);
    }

    const { data, error } = await getPollsQuery;

    setIsLoading(false);

    if (error) {
      console.error("Error fetching polls:", error);
      throw error;
    }

    const polls = data
      .filter((poll) => poll.guesses.some((guess) => guess.author === userId))
      .map(({ total_guesses, ...poll }) => {
        return {
          ...poll,
          participants: total_guesses[0].count,
        } as unknown as PollWithGameAndParticipants;
      })
      .sort(
        (a, b) =>
          dayjs(b.games.datetime).unix() - dayjs(a.games.datetime).unix(),
      );

    setPolls(polls);

    return polls;
  }, [gameCode, userId, filterByModality]);

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  return {
    fetchPolls,
    polls,
    isLoading,
  };
};
