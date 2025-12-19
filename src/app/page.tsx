import { ChatInterface } from "@/components/ui/chat-interface";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import React from "react";

export default async function DemoPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  const session = await decrypt(sessionCookie?.value);
  return <ChatInterface session={session} />;
}
