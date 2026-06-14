import { Injectable } from "@nestjs/common";
import { type TemplateListResponse, templates } from "@switchboard/shared";

@Injectable()
export class TemplatesService {
  list(): TemplateListResponse {
    return { templates };
  }
}

