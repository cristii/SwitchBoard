import type { AuthenticatedUser } from "@switchboard/shared";
import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

