import { z } from "zod";
import {
  activityTypeValues,
  channelKindValues,
  difficultyValues,
  goalKindValues,
  msgRoleValues,
  providerKindValues,
  runStateValues
} from "./enums";

export const difficultySchema = z.enum(difficultyValues);
export const channelKindSchema = z.enum(channelKindValues);
export const goalKindSchema = z.enum(goalKindValues);
export const providerKindSchema = z.enum(providerKindValues);
export const msgRoleSchema = z.enum(msgRoleValues);
export const runStateSchema = z.enum(runStateValues);
export const activityTypeSchema = z.enum(activityTypeValues);

export const templateSchema = z.object({
  id: z.string().min(1),
  channel: channelKindSchema,
  goal: goalKindSchema,
  difficulty: difficultySchema,
  name: z.string().min(1).max(120),
  blurb: z.string().min(1).max(240),
  tags: z.array(z.string().min(1).max(32)).min(1)
});

export const scenarioSchema = z.object({
  business: z.string().min(2).max(160),
  persona: z.string().min(2).max(500),
  situation: z.string().min(2).max(500),
  opener: z.string().min(1).max(500),
  objectives: z.array(z.string().min(2).max(180)).min(1).max(6)
});

export const createProjectSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    channel: channelKindSchema,
    goal: goalKindSchema,
    difficulty: difficultySchema,
    templateId: z.string().min(1).max(40).optional()
  })
  .strict();

export const updateProjectSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    systemPrompt: z.string().trim().min(1).max(8000).optional(),
    temperature: z.number().int().min(0).max(100).optional(),
    tone: z.enum(["Warm", "Snappy", "Formal", "Playful"]).optional()
  })
  .strict()
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one project field is required."
  });

export const providerKeyUpsertSchema = z
  .object({
    key: z.string().trim().min(8).max(4096)
  })
  .strict();

export const chatRequestSchema = z
  .object({
    conversationId: z.string().min(1).optional(),
    text: z.string().trim().min(1).max(4000)
  })
  .strict();

export const validationResultSchema = z.object({
  objective: z.string().min(1),
  met: z.boolean(),
  note: z.string().min(1).max(500)
});

export const gradeTranscriptSchema = z.object({
  results: z.array(validationResultSchema).min(1).max(6)
});

export const channelProvisionSchema = z
  .object({
    channel: channelKindSchema
  })
  .strict();

export const projectIdParamSchema = z
  .object({
    id: z.string().min(1)
  })
  .strict();

export const webhookParamSchema = z
  .object({
    channel: channelKindSchema,
    token: z.string().min(16).max(160)
  })
  .strict();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProviderKeyUpsertInput = z.infer<typeof providerKeyUpsertSchema>;
export type ChatRequestInput = z.infer<typeof chatRequestSchema>;

