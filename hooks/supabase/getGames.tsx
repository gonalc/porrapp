import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";

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

type Team = {
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
  date: Date;
  datetime: Date;
  tournament_name: string;
  location: string;
  home_team: Team;
  away_team: Team;
  match_day: string;
  season: string;
  status: string;
  score: Score;
};

export const useGetGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .not('datetime', 'is', null)
        .order("datetime", { ascending: true });

      if (error) {
        console.error("[getGames hook] Error getting games: ", error);
      } else {
        setGames(data);
      }
    };

    fetchGames();
  }, []);

  return { games };
};
