import { useState, useEffect, useCallback } from "react";
import { type Game } from "./getGames";
import { supabase } from "@/services/supabase";
import { cacheService } from "@/services/cache";
import {
  DEFAULT_CACHE_TIME_IN_MINUTES,
  LIVE_GAME_CACHE_TIME_IN_MINUTES,
} from "@/constants/cache";

const CACHE_KEY = "game";

export const useGetSingleGame = (gameId: string) => {
  const [game, setGame] = useState<Game | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGame = useCallback(async () => {
    setRefreshing(true);

    const cachedGame = cacheService.get<Game>(`${CACHE_KEY}-${gameId}`);

    if (cachedGame) {
      setGame(cachedGame);
      setRefreshing(false);
      return;
    }

    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("code", gameId)
      .single();

    if (error) {
      console.error("[get single game hook] Error getting game: ", error);
    } else {
      setGame(data);
      const duration =
        data.status === "En juego"
          ? LIVE_GAME_CACHE_TIME_IN_MINUTES
          : DEFAULT_CACHE_TIME_IN_MINUTES;
      cacheService.set(`${CACHE_KEY}-${gameId}`, data, duration);
    }
    setRefreshing(false);
  }, [gameId]);

  const invalidateCache = useCallback(() => {
    cacheService.remove(`${CACHE_KEY}-${gameId}`);
  }, [gameId]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  return { game, refreshing, fetchGame, invalidateCache };
};
