import { type MatchResult } from "@/components/MatchResultModal";
import { type Game } from "@/hooks/supabase/games/getGames";
import {
  CreatePollStep,
  useCreatePoll,
} from "@/hooks/supabase/polls/createPoll";
import { Poll, useGetPolls } from "@/hooks/supabase/polls/getPolls";
import { createContext, type PropsWithChildren, useContext } from "react";
import { useSession } from "./session";

type PollsContextType = {
  polls: Poll[];
  fetchPolls: () => Promise<Poll[]>;
  onCreatePoll: (result: MatchResult) => Promise<void>;
  createdPoll: Poll | null;
  startPollCreation: () => void;
  creationStep: CreatePollStep;
  isFetchingPolls: boolean;
  isCreatingPoll: boolean;
  closeModal: () => void;
  game: Game;
};

type PollsProviderProps = PropsWithChildren<{
  game: Game;
}>;

const PollsContext = createContext<PollsContextType | null>(null);

export const PollsContextProvider = ({
  children,
  game,
}: PollsProviderProps) => {
  const { data: session } = useSession();

  const {
    isLoading: isCreatingPoll,
    startPollCreation,
    closeModal,
    createPoll,
    poll: createdPoll,
    creationStep,
  } = useCreatePoll();
  const {
    polls,
    isLoading: isFetchingPolls,
    fetchPolls,
  } = useGetPolls(game.code, session?.user?.id || '');

  const onCreatePoll = async (result: MatchResult) => {
    await createPoll(game.code, result);
    await fetchPolls();
  };

  return (
    <PollsContext.Provider
      value={{
        polls,
        fetchPolls,
        onCreatePoll,
        startPollCreation,
        creationStep,
        isFetchingPolls,
        isCreatingPoll,
        createdPoll,
        closeModal,
        game,
      }}
    >
      {children}
    </PollsContext.Provider>
  );
};

export const usePollsContext = () => {
  const context = useContext(PollsContext);
  if (!context) {
    throw new Error(
      "usePollsContext must be used within a PollsContextProvider",
    );
  }
  return context;
};
