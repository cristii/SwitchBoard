import { describe, expect, it } from "vitest";
import { EncryptionService, loadMasterEncryptionKey } from "./encryption.service";

const masterKey = Buffer.alloc(32, 7);

describe("EncryptionService", () => {
  it("round-trips provider secrets with AES-256-GCM", () => {
    const service = new EncryptionService(masterKey);
    const encrypted = service.encrypt("sk-test-secret-123456");

    expect(encrypted.ciphertext).not.toContain("sk-test-secret");
    expect(service.decrypt(encrypted)).toBe("sk-test-secret-123456");
  });

  it("throws when the auth tag is tampered with", () => {
    const service = new EncryptionService(masterKey);
    const encrypted = service.encrypt("sk-test-secret-123456");
    const tamperedTag = Buffer.from(encrypted.authTag, "base64");
    tamperedTag[0] = tamperedTag[0] ^ 1;

    expect(() =>
      service.decrypt({
        ...encrypted,
        authTag: tamperedTag.toString("base64")
      })
    ).toThrow();
  });

  it("requires a base64 master key that decodes to 32 bytes", () => {
    expect(loadMasterEncryptionKey(masterKey.toString("base64"))).toHaveLength(32);
    expect(() => loadMasterEncryptionKey(Buffer.alloc(31).toString("base64"))).toThrow(
      "MASTER_ENCRYPTION_KEY must decode to 32 bytes."
    );
    expect(() => loadMasterEncryptionKey(undefined)).toThrow(
      "MASTER_ENCRYPTION_KEY is required."
    );
  });
});
