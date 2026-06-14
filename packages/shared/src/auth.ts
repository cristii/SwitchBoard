import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";

const textEncoder = new TextEncoder();

export const API_JWT_ISSUER = "switchboard-web";
export const API_JWT_AUDIENCE = "switchboard-api";
export const API_JWT_TTL_SECONDS = 15 * 60;

export const authenticatedUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  name: z.string().nullable().optional()
});

export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>;

export const apiJwtPayloadSchema = z
  .object({
    sub: z.string().min(1),
    email: z.string().email(),
    name: z.string().nullable().optional(),
    iss: z.literal(API_JWT_ISSUER),
    aud: z.union([z.literal(API_JWT_AUDIENCE), z.array(z.literal(API_JWT_AUDIENCE))])
  })
  .passthrough();

export interface ApiTokenOptions {
  user: AuthenticatedUser;
  secret: string;
  expiresInSeconds?: number;
  now?: Date;
}

function getSecretKey(secret: string): Uint8Array {
  if (!secret.trim()) {
    throw new Error("API JWT secret is required.");
  }

  return textEncoder.encode(secret);
}

export async function createApiToken({
  user,
  secret,
  expiresInSeconds = API_JWT_TTL_SECONDS,
  now = new Date()
}: ApiTokenOptions): Promise<string> {
  const parsedUser = authenticatedUserSchema.parse(user);
  const issuedAt = Math.floor(now.getTime() / 1000);

  return new SignJWT({
    email: parsedUser.email,
    name: parsedUser.name ?? null
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(API_JWT_ISSUER)
    .setAudience(API_JWT_AUDIENCE)
    .setSubject(parsedUser.id)
    .setIssuedAt(issuedAt)
    .setExpirationTime(issuedAt + expiresInSeconds)
    .sign(getSecretKey(secret));
}

export async function verifyApiToken(
  token: string,
  secret: string
): Promise<AuthenticatedUser> {
  const { payload } = await jwtVerify(token, getSecretKey(secret), {
    issuer: API_JWT_ISSUER,
    audience: API_JWT_AUDIENCE
  });
  const parsedPayload = apiJwtPayloadSchema.parse(payload);

  return {
    id: parsedPayload.sub,
    email: parsedPayload.email,
    name: parsedPayload.name ?? null
  };
}

export function authHeader(token: string): string {
  return `Bearer ${token}`;
}

