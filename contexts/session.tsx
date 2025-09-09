import { isLoaded } from "expo-font";
import { createContext, useContext } from "react";

type Session = {
  isLoading: boolean;
  data: {
    user: unknown | null;
    session: string | null;
  }
}

const SessionContext = createContext<Session | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const session = {
    isLoading: true,
    data: {
      user: null,
      session: null,
    }
  };

  return (
    <SessionContext.Provider value={session}>
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
