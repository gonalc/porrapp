import { useState, useEffect, useCallback } from "react";
import { type Game } from "./getGames";
import { supabase } from "@/services/supabase";

export const useGetSingleGame = (gameId: string) => {
  const [game, setGame] = useState<Game | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGame = useCallback(async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("id", gameId)
      .single();

    if (error) {
      console.error("[get single game hook] Error getting game: ", error);
    } else {
      setGame(data);
    }
    setRefreshing(false);
  }, [gameId]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  return { game, refreshing, fetchGame };
};
