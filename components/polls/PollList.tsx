import { usePollsContext } from "@/contexts/polls";
import { PollListBase } from "./PollListBase";

export function PollList() {
  const { polls, isFetchingPolls, fetchPolls } = usePollsContext();

  return (
    <PollListBase
      polls={polls}
      isFetchingPolls={isFetchingPolls}
      fetchPolls={fetchPolls}
    />
  );
}
