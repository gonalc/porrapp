import { supabase } from "@/services/supabase";
import { type AuthSession } from "@supabase/supabase-js";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type Session = {
  isLoading: boolean;
  data: AuthSession | null;
  setSession: Dispatch<SetStateAction<AuthSession | null>>;
};

const SessionContext = createContext<Session | null>(null);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session: ", error);
      } else {
        setSession(data.session);
      }

      setLoading(false);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{ isLoading: loading, data: session, setSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return session;
};
