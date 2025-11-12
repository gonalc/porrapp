import { type Game } from "@/hooks/supabase/games/getGames";
import dayjs from "@/utils/dates";

export function hasGameExpired(game: Game): boolean {
  const now = dayjs();
  const gameDate = dayjs(game.date);

  return gameDate.isBefore(now);
}
