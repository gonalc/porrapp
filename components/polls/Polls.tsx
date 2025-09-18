import { PollJoiner } from "@/components/PollJoiner";
import { PollList } from "@/components/polls/PollList";
import { PollsContextProvider } from "@/contexts/polls";

type PollsProps = {
  gameCode: string;
};

export function Polls({ gameCode }: PollsProps) {
  return (
    <PollsContextProvider gameCode={gameCode}>
      <PollJoiner />

      <PollList />
    </PollsContextProvider>
  );
}
