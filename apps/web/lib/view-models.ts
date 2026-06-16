import {
  ActivityType,
  ChannelKind,
  Difficulty,
  activityTypeValues,
  channelDetails,
  difficultyLabels,
  providerDetails,
  providerKindValues,
  type ActivityType as ActivityTypeValue,
  type ChannelKind as ChannelKindValue,
  type Difficulty as DifficultyValue,
  type ProviderKeySummary,
  type ProviderKind as ProviderKindValue
} from "@switchboard/shared";
import type { IconName } from "../components/icons";

export function difficultyVariant(
  difficulty: DifficultyValue
): "green" | "amber" | "violet" {
  if (difficulty === Difficulty.BEGINNER) return "green";
  if (difficulty === Difficulty.ADVANCED) return "violet";
  return "amber";
}

export function difficultyText(difficulty: DifficultyValue): string {
  return difficultyLabels[difficulty];
}

export function platformName(channel: ChannelKindValue): string {
  return channelDetails[channel].name;
}

export function platformIcon(channel: ChannelKindValue): IconName {
  const map: Record<ChannelKindValue, IconName> = {
    [ChannelKind.WHATSAPP]: "whatsapp",
    [ChannelKind.MESSENGER]: "messenger",
    [ChannelKind.INSTAGRAM]: "instagram",
    [ChannelKind.TELEGRAM]: "telegram",
    [ChannelKind.SMS]: "chat",
    [ChannelKind.WEBCHAT]: "webchat",
    [ChannelKind.SLACK]: "slack",
    [ChannelKind.DISCORD]: "chat",
    [ChannelKind.TEAMS]: "chat",
    [ChannelKind.EMAIL]: "email",
    [ChannelKind.N8N]: "n8n",
    [ChannelKind.ZAPIER]: "flow",
    [ChannelKind.MAKE]: "flow",
    [ChannelKind.VOICEFLOW]: "chat"
  };

  return map[channel];
}

export function scoreColor(score: number | null): string {
  if (!score) return "#54605C";
  if (score >= 85) return "#3F7A4E";
  if (score >= 70) return "#B45309";
  return "#92400E";
}

export function relativeTime(value: string, now = new Date()): string {
  const date = new Date(value);
  const diffMs = Math.max(0, now.getTime() - date.getTime());
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

export const activityMeta: Record<
  ActivityTypeValue,
  { icon: IconName; color: string; kind: string }
> = {
  [ActivityType.CREATE]: { icon: "spark", color: "#B45309", kind: "Created" },
  [ActivityType.VALIDATE]: { icon: "target", color: "#3F7A4E", kind: "Validated" },
  [ActivityType.TEST]: { icon: "chat", color: "#6A4A8A", kind: "Tested" },
  [ActivityType.EDIT]: { icon: "flow", color: "#54605C", kind: "Edited" },
  [ActivityType.KEY]: { icon: "key", color: "#92400E", kind: "Keys" }
};

export function knownActivityTypes() {
  return activityTypeValues;
}

export type ProviderKeyRow = {
  provider: ProviderKindValue;
  name: string;
  models: string;
  placeholder: string;
  saved: boolean;
  last4: string | null;
  buttonLabel: "Save" | "Update" | "Saved \u2713";
};

export function providerKeyRows(
  keys: ProviderKeySummary[],
  recentlySaved?: ProviderKindValue
): ProviderKeyRow[] {
  const savedByProvider = new Map(keys.map((key) => [key.provider, key]));

  return providerKindValues.map((provider) => {
    const saved = savedByProvider.get(provider);
    const details = providerDetails[provider];

    return {
      provider,
      name: details.name,
      models: details.models,
      placeholder: saved ? `Saved key ending in ${saved.last4}` : details.placeholder,
      saved: Boolean(saved),
      last4: saved?.last4 ?? null,
      buttonLabel:
        recentlySaved === provider ? "Saved \u2713" : saved ? "Update" : "Save"
    };
  });
}

export function providerSidebarState(keys: ProviderKeySummary[]): {
  connected: boolean;
  label: string;
} {
  const first = keys[0];

  if (!first) {
    return { connected: false, label: "Built-in demo model" };
  }

  const details = providerDetails[first.provider];

  return {
    connected: true,
    label: `${details.name} \u00B7 ${details.models.split("\u00B7")[0].trim()}`
  };
}

export function parseProvider(value: string | undefined): ProviderKindValue | undefined {
  if (!value) return undefined;
  return providerKindValues.find((provider) => provider === value);
}

export function providerIcon(_: ProviderKindValue): IconName {
  return "key";
}

export function knownProviderKinds() {
  return providerKindValues;
}
