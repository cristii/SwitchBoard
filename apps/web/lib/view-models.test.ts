import { ActivityType, ChannelKind, Difficulty, ProviderKind } from "@switchboard/shared";
import { describe, expect, it } from "vitest";
import {
  activityMeta,
  difficultyText,
  difficultyVariant,
  platformIcon,
  platformName,
  providerKeyRows,
  providerSidebarState,
  relativeTime,
  scoreColor
} from "./view-models";

describe("web view models", () => {
  it("maps enum values to design labels and badge variants", () => {
    expect(platformName(ChannelKind.INSTAGRAM)).toBe("Instagram DM");
    expect(platformIcon(ChannelKind.TELEGRAM)).toBe("telegram");
    expect(difficultyText(Difficulty.INTERMEDIATE)).toBe("Intermediate");
    expect(difficultyVariant(Difficulty.ADVANCED)).toBe("violet");
  });

  it("maps score colors to validation bands", () => {
    expect(scoreColor(null)).toBe("#54605C");
    expect(scoreColor(68)).toBe("#92400E");
    expect(scoreColor(82)).toBe("#B45309");
    expect(scoreColor(95)).toBe("#3F7A4E");
  });

  it("formats relative timestamps in the design style", () => {
    const now = new Date("2026-06-14T12:00:00.000Z");

    expect(relativeTime("2026-06-14T11:58:00.000Z", now)).toBe("2m ago");
    expect(relativeTime("2026-06-14T10:00:00.000Z", now)).toBe("2h ago");
    expect(relativeTime("2026-06-13T10:00:00.000Z", now)).toBe("yesterday");
    expect(relativeTime("2026-06-10T10:00:00.000Z", now)).toBe("4d ago");
  });

  it("keeps activity metadata aligned with the design", () => {
    expect(activityMeta[ActivityType.VALIDATE]).toMatchObject({
      kind: "Validated",
      color: "#3F7A4E"
    });
  });

  it("maps provider key metadata to the settings rows without exposing secrets", () => {
    const rows = providerKeyRows(
      [
        {
          provider: ProviderKind.OPENAI,
          last4: "3456",
          createdAt: "2026-06-15T08:00:00.000Z"
        }
      ],
      ProviderKind.OPENAI
    );
    const openAi = rows.find((row) => row.provider === ProviderKind.OPENAI);
    const anthropic = rows.find((row) => row.provider === ProviderKind.ANTHROPIC);

    expect(openAi).toMatchObject({
      name: "OpenAI",
      placeholder: "Saved key ending in 3456",
      saved: true,
      buttonLabel: "Saved \u2713"
    });
    expect(anthropic).toMatchObject({
      name: "Anthropic",
      saved: false,
      buttonLabel: "Save"
    });
    expect(JSON.stringify(rows)).not.toContain("sk-demo-secret");
  });

  it("shows the first configured provider in the sidebar state", () => {
    expect(providerSidebarState([])).toEqual({
      connected: false,
      label: "Built-in demo model"
    });
    expect(
      providerSidebarState([
        {
          provider: ProviderKind.GROQ,
          last4: "g123",
          createdAt: "2026-06-15T08:00:00.000Z"
        }
      ])
    ).toEqual({
      connected: true,
      label: "Groq \u00B7 Llama 3.x"
    });
  });
});
