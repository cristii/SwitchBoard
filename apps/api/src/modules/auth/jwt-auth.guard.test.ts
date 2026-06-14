import type { ExecutionContext } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { authHeader, createApiToken } from "@switchboard/shared";
import { afterEach, describe, expect, it } from "vitest";
import { extractBearerToken, JwtAuthGuard } from "./jwt-auth.guard";

const secret = "test-secret-with-enough-entropy-for-hs256";
const user = {
  id: "user_demo",
  email: "cristi@example.com",
  name: "Cristi S."
};

function mockContext(request: Record<string, unknown>): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => request
    })
  } as ExecutionContext;
}

describe("JwtAuthGuard", () => {
  afterEach(() => {
    delete process.env.API_JWT_SECRET;
  });

  it("extracts strict bearer tokens", () => {
    expect(extractBearerToken("Bearer abc")).toBe("abc");
    expect(extractBearerToken(["Bearer abc"])).toBe("abc");
    expect(extractBearerToken("Basic abc")).toBeNull();
    expect(extractBearerToken("Bearer")).toBeNull();
    expect(extractBearerToken("Bearer abc def")).toBeNull();
    expect(extractBearerToken(undefined)).toBeNull();
  });

  it("attaches the authenticated user to the request", async () => {
    process.env.API_JWT_SECRET = secret;
    const token = await createApiToken({ user, secret });
    const request = {
      headers: {
        authorization: authHeader(token)
      }
    };
    const guard = new JwtAuthGuard();

    await expect(guard.canActivate(mockContext(request))).resolves.toBe(true);
    expect(request).toMatchObject({ user });
  });

  it("rejects missing bearer tokens", async () => {
    process.env.API_JWT_SECRET = secret;
    const guard = new JwtAuthGuard();

    await expect(
      guard.canActivate(mockContext({ headers: {} }))
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it("rejects tampered bearer tokens", async () => {
    process.env.API_JWT_SECRET = secret;
    const token = await createApiToken({ user, secret });
    const request = {
      headers: {
        authorization: authHeader(`${token.slice(0, -2)}xx`)
      }
    };
    const guard = new JwtAuthGuard();

    await expect(guard.canActivate(mockContext(request))).rejects.toBeInstanceOf(
      UnauthorizedException
    );
  });

  it("rejects when API auth is not configured", async () => {
    const token = await createApiToken({ user, secret });
    const guard = new JwtAuthGuard();

    await expect(
      guard.canActivate(
        mockContext({ headers: { authorization: authHeader(token) } })
      )
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
