import { describe, expect, it } from "vitest";
import {
  ActivityType,
  GoalKind,
  demoUser,
  fallbackScenario,
  scenarioSchema,
  seedActivity,
  seedProjects,
  starterPrompt
} from "../index";

describe("seed fixtures", () => {
  it("defines one demo user and six design projects", () => {
    expect(demoUser.email).toBe("cristi@example.com");
    expect(seedProjects).toHaveLength(6);
    expect(seedProjects.map((project) => project.name)).toEqual([
      "Bistro booking assistant",
      "SaaS onboarding helper",
      "Agency lead router",
      "Skincare product picker",
      "Order status auto-reply",
      "Community support bot"
    ]);
  });

  it("has deterministic scenario fixtures for each seeded project", () => {
    for (const project of seedProjects) {
      expect(() => scenarioSchema.parse(project.scenario)).not.toThrow();
      expect(project.scenario.objectives).toHaveLength(5);
      expect(project.systemPrompt).toContain(project.scenario.business);
    }
  });

  it("matches the design average score calculation", () => {
    const scored = seedProjects.filter((project) => project.score);
    const average = Math.round(
      scored.reduce((sum, project) => sum + (project.score ?? 0), 0) /
        scored.length
    );

    expect(average).toBe(81);
  });

  it("contains the design activity timeline types", () => {
    expect(seedActivity).toHaveLength(6);
    expect(seedActivity.map((activity) => activity.type)).toEqual([
      ActivityType.VALIDATE,
      ActivityType.TEST,
      ActivityType.VALIDATE,
      ActivityType.CREATE,
      ActivityType.EDIT,
      ActivityType.KEY
    ]);
  });

  it("builds the design fallback scenario and starter prompt", () => {
    const scenario = fallbackScenario(GoalKind.BOOKING);
    const prompt = starterPrompt(scenario, GoalKind.BOOKING);

    expect(scenario.business).toContain("The Fold");
    expect(prompt).toContain("Appointment booking");
    expect(prompt).toContain("Never invent prices");
  });
});
