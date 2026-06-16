import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const KEY_BYTES = 32;
const IV_BYTES = 12;

export type EncryptedSecret = {
  ciphertext: string;
  iv: string;
  authTag: string;
};

export function loadMasterEncryptionKey(
  value = process.env.MASTER_ENCRYPTION_KEY
): Buffer {
  if (!value) {
    throw new Error("MASTER_ENCRYPTION_KEY is required.");
  }

  const key = Buffer.from(value, "base64");

  if (key.length !== KEY_BYTES) {
    throw new Error("MASTER_ENCRYPTION_KEY must decode to 32 bytes.");
  }

  return key;
}

export class EncryptionService {
  constructor(private readonly masterKey: Buffer) {}

  static fromEnv() {
    return new EncryptionService(loadMasterEncryptionKey());
  }

  encrypt(plaintext: string): EncryptedSecret {
    const iv = randomBytes(IV_BYTES);
    const cipher = createCipheriv("aes-256-gcm", this.masterKey, iv);
    const ciphertext = Buffer.concat([
      cipher.update(plaintext, "utf8"),
      cipher.final()
    ]);

    return {
      ciphertext: ciphertext.toString("base64"),
      iv: iv.toString("base64"),
      authTag: cipher.getAuthTag().toString("base64")
    };
  }

  decrypt(secret: EncryptedSecret): string {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      this.masterKey,
      Buffer.from(secret.iv, "base64")
    );
    decipher.setAuthTag(Buffer.from(secret.authTag, "base64"));

    return Buffer.concat([
      decipher.update(Buffer.from(secret.ciphertext, "base64")),
      decipher.final()
    ]).toString("utf8");
  }
}
