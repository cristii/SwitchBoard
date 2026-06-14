import { ActivityType, ChannelKind, Difficulty, GoalKind } from "./enums";
import type {
  ActivityType as ActivityTypeValue,
  ChannelKind as ChannelKindValue,
  Difficulty as DifficultyValue,
  GoalKind as GoalKindValue
} from "./enums";
import { fallbackScenario, starterPrompt, type ScenarioFixture } from "./scenarios";

export const demoUser = {
  id: "user_demo",
  email: "cristi@example.com",
  name: "Cristi S."
} as const;

export interface SeedProject {
  id: string;
  channel: ChannelKindValue;
  goal: GoalKindValue;
  name: string;
  scenarioSummary: string;
  difficulty: DifficultyValue;
  score: number | null;
  isDraft: boolean;
  meta: string;
  scenario: ScenarioFixture;
  systemPrompt: string;
  temperature: number;
  tone: string;
}

function project(
  id: string,
  channel: ChannelKindValue,
  goal: GoalKindValue,
  name: string,
  scenarioSummary: string,
  difficulty: DifficultyValue,
  score: number | null,
  meta: string,
  isDraft = false
): SeedProject {
  const scenario = fallbackScenario(goal);
  return {
    id,
    channel,
    goal,
    name,
    scenarioSummary,
    difficulty,
    score,
    meta,
    isDraft,
    scenario,
    systemPrompt: starterPrompt(scenario, goal),
    temperature: 35,
    tone: "Warm"
  };
}

export const seedProjects: SeedProject[] = [
  project(
    "project_bistro_booking",
    ChannelKind.WHATSAPP,
    GoalKind.BOOKING,
    "Bistro booking assistant",
    'Books tables and handles "are you open?" after hours.',
    Difficulty.INTERMEDIATE,
    82,
    "edited 2h ago"
  ),
  project(
    "project_saas_onboarding",
    ChannelKind.WEBCHAT,
    GoalKind.FAQ,
    "SaaS onboarding helper",
    "Deflects setup questions for a project-tracking tool.",
    Difficulty.BEGINNER,
    95,
    "edited yesterday"
  ),
  project(
    "project_agency_lead_router",
    ChannelKind.N8N,
    GoalKind.LEAD,
    "Agency lead router",
    "Qualifies inbound leads, then hands warm ones to sales.",
    Difficulty.ADVANCED,
    68,
    "edited 3d ago"
  ),
  project(
    "project_skincare_picker",
    ChannelKind.INSTAGRAM,
    GoalKind.RECO,
    "Skincare product picker",
    "Asks about skin type and recommends one SKU.",
    Difficulty.INTERMEDIATE,
    74,
    "edited 4d ago"
  ),
  project(
    "project_order_status",
    ChannelKind.EMAIL,
    GoalKind.ORDER,
    "Order status auto-reply",
    'Reads order numbers and answers "where is it?".',
    Difficulty.BEGINNER,
    88,
    "edited 6d ago"
  ),
  project(
    "project_community_support",
    ChannelKind.TELEGRAM,
    GoalKind.SUPPORT,
    "Community support bot",
    "First-line answers for a Telegram product group.",
    Difficulty.ADVANCED,
    null,
    "draft",
    true
  )
];

export interface SeedActivity {
  id: string;
  type: ActivityTypeValue;
  title: string;
  detail: string;
  projectId?: string;
  offsetMs: number;
}

export const seedActivity: SeedActivity[] = [
  {
    id: "activity_bistro_validated",
    type: ActivityType.VALIDATE,
    title: "Bistro booking assistant",
    detail: 'Scored 82% - missed "confirm the slot back to her"',
    projectId: "project_bistro_booking",
    offsetMs: 2 * 60 * 60 * 1000
  },
  {
    id: "activity_bistro_tested",
    type: ActivityType.TEST,
    title: "Bistro booking assistant",
    detail: "Ran a 6-message test conversation",
    projectId: "project_bistro_booking",
    offsetMs: 2 * 60 * 60 * 1000
  },
  {
    id: "activity_saas_validated",
    type: ActivityType.VALIDATE,
    title: "SaaS onboarding helper",
    detail: "Scored 95% - all objectives met",
    projectId: "project_saas_onboarding",
    offsetMs: 24 * 60 * 60 * 1000
  },
  {
    id: "activity_skincare_created",
    type: ActivityType.CREATE,
    title: "Skincare product picker",
    detail: "New project from Instagram DM scenario",
    projectId: "project_skincare_picker",
    offsetMs: 4 * 24 * 60 * 60 * 1000
  },
  {
    id: "activity_agency_edited",
    type: ActivityType.EDIT,
    title: "Agency lead router",
    detail: "Updated the system prompt & temperature",
    projectId: "project_agency_lead_router",
    offsetMs: 4 * 24 * 60 * 60 * 1000
  },
  {
    id: "activity_key_connected",
    type: ActivityType.KEY,
    title: "Connected a model",
    detail: "Added an Anthropic API key",
    offsetMs: 7 * 24 * 60 * 60 * 1000
  }
];

