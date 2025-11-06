import { supabase } from "@/services/supabase";
import { cacheService } from "@/services/cache";
import dayjs from "@/utils/dates";
import { useCallback, useEffect, useState } from "react";
import { groupBy } from "@/utils/group-by";

type AlternateNames = {
  esES: string;
  enEN: string;
  itIT?: string;
  ptBR?: string;
};

type TeamScore = {
  totalScore: string;
  subScore: string;
};

type Winner = {
  id: string;
  name: string;
};

type Period = {
  id: number;
  name: string;
  alternateNames: AlternateNames;
  startTime?: string | null;
};

type Score = {
  homeTeam: TeamScore;
  awayTeam: TeamScore;
  winner: Winner;
  period: Period;
};

export type Team = {
  id: string;
  abbName: string;
  fullName: string;
  commonName: string;
  alternateCommonNames: {
    esES: string;
    enEN: string;
    itIT: string;
    ptBR: string;
  };
  country: string;
  countryName: string;
  alternateCountryNames: {
    esES: string;
    enEN: string;
  };
  imageUrlSizes: {
    XS: string;
    S: string;
    M: string;
    L: string;
  };
  imageUrl: string;
  images: {
    urlLogo: string[];
    urlFlag: string[];
  };
};

export type Game = {
  id: string;
  code: string;
  date: string;
  datetime: string;
  tournament_name: string;
  location: string;
  home_team: Team;
  away_team: Team;
  match_day: string;
  season: string;
  status: 'Finalizado' | 'Sin comenzar' | 'En juego' | (string & {});
  score: Score;
};

const CACHE_KEY = "games";

export const useGetGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGames = useCallback(async () => {
    setRefreshing(true);

    const cachedGames = cacheService.get<Game[]>(CACHE_KEY);

    if (cachedGames) {
      console.log('cache hit')
      setGames(cachedGames);
      setRefreshing(false);
      return;
    }

    const yesterday = dayjs().subtract(1, "day").toISOString();

    const { data, error } = await supabase
      .from("games")
      .select("*")
      .filter("datetime", "gte", yesterday)
      .not("datetime", "is", null)
      .order("datetime", { ascending: true });

    if (error) {
      console.error("[getGames hook] Error getting games: ", error);
    } else {
      const gamesGroupedByTournament = groupBy(data, 'tournament_name');
      setGames(Object.values(gamesGroupedByTournament).flat());
      cacheService.set(CACHE_KEY, data);
    }
    setRefreshing(false);
  }, []);

  const invalidateCache = useCallback(() => {
    cacheService.remove(CACHE_KEY);
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return { games, refreshing, fetchGames, invalidateCache };
};
