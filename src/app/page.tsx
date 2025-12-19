import { ChatInterface } from "@/components/chat-interface";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function DemoPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  const session = await decrypt(sessionCookie?.value);

  if (!session?.username) {
    redirect("/login");
  }

  return <ChatInterface user={{ username: session.username }} />;
}
