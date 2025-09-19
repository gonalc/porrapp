import { PollJoiner } from "@/components/polls/PollJoiner";
import { PollList } from "@/components/polls/PollList";
import { PollsContextProvider } from "@/contexts/polls";
import { type Game } from "@/hooks/supabase/games/getGames";

type PollsProps = {
  game: Game;
};

export function Polls({ game }: PollsProps) {
  return (
    <PollsContextProvider game={game}>
      <PollJoiner />

      <PollList />
    </PollsContextProvider>
  );
}
