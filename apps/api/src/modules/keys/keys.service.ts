import { Injectable } from "@nestjs/common";
import {
  ActivityType,
  providerDetails,
  type ProviderKeyDeleteResponse,
  type ProviderKeySaveResponse,
  type ProviderKeySummary,
  type ProviderKeysListResponse,
  type ProviderKind
} from "@switchboard/shared";
import { PrismaService } from "../prisma/prisma.service";
import { EncryptionService } from "./encryption.service";

type ProviderKeyRecord = {
  provider: ProviderKind;
  last4: string;
  createdAt: Date;
};

function summarizeProviderKey(record: ProviderKeyRecord): ProviderKeySummary {
  return {
    provider: record.provider,
    last4: record.last4,
    createdAt: record.createdAt.toISOString()
  };
}

@Injectable()
export class KeysService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: EncryptionService
  ) {}

  async listForUser(userId: string): Promise<ProviderKeysListResponse> {
    const keys = await this.prisma.providerKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        provider: true,
        last4: true,
        createdAt: true
      }
    });

    return {
      keys: keys.map((key) => summarizeProviderKey(key as ProviderKeyRecord))
    };
  }

  async upsertForUser(
    userId: string,
    provider: ProviderKind,
    plaintextKey: string
  ): Promise<ProviderKeySaveResponse> {
    const where = { userId_provider: { userId, provider } };
    const existing = await this.prisma.providerKey.findUnique({
      where,
      select: { id: true }
    });
    const encrypted = this.encryption.encrypt(plaintextKey);
    const saved = await this.prisma.providerKey.upsert({
      where,
      update: {
        ciphertext: encrypted.ciphertext,
        iv: encrypted.iv,
        authTag: encrypted.authTag,
        last4: plaintextKey.slice(-4)
      },
      create: {
        userId,
        provider,
        ciphertext: encrypted.ciphertext,
        iv: encrypted.iv,
        authTag: encrypted.authTag,
        last4: plaintextKey.slice(-4)
      },
      select: {
        provider: true,
        last4: true,
        createdAt: true
      }
    });

    await this.prisma.activity.create({
      data: {
        userId,
        type: ActivityType.KEY,
        title: "Connected a model",
        detail: `${existing ? "Updated" : "Added"} ${providerDetails[provider].name} API key`
      }
    });

    return { key: summarizeProviderKey(saved as ProviderKeyRecord) };
  }

  async deleteForUser(
    userId: string,
    provider: ProviderKind
  ): Promise<ProviderKeyDeleteResponse> {
    const result = await this.prisma.providerKey.deleteMany({
      where: { userId, provider }
    });

    if (result.count > 0) {
      await this.prisma.activity.create({
        data: {
          userId,
          type: ActivityType.KEY,
          title: "Removed a model key",
          detail: `Removed ${providerDetails[provider].name} API key`
        }
      });
    }

    return { ok: true };
  }
}
