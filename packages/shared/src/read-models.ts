import { z } from "zod";
import {
  activityTypeSchema,
  channelKindSchema,
  difficultySchema,
  goalKindSchema,
  providerKindSchema
} from "./schemas";

export const projectListItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  channel: channelKindSchema,
  goal: goalKindSchema,
  difficulty: difficultySchema,
  scenario: z.string().min(1),
  score: z.number().int().min(0).max(100).nullable(),
  isDraft: z.boolean(),
  updatedAt: z.string().datetime()
});

export const projectStatsSchema = z.object({
  projectCount: z.number().int().min(0),
  averageScore: z.number().int().min(0).max(100),
  channelsPractised: z.number().int().min(0)
});

export const projectsListResponseSchema = z.object({
  projects: z.array(projectListItemSchema),
  stats: projectStatsSchema
});

export const templateListResponseSchema = z.object({
  templates: z.array(
    z.object({
      id: z.string().min(1),
      channel: channelKindSchema,
      goal: goalKindSchema,
      difficulty: difficultySchema,
      name: z.string().min(1),
      blurb: z.string().min(1),
      tags: z.array(z.string().min(1))
    })
  )
});

export const activityListItemSchema = z.object({
  id: z.string().min(1),
  type: activityTypeSchema,
  title: z.string().min(1),
  detail: z.string().min(1),
  projectId: z.string().nullable(),
  createdAt: z.string().datetime()
});

export const activityListResponseSchema = z.object({
  activity: z.array(activityListItemSchema)
});

export const providerKeySummarySchema = z
  .object({
    provider: providerKindSchema,
    last4: z.string().length(4),
    createdAt: z.string().datetime()
  })
  .strict();

export const providerKeysListResponseSchema = z
  .object({
    keys: z.array(providerKeySummarySchema)
  })
  .strict();

export const providerKeySaveResponseSchema = z
  .object({
    key: providerKeySummarySchema
  })
  .strict();

export const providerKeyDeleteResponseSchema = z
  .object({
    ok: z.literal(true)
  })
  .strict();

export type ProjectListItem = z.infer<typeof projectListItemSchema>;
export type ProjectStats = z.infer<typeof projectStatsSchema>;
export type ProjectsListResponse = z.infer<typeof projectsListResponseSchema>;
export type TemplateListResponse = z.infer<typeof templateListResponseSchema>;
export type ActivityListItem = z.infer<typeof activityListItemSchema>;
export type ActivityListResponse = z.infer<typeof activityListResponseSchema>;
export type ProviderKeySummary = z.infer<typeof providerKeySummarySchema>;
export type ProviderKeysListResponse = z.infer<typeof providerKeysListResponseSchema>;
export type ProviderKeySaveResponse = z.infer<typeof providerKeySaveResponseSchema>;
export type ProviderKeyDeleteResponse = z.infer<typeof providerKeyDeleteResponseSchema>;
