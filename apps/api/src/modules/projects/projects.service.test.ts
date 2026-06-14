import { describe, expect, it } from "vitest";
import { computeProjectStats } from "./projects.service";

describe("computeProjectStats", () => {
  it("computes count, scored average, and distinct channels", () => {
    expect(
      computeProjectStats([
        { score: 82, channel: "WHATSAPP" },
        { score: 95, channel: "WEBCHAT" },
        { score: 68, channel: "N8N" },
        { score: 74, channel: "INSTAGRAM" },
        { score: 88, channel: "EMAIL" },
        { score: null, channel: "TELEGRAM" }
      ])
    ).toEqual({
      projectCount: 6,
      averageScore: 81,
      channelsPractised: 6
    });
  });

  it("returns zero average with only draft projects", () => {
    expect(computeProjectStats([{ score: null, channel: "TELEGRAM" }])).toEqual({
      projectCount: 1,
      averageScore: 0,
      channelsPractised: 1
    });
  });
});

