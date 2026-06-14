import { GoalKind, goalDetails, type GoalKind as GoalKindType } from "./enums";

export interface ScenarioFixture {
  business: string;
  persona: string;
  situation: string;
  opener: string;
  objectives: string[];
}

export const fallbackScenariosByGoal: Record<GoalKindType, ScenarioFixture> = {
  [GoalKind.LEAD]: {
    business: "Northbeam Studio - a 6-person web design agency",
    persona:
      "Dana, a cafe owner who needs a new site but is vague on budget and timeline.",
    situation: "She DMs after hours asking roughly what a project costs.",
    opener: "Hey, do you build sites for cafes? Roughly what would that run me?",
    objectives: [
      "Open with a warm, on-brand greeting",
      "Ask at least two qualifying questions",
      "Surface a budget or timeline",
      "Capture a name and one contact detail",
      "Propose a clear next step"
    ]
  },
  [GoalKind.SUPPORT]: {
    business: "Cloudpost - a SaaS that schedules social posts",
    persona:
      "Marco, a frustrated user whose posts failed to publish this morning.",
    situation: "He wants to know what broke and whether it will happen again.",
    opener: "My scheduled posts didn't go out this morning. What's going on?",
    objectives: [
      "Acknowledge the problem with empathy",
      "Ask for the account or post reference",
      "Give an accurate, concise explanation",
      "Offer a human handoff if unresolved",
      "Confirm the issue is handled"
    ]
  },
  [GoalKind.BOOKING]: {
    business: "The Fold - a neighbourhood hair salon",
    persona: "Priya, who wants a cut and colour sometime this week.",
    situation: "She messages the salon page hoping to grab a slot fast.",
    opener: "Hi! Can I get a cut and colour sometime this week?",
    objectives: [
      "Greet and confirm the service wanted",
      "Offer 2-3 concrete time options",
      "Confirm the chosen slot back to her",
      "Collect a name and contact",
      "Send a clear confirmation"
    ]
  },
  [GoalKind.FAQ]: {
    business: "Trailhead Gear - an outdoor e-commerce shop",
    persona: "A shopper unsure whether a jacket is truly waterproof.",
    situation: "They ask a product question before buying.",
    opener: "Do your jackets actually work in heavy rain or just drizzle?",
    objectives: [
      "Understand the question before answering",
      "Answer in two sentences or fewer",
      "Point to a source or spec",
      "Offer a relevant follow-up",
      "Escalate if it is out of scope"
    ]
  },
  [GoalKind.ORDER]: {
    business: "Cocoa Lane - an online chocolate shop",
    persona: "A customer whose delivery is late and is getting anxious.",
    situation: "They quote an order number and want a status.",
    opener: "Where is my order? It was due yesterday - #CL-4821.",
    objectives: [
      "Ask for or read the order number",
      "State the current status clearly",
      "Give a realistic delivery window",
      "Offer to notify on updates",
      "Stay calm with the frustration"
    ]
  },
  [GoalKind.RECO]: {
    business: "Verda Skincare - a clean-beauty brand",
    persona:
      "A shopper with dry, sensitive skin who hates greasy products.",
    situation: "They want a single confident recommendation.",
    opener:
      "I want something for dry, sensitive skin but nothing greasy. Ideas?",
    objectives: [
      "Ask about the use-case or skin type",
      "Narrow with one or two follow-ups",
      "Recommend a single best-fit product",
      "Explain why in one line",
      "Invite them to the next step"
    ]
  }
};

export function fallbackScenario(goal: GoalKindType): ScenarioFixture {
  return fallbackScenariosByGoal[goal] ?? fallbackScenariosByGoal[GoalKind.LEAD];
}

export function starterPrompt(
  scenario: Pick<ScenarioFixture, "business">,
  goal: GoalKindType
): string {
  return `You are the assistant for ${scenario.business}.

Goal: ${goalDetails[goal].name}.

How to behave:
- Greet warmly and get to the point in one short message.
- Ask one question at a time; never interrogate.
- Stay accurate - if you don't know, say so and offer a human.
- Keep replies to 1-3 sentences.

Never invent prices, stock, or facts you weren't given.`;
}

