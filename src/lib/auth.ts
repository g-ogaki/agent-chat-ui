import { jwtVerify, SignJWT } from "jose";

interface SessionPayload {
  userId: string;
  role: string;
  expiresAt: Date;
}

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // Token expires in 1 hour
    .sign(key);
}

export async function decrypt(input: string | undefined): Promise<any> {
  if (!input) return null;
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
