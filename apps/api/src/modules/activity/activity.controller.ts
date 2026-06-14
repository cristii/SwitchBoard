import { Controller, Get, UseGuards } from "@nestjs/common";
import type { AuthenticatedUser } from "@switchboard/shared";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ActivityService } from "./activity.service";

@Controller("activity")
@UseGuards(JwtAuthGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  listActivity(@CurrentUser() user: AuthenticatedUser) {
    return this.activityService.listForUser(user.id);
  }
}

