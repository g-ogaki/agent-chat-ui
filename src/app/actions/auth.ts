"use server";

import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nextUrl = formData.get("next") as string;

  // 1. Validate credentials (Replace with real DB check)
  if (email !== "user@example.com" || password !== "password123") {
    return { error: "Invalid credentials" };
  }

  // 2. Generate JWT
  // Note: We set expiration here to sync with cookie maxAge
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  const session = await encrypt({ userId: "123", email, expires });

  // 3. Set the cookie
  // httpOnly: true -> JavaScript cannot access it (Security agains XSS)
  // secure: true -> Only sent over HTTPS
  (await cookies()).set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  // 4. Redirect user
  redirect(nextUrl);
}

export async function logout() {
  // Destroy the session
  (await cookies()).set("session", "", { expires: new Date(0) });
  redirect("/login");
}