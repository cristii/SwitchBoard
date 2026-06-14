import { PrismaClient } from "@prisma/client";
import { createApiToken } from "@switchboard/shared";
import type { NextAuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

function oauthProviders() {
  const githubClientId = process.env.GITHUB_CLIENT_ID;
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!githubClientId || !githubClientSecret) {
    return [];
  }

  return [
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret
    })
  ];
}

async function upsertUser(user: Pick<User, "email" | "name">) {
  if (!user.email) {
    return null;
  }

  return prisma.user.upsert({
    where: { email: user.email },
    update: { name: user.name ?? null },
    create: {
      email: user.email,
      name: user.name ?? null
    },
    select: {
      id: true,
      email: true,
      name: true
    }
  });
}

export const authOptions: NextAuthOptions = {
  providers: oauthProviders(),
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user }) {
      return Boolean(await upsertUser(user));
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await upsertUser(user);

        if (dbUser) {
          token.switchboardUserId = dbUser.id;
          token.email = dbUser.email;
          token.name = dbUser.name;
        }
      }

      return token;
    },
    async session({ session, token }) {
      const id = token.switchboardUserId;
      const email = token.email;

      if (typeof id === "string" && typeof email === "string") {
        const name = typeof token.name === "string" ? token.name : null;
        const apiToken = await createApiToken({
          user: { id, email, name },
          secret: requireEnv("API_JWT_SECRET")
        });

        session.user = { id, email, name };
        session.apiToken = apiToken;
      }

      return session;
    }
  }
};

