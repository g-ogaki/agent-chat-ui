"use client";

import { createContext, useContext, ReactNode } from "react";

export interface User {
  username: string;
}

const UserContext = createContext<User | null>(null);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  // It's okay if context is null (not logged in), but usually we enforce auth.
  // For now, return standard context.
  return context;
}
