export const Difficulty = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED"
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const difficultyValues = [
  Difficulty.BEGINNER,
  Difficulty.INTERMEDIATE,
  Difficulty.ADVANCED
] as const;

export const difficultyLabels: Record<Difficulty, string> = {
  [Difficulty.BEGINNER]: "Beginner",
  [Difficulty.INTERMEDIATE]: "Intermediate",
  [Difficulty.ADVANCED]: "Advanced"
};

export const ChannelKind = {
  WHATSAPP: "WHATSAPP",
  MESSENGER: "MESSENGER",
  INSTAGRAM: "INSTAGRAM",
  TELEGRAM: "TELEGRAM",
  SMS: "SMS",
  WEBCHAT: "WEBCHAT",
  SLACK: "SLACK",
  DISCORD: "DISCORD",
  TEAMS: "TEAMS",
  EMAIL: "EMAIL",
  N8N: "N8N",
  ZAPIER: "ZAPIER",
  MAKE: "MAKE",
  VOICEFLOW: "VOICEFLOW"
} as const;

export type ChannelKind = (typeof ChannelKind)[keyof typeof ChannelKind];

export const channelKindValues = [
  ChannelKind.WHATSAPP,
  ChannelKind.MESSENGER,
  ChannelKind.INSTAGRAM,
  ChannelKind.TELEGRAM,
  ChannelKind.SMS,
  ChannelKind.WEBCHAT,
  ChannelKind.SLACK,
  ChannelKind.DISCORD,
  ChannelKind.TEAMS,
  ChannelKind.EMAIL,
  ChannelKind.N8N,
  ChannelKind.ZAPIER,
  ChannelKind.MAKE,
  ChannelKind.VOICEFLOW
] as const;

export const channelDetails: Record<
  ChannelKind,
  { slug: string; name: string; group: string; blurb: string }
> = {
  [ChannelKind.WHATSAPP]: {
    slug: "whatsapp",
    name: "WhatsApp",
    group: "Channels",
    blurb: "Business messaging at scale"
  },
  [ChannelKind.MESSENGER]: {
    slug: "messenger",
    name: "Messenger",
    group: "Channels",
    blurb: "Facebook Page inbox"
  },
  [ChannelKind.INSTAGRAM]: {
    slug: "instagram",
    name: "Instagram DM",
    group: "Channels",
    blurb: "Comments & direct messages"
  },
  [ChannelKind.TELEGRAM]: {
    slug: "telegram",
    name: "Telegram",
    group: "Channels",
    blurb: "Open, fast bot API"
  },
  [ChannelKind.SMS]: {
    slug: "sms",
    name: "SMS / Twilio",
    group: "Channels",
    blurb: "Plain-text everywhere reach"
  },
  [ChannelKind.WEBCHAT]: {
    slug: "webchat",
    name: "Website widget",
    group: "Channels",
    blurb: "Embed on any site"
  },
  [ChannelKind.SLACK]: {
    slug: "slack",
    name: "Slack",
    group: "Team chat",
    blurb: "Internal helpdesk bots"
  },
  [ChannelKind.DISCORD]: {
    slug: "discord",
    name: "Discord",
    group: "Team chat",
    blurb: "Community support & mods"
  },
  [ChannelKind.TEAMS]: {
    slug: "teams",
    name: "MS Teams",
    group: "Team chat",
    blurb: "Enterprise messaging"
  },
  [ChannelKind.EMAIL]: {
    slug: "email",
    name: "Email inbox",
    group: "Email",
    blurb: "Gmail / IMAP auto-replies"
  },
  [ChannelKind.N8N]: {
    slug: "n8n",
    name: "n8n",
    group: "Automation engines",
    blurb: "Open-source workflows"
  },
  [ChannelKind.ZAPIER]: {
    slug: "zapier",
    name: "Zapier",
    group: "Automation engines",
    blurb: "7,000+ app Zaps"
  },
  [ChannelKind.MAKE]: {
    slug: "make",
    name: "Make",
    group: "Automation engines",
    blurb: "Visual scenarios"
  },
  [ChannelKind.VOICEFLOW]: {
    slug: "voiceflow",
    name: "Voiceflow",
    group: "Automation engines",
    blurb: "Conversation design"
  }
};

