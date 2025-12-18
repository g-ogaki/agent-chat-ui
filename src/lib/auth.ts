import { jwtVerify, SignJWT, JWTPayload } from "jose";
import { z } from "zod";

const SessionPayloadSchema = z
  .object({
    username: z.string(),
    expires: z.coerce.date(),
  })
  .passthrough();

export type SessionPayload = z.infer<typeof SessionPayloadSchema> & JWTPayload;

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

    const parsed = SessionPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      console.error("Invalid session payload:", parsed.error);
      return null;
    }

    return parsed.data as SessionPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
