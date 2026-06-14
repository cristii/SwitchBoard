import { describe, expect, it } from "vitest";
import {
  channelKindValues,
  difficultyValues,
  goalKindValues,
  templateSchema,
  templates
} from "../index";

describe("templates", () => {
  it("contains the eight starter templates from the design", () => {
    expect(templates).toHaveLength(8);
    expect(templates.map((template) => template.name)).toEqual([
      "Restaurant reservations",
      "Website lead catcher",
      "DM product finder",
      "Tier-1 support inbox",
      "Community FAQ bot",
      "n8n lead router",
      "Order status replies",
      "Internal IT helpdesk"
    ]);
  });

  it("uses unique ids and valid enum values", () => {
    const ids = new Set(templates.map((template) => template.id));

    expect(ids.size).toBe(templates.length);

    for (const template of templates) {
      expect(() => templateSchema.parse(template)).not.toThrow();
      expect(channelKindValues).toContain(template.channel);
      expect(goalKindValues).toContain(template.goal);
      expect(difficultyValues).toContain(template.difficulty);
      expect(template.tags.length).toBeGreaterThanOrEqual(1);
    }
  });
});

