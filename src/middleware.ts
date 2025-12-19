import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  if (path === "/login" || session) return NextResponse.next();

  const redirectUrl = new URL("/login", req.nextUrl);
  redirectUrl.searchParams.set("next", path);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.delete("session");

  return response;
}

// Routes Middleware should run on
export const config = {
  matcher: ["/((?!healthcheck|_next/static|_next/image|.*\\.png$).*)"],
};
