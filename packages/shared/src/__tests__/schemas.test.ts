import { describe, expect, it } from "vitest";
import {
  ChannelKind,
  Difficulty,
  GoalKind,
  ProviderKind,
  createProjectSchema,
  gradeTranscriptSchema,
  providerKeyParamSchema,
  providerKeySaveResponseSchema,
  providerKeyUpsertSchema,
  updateProjectSchema,
  webhookParamSchema
} from "../index";

describe("shared zod schemas", () => {
  it("accepts a valid project creation request", () => {
    expect(
      createProjectSchema.parse({
        channel: ChannelKind.TELEGRAM,
        goal: GoalKind.FAQ,
        difficulty: Difficulty.BEGINNER,
        templateId: "t5"
      })
    ).toEqual({
      channel: ChannelKind.TELEGRAM,
      goal: GoalKind.FAQ,
      difficulty: Difficulty.BEGINNER,
      templateId: "t5"
    });
  });

  it("rejects unknown project creation fields", () => {
    expect(() =>
      createProjectSchema.parse({
        channel: ChannelKind.TELEGRAM,
        goal: GoalKind.FAQ,
        difficulty: Difficulty.BEGINNER,
        apiKey: "not allowed"
      })
    ).toThrow();
  });

  it("clamps project update input to UI temperature range", () => {
    expect(updateProjectSchema.parse({ temperature: 100 })).toEqual({
      temperature: 100
    });
    expect(() => updateProjectSchema.parse({ temperature: -1 })).toThrow();
    expect(() => updateProjectSchema.parse({ temperature: 101 })).toThrow();
  });

  it("requires at least one update field", () => {
    expect(() => updateProjectSchema.parse({})).toThrow();
  });

  it("validates provider key input without exposing provider metadata", () => {
    expect(providerKeyUpsertSchema.parse({ key: "sk-demo-123456" })).toEqual({
      key: "sk-demo-123456"
    });
    expect(() => providerKeyUpsertSchema.parse({ key: "short" })).toThrow();
    expect(() =>
      providerKeyUpsertSchema.parse({ key: "sk-demo-123456", provider: ProviderKind.OPENAI })
    ).toThrow();
  });

  it("validates provider key params and metadata-only responses", () => {
    expect(providerKeyParamSchema.parse({ provider: ProviderKind.ANTHROPIC })).toEqual({
      provider: ProviderKind.ANTHROPIC
    });
    expect(() => providerKeyParamSchema.parse({ provider: "anthropic" })).toThrow();

    expect(
      providerKeySaveResponseSchema.parse({
        key: {
          provider: ProviderKind.OPENAI,
          last4: "3456",
          createdAt: "2026-06-15T07:30:00.000Z"
        }
      })
    ).toEqual({
      key: {
        provider: ProviderKind.OPENAI,
        last4: "3456",
        createdAt: "2026-06-15T07:30:00.000Z"
      }
    });
    expect(() =>
      providerKeySaveResponseSchema.parse({
        key: {
          provider: ProviderKind.OPENAI,
          last4: "3456",
          ciphertext: "not allowed",
          createdAt: "2026-06-15T07:30:00.000Z"
        }
      })
    ).toThrow();
  });

  it("validates transcript grading output shape", () => {
    expect(
      gradeTranscriptSchema.parse({
        results: [
          {
            objective: "Ask for the order number",
            met: true,
            note: "The bot asked immediately."
          }
        ]
      })
    ).toMatchObject({ results: [{ met: true }] });
  });

  it("validates webhook params with real channel enum values", () => {
    expect(
      webhookParamSchema.parse({
        channel: ChannelKind.TELEGRAM,
        token: "1234567890abcdef"
      })
    ).toEqual({
      channel: ChannelKind.TELEGRAM,
      token: "1234567890abcdef"
    });
  });
});
