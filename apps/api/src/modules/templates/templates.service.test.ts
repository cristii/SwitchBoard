import { describe, expect, it } from "vitest";
import { templates } from "@switchboard/shared";
import { TemplatesService } from "./templates.service";

describe("TemplatesService", () => {
  it("returns the static starter templates from the shared package", () => {
    expect(new TemplatesService().list()).toEqual({ templates });
  });
});
