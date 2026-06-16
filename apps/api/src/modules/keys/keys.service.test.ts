import { ActivityType, ProviderKind } from "@switchboard/shared";
import { describe, expect, it, vi } from "vitest";
import type { PrismaService } from "../prisma/prisma.service";
import { EncryptionService } from "./encryption.service";
import { KeysService } from "./keys.service";

function makePrisma() {
  return {
    providerKey: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      upsert: vi.fn(),
      deleteMany: vi.fn()
    },
    activity: {
      create: vi.fn()
    }
  };
}

function makeService(prisma: ReturnType<typeof makePrisma>) {
  return new KeysService(
    prisma as unknown as PrismaService,
    new EncryptionService(Buffer.alloc(32, 3))
  );
}

describe("KeysService", () => {
  it("lists provider key metadata without secret material", async () => {
    const prisma = makePrisma();
    prisma.providerKey.findMany.mockResolvedValue([
      {
        provider: ProviderKind.OPENAI,
        last4: "3456",
        createdAt: new Date("2026-06-15T08:00:00.000Z")
      }
    ]);

    const response = await makeService(prisma).listForUser("user_1");

    expect(prisma.providerKey.findMany).toHaveBeenCalledWith({
      where: { userId: "user_1" },
      orderBy: { createdAt: "desc" },
      select: {
        provider: true,
        last4: true,
        createdAt: true
      }
    });
    expect(response).toEqual({
      keys: [
        {
          provider: ProviderKind.OPENAI,
          last4: "3456",
          createdAt: "2026-06-15T08:00:00.000Z"
        }
      ]
    });
    expect(JSON.stringify(response)).not.toContain("ciphertext");
  });

  it("encrypts and scopes a new key before saving it", async () => {
    const prisma = makePrisma();
    prisma.providerKey.findUnique.mockResolvedValue(null);
    prisma.providerKey.upsert.mockResolvedValue({
      provider: ProviderKind.ANTHROPIC,
      last4: "7890",
      createdAt: new Date("2026-06-15T08:10:00.000Z")
    });

    const response = await makeService(prisma).upsertForUser(
      "user_1",
      ProviderKind.ANTHROPIC,
      "sk-ant-secret-7890"
    );
    const upsertArgs = prisma.providerKey.upsert.mock.calls[0]?.[0];

    expect(upsertArgs).toMatchObject({
      where: { userId_provider: { userId: "user_1", provider: ProviderKind.ANTHROPIC } },
      update: { last4: "7890" },
      create: {
        userId: "user_1",
        provider: ProviderKind.ANTHROPIC,
        last4: "7890"
      },
      select: {
        provider: true,
        last4: true,
        createdAt: true
      }
    });
    expect(upsertArgs?.create.ciphertext).toEqual(expect.any(String));
    expect(upsertArgs?.create.ciphertext).not.toContain("sk-ant-secret-7890");
    expect(upsertArgs?.create).not.toHaveProperty("key");
    expect(JSON.stringify(response)).not.toContain("sk-ant-secret-7890");
    expect(JSON.stringify(response)).not.toContain("ciphertext");
    expect(prisma.activity.create).toHaveBeenCalledWith({
      data: {
        userId: "user_1",
        type: ActivityType.KEY,
        title: "Connected a model",
        detail: "Added Anthropic API key"
      }
    });
  });

  it("records updates distinctly from first saves", async () => {
    const prisma = makePrisma();
    prisma.providerKey.findUnique.mockResolvedValue({ id: "key_1" });
    prisma.providerKey.upsert.mockResolvedValue({
      provider: ProviderKind.OPENAI,
      last4: "2222",
      createdAt: new Date("2026-06-15T08:15:00.000Z")
    });

    await makeService(prisma).upsertForUser(
      "user_2",
      ProviderKind.OPENAI,
      "sk-demo-updated-2222"
    );

    expect(prisma.activity.create).toHaveBeenCalledWith({
      data: {
        userId: "user_2",
        type: ActivityType.KEY,
        title: "Connected a model",
        detail: "Updated OpenAI API key"
      }
    });
  });

  it("deletes keys idempotently within the authenticated user scope", async () => {
    const prisma = makePrisma();
    prisma.providerKey.deleteMany.mockResolvedValue({ count: 1 });

    await expect(
      makeService(prisma).deleteForUser("user_1", ProviderKind.GROQ)
    ).resolves.toEqual({ ok: true });

    expect(prisma.providerKey.deleteMany).toHaveBeenCalledWith({
      where: { userId: "user_1", provider: ProviderKind.GROQ }
    });
    expect(prisma.activity.create).toHaveBeenCalledWith({
      data: {
        userId: "user_1",
        type: ActivityType.KEY,
        title: "Removed a model key",
        detail: "Removed Groq API key"
      }
    });
  });
});
