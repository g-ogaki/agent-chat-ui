"use client";

import { Thread } from "@/components/thread";
import { StreamProvider } from "@/providers/Stream";
import { ThreadProvider } from "@/providers/Thread";
import { ArtifactProvider } from "@/components/thread/artifact";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/providers/Session";
import { Suspense } from "react";
import { SessionPayload } from "@/lib/auth";

export function ChatInterface({ session }: { session: SessionPayload | null }) {
  return (
    <Suspense fallback={<div>Loading (layout)...</div>}>
      <Toaster />
      <SessionProvider session={session}>
        <ThreadProvider>
          <StreamProvider>
            <ArtifactProvider>
              <Thread />
            </ArtifactProvider>
          </StreamProvider>
        </ThreadProvider>
      </SessionProvider>
    </Suspense>
  );
}
