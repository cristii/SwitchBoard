import { ChannelKind, Difficulty, GoalKind } from "./enums";
import type {
  ChannelKind as ChannelKindType,
  Difficulty as DifficultyType,
  GoalKind as GoalKindType
} from "./enums";

export interface TemplateDefinition {
  id: string;
  channel: ChannelKindType;
  goal: GoalKindType;
  difficulty: DifficultyType;
  name: string;
  blurb: string;
  tags: string[];
}

export const templates: TemplateDefinition[] = [
  {
    id: "t1",
    channel: ChannelKind.WHATSAPP,
    goal: GoalKind.BOOKING,
    difficulty: Difficulty.BEGINNER,
    name: "Restaurant reservations",
    blurb: 'Takes table bookings, confirms party size, handles "are you open?".',
    tags: ["Bookings", "Hospitality"]
  },
  {
    id: "t2",
    channel: ChannelKind.WEBCHAT,
    goal: GoalKind.LEAD,
    difficulty: Difficulty.INTERMEDIATE,
    name: "Website lead catcher",
    blurb:
      "Greets visitors, qualifies the project, captures an email for sales.",
    tags: ["Lead gen", "B2B"]
  },
  {
    id: "t3",
    channel: ChannelKind.INSTAGRAM,
    goal: GoalKind.RECO,
    difficulty: Difficulty.INTERMEDIATE,
    name: "DM product finder",
    blurb:
      "Asks two questions and recommends the right product from your catalog.",
    tags: ["E-commerce", "Sales"]
  },
  {
    id: "t4",
    channel: ChannelKind.EMAIL,
    goal: GoalKind.SUPPORT,
    difficulty: Difficulty.ADVANCED,
    name: "Tier-1 support inbox",
    blurb:
      "Drafts replies to common tickets and escalates anything it cannot solve.",
    tags: ["Support", "Deflection"]
  },
  {
    id: "t5",
    channel: ChannelKind.TELEGRAM,
    goal: GoalKind.FAQ,
    difficulty: Difficulty.BEGINNER,
    name: "Community FAQ bot",
    blurb: "Answers the top 20 questions in a product group, instantly.",
    tags: ["Community", "FAQ"]
  },
  {
    id: "t6",
    channel: ChannelKind.N8N,
    goal: GoalKind.LEAD,
    difficulty: Difficulty.ADVANCED,
    name: "n8n lead router",
    blurb: "Scores inbound leads, then routes warm ones to a sales workflow.",
    tags: ["Automation", "Workflows"]
  },
  {
    id: "t7",
    channel: ChannelKind.MESSENGER,
    goal: GoalKind.ORDER,
    difficulty: Difficulty.INTERMEDIATE,
    name: "Order status replies",
    blurb: "Reads an order number from chat and returns a clear status.",
    tags: ["E-commerce", "Post-sale"]
  },
  {
    id: "t8",
    channel: ChannelKind.SLACK,
    goal: GoalKind.FAQ,
    difficulty: Difficulty.INTERMEDIATE,
    name: "Internal IT helpdesk",
    blurb: 'First-line answers for "how do I..." questions inside your workspace.',
    tags: ["Internal", "IT"]
  }
];

