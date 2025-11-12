import { type MatchResult } from "@/components/MatchResultModal";
import { type Game } from "@/hooks/supabase/games/getGames";
import {
  CreatePollStep,
  useCreatePoll,
} from "@/hooks/supabase/polls/createPoll";
import { type Poll, PollModality, useGetPolls } from "@/hooks/supabase/polls/getPolls";
import { createContext, type PropsWithChildren, useContext } from "react";
import { useSession } from "./session";
import { type PollWithGame } from "@/hooks/supabase/polls/getSinglePoll";

export type CreationPoll = MatchResult & {
  isPublic: boolean;
}

type PollsContextType = {
  polls: PollWithGame[];
  fetchPolls: () => Promise<Poll[]>;
  onCreatePoll: (result: CreationPoll) => Promise<void>;
  createdPoll: PollWithGame | null;
  startPollCreation: () => void;
  creationStep: CreatePollStep;
  isFetchingPolls: boolean;
  isCreatingPoll: boolean;
  closeModal: () => void;
  game: Game;
  publicPoll: PollWithGame | null;
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
  } = useGetPolls({
    userId: session?.user.id,
    gameCode: game.code,
  });

  const onCreatePoll = async (payload: CreationPoll) => {
    await createPoll(game.code, payload);
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
        publicPoll: polls.find(p => p.modality === PollModality.PUBLIC) ?? null,
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
