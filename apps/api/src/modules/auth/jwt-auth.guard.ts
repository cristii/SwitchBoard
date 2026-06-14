import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { verifyApiToken } from "@switchboard/shared";
import type { Request } from "express";
import type { AuthenticatedRequest } from "./auth.types";

export function extractBearerToken(
  authorization: string | string[] | undefined
): string | null {
  const header = Array.isArray(authorization) ? authorization[0] : authorization;

  if (!header) {
    return null;
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token || header.split(" ").length !== 2) {
    return null;
  }

  return token;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = extractBearerToken(
      (request as Request).headers.authorization
    );

    if (!token) {
      throw new UnauthorizedException("Missing bearer token.");
    }

    const secret = process.env.API_JWT_SECRET;

    if (!secret) {
      throw new UnauthorizedException("API auth is not configured.");
    }

    try {
      request.user = await verifyApiToken(token, secret);
      return true;
    } catch {
      throw new UnauthorizedException("Invalid bearer token.");
    }
  }
}

