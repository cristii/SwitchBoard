import { BadRequestException } from "@nestjs/common";
import type { z } from "zod";

export function parseOrBadRequest<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  input: unknown
): z.infer<TSchema> {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    throw new BadRequestException({
      error: {
        code: "BAD_REQUEST",
        message: parsed.error.issues.map((issue) => issue.message).join("; ")
      }
    });
  }

  return parsed.data;
}
