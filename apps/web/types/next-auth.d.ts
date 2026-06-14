import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    apiToken?: string;
    user: {
      id: string;
      email: string;
      name?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    switchboardUserId?: string;
  }
}

