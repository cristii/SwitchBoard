import { describe, expect, it } from "vitest";
import {
  API_JWT_AUDIENCE,
  authHeader,
  createApiToken,
  verifyApiToken
} from "../index";

const secret = "test-secret-with-enough-entropy-for-hs256";
const user = {
  id: "user_demo",
  email: "cristi@example.com",
  name: "Cristi S."
};

describe("api auth tokens", () => {
  it("signs and verifies authenticated user claims", async () => {
    const token = await createApiToken({ user, secret });

    await expect(verifyApiToken(token, secret)).resolves.toEqual(user);
  });

  it("rejects a token signed with another secret", async () => {
    const token = await createApiToken({ user, secret });

    await expect(verifyApiToken(token, "wrong-secret")).rejects.toThrow();
  });

  it("rejects expired tokens", async () => {
    const token = await createApiToken({
      user,
      secret,
      expiresInSeconds: 1,
      now: new Date("2026-06-14T00:00:00.000Z")
    });

    await expect(verifyApiToken(token, secret)).rejects.toThrow();
  });

  it("uses a bearer header for API requests", async () => {
    const token = await createApiToken({ user, secret });

    expect(authHeader(token)).toBe(`Bearer ${token}`);
  });

  it("does not accept invalid user claims", async () => {
    await expect(
      createApiToken({
        user: { ...user, email: "not-an-email" },
        secret
      })
    ).rejects.toThrow();
  });

  it("keeps the API audience stable", () => {
    expect(API_JWT_AUDIENCE).toBe("switchboard-api");
  });
});

