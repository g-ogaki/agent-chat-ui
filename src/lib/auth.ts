import { jwtVerify, SignJWT, JWTPayload } from "jose";

interface SessionPayload extends JWTPayload {
  username: string;
  expires: Date;
}

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(key);
}

export async function decrypt(
  input: string | undefined = "",
): Promise<SessionPayload | null> {
  if (!input) return null;

  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload; // Todo: fix type
  } catch (error) {
    console.error(error);
    return null;
  }
}
