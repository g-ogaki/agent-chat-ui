import { createContext, useContext, ReactNode } from "react";
import { SessionPayload } from "@/lib/auth";

const SessionContext = createContext<SessionPayload | null>(null);

export function SessionProvider({ children, session }: { children: ReactNode; session: SessionPayload | null }) {
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
