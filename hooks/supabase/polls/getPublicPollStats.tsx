import { supabase } from "@/services/supabase";
import { useCallback, useEffect, useState } from "react";

export type PublicPollStats = {
  user_id: string;
  total_submitted: number;
  total_finished: number;
  total_successful: number;
  success_rate: number;
  last_updated: string;
};

export const useGetPublicPollStats = (userId?: string) => {
  const [stats, setStats] = useState<PublicPollStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    if (!userId) {
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase
      .from("public_poll_stats")
      .select("*")
      .eq("user_id", userId)
      .single();

    setIsLoading(false);

    if (error) {
      // If no stats exist yet, return zeros
      if (error.code === "PGRST116") {
        setStats({
          user_id: userId,
          total_submitted: 0,
          total_finished: 0,
          total_successful: 0,
          success_rate: 0,
          last_updated: new Date().toISOString(),
        });
        return;
      }
      console.error("Error fetching public poll stats:", error);
      return;
    }

    setStats(data);
  }, [userId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    refetch: fetchStats,
  };
};
