"use client";

import { Thread } from "@/components/thread";
import { StreamProvider } from "@/providers/Stream";
import { ThreadProvider } from "@/providers/Thread";
import { ArtifactProvider } from "@/components/thread/artifact";
import { Toaster } from "@/components/ui/sonner";
import { User, UserProvider } from "@/providers/User";
import React from "react";

interface ChatInterfaceProps {
  user: User | null;
}

export function ChatInterface({ user }: ChatInterfaceProps): React.ReactNode {
  return (
    <React.Suspense fallback={<div>Loading (layout)...</div>}>
      <Toaster />
      <UserProvider user={user}>
        <ThreadProvider>
          <StreamProvider>
            <ArtifactProvider>
              <Thread />
            </ArtifactProvider>
          </StreamProvider>
        </ThreadProvider>
      </UserProvider>
    </React.Suspense>
  );
}