export const GoalKind = {
  LEAD: "LEAD",
  SUPPORT: "SUPPORT",
  BOOKING: "BOOKING",
  FAQ: "FAQ",
  ORDER: "ORDER",
  RECO: "RECO"
} as const;

export type GoalKind = (typeof GoalKind)[keyof typeof GoalKind];

export const goalKindValues = [
  GoalKind.LEAD,
  GoalKind.SUPPORT,
  GoalKind.BOOKING,
  GoalKind.FAQ,
  GoalKind.ORDER,
  GoalKind.RECO
] as const;

export const goalDetails: Record<GoalKind, { name: string; desc: string }> = {
  [GoalKind.LEAD]: {
    name: "Lead qualification",
    desc: "Greet, qualify, capture contact"
  },
  [GoalKind.SUPPORT]: {
    name: "Customer support",
    desc: "Resolve issues, deflect tickets"
  },
  [GoalKind.BOOKING]: {
    name: "Appointment booking",
    desc: "Find a slot and confirm it"
  },
  [GoalKind.FAQ]: {
    name: "FAQ deflection",
    desc: "Answer top questions instantly"
  },
  [GoalKind.ORDER]: {
    name: "Order tracking",
    desc: "Look up status, set expectations"
  },
  [GoalKind.RECO]: {
    name: "Product recommendation",
    desc: "Ask needs, suggest the right pick"
  }
};

export const ProviderKind = {
  ANTHROPIC: "ANTHROPIC",
  OPENAI: "OPENAI",
  GOOGLE: "GOOGLE",
  MISTRAL: "MISTRAL",
  GROQ: "GROQ"
} as const;

export type ProviderKind = (typeof ProviderKind)[keyof typeof ProviderKind];

export const providerKindValues = [
  ProviderKind.ANTHROPIC,
  ProviderKind.OPENAI,
  ProviderKind.GOOGLE,
  ProviderKind.MISTRAL,
  ProviderKind.GROQ
] as const;

export const providerDetails: Record<
  ProviderKind,
  { slug: string; name: string; models: string; placeholder: string }
> = {
  [ProviderKind.ANTHROPIC]: {
    slug: "anthropic",
    name: "Anthropic",
    models: "Claude 4 family",
    placeholder: "sk-ant-\u2026"
  },
  [ProviderKind.OPENAI]: {
    slug: "openai",
    name: "OpenAI",
    models: "GPT-4o / o-series",
    placeholder: "sk-\u2026"
  },
  [ProviderKind.GOOGLE]: {
    slug: "google",
    name: "Google",
    models: "Gemini 2.x",
    placeholder: "AIza\u2026"
  },
  [ProviderKind.MISTRAL]: {
    slug: "mistral",
    name: "Mistral",
    models: "Large / Small",
    placeholder: "\u2026"
  },
  [ProviderKind.GROQ]: {
    slug: "groq",
    name: "Groq",
    models: "Llama 3.x \u00B7 fast",
    placeholder: "gsk_\u2026"
  }
};

export const MsgRole = {
  BOT: "BOT",
  USER: "USER",
  SYSTEM: "SYSTEM"
} as const;

export type MsgRole = (typeof MsgRole)[keyof typeof MsgRole];

export const msgRoleValues = [MsgRole.BOT, MsgRole.USER, MsgRole.SYSTEM] as const;

export const RunState = {
  IDLE: "IDLE",
  RUNNING: "RUNNING",
  DONE: "DONE",
  FAILED: "FAILED"
} as const;

export type RunState = (typeof RunState)[keyof typeof RunState];

export const runStateValues = [
  RunState.IDLE,
  RunState.RUNNING,
  RunState.DONE,
  RunState.FAILED
] as const;

export const ActivityType = {
  CREATE: "CREATE",
  VALIDATE: "VALIDATE",
  TEST: "TEST",
  EDIT: "EDIT",
  KEY: "KEY"
} as const;

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

export const activityTypeValues = [
  ActivityType.CREATE,
  ActivityType.VALIDATE,
  ActivityType.TEST,
  ActivityType.EDIT,
  ActivityType.KEY
] as const;
