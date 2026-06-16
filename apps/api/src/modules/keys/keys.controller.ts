import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import {
  providerKeyParamSchema,
  providerKeyUpsertSchema,
  type AuthenticatedUser
} from "@switchboard/shared";
import { CurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { parseOrBadRequest } from "../common/zod";
import { KeysService } from "./keys.service";

@Controller("keys")
@UseGuards(JwtAuthGuard)
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Get()
  listKeys(@CurrentUser() user: AuthenticatedUser) {
    return this.keysService.listForUser(user.id);
  }

  @Put(":provider")
  saveKey(
    @CurrentUser() user: AuthenticatedUser,
    @Param() params: Record<string, string>,
    @Body() body: unknown
  ) {
    const { provider } = parseOrBadRequest(providerKeyParamSchema, params);
    const { key } = parseOrBadRequest(providerKeyUpsertSchema, body);

    return this.keysService.upsertForUser(user.id, provider, key);
  }

  @Delete(":provider")
  deleteKey(
    @CurrentUser() user: AuthenticatedUser,
    @Param() params: Record<string, string>
  ) {
    const { provider } = parseOrBadRequest(providerKeyParamSchema, params);

    return this.keysService.deleteForUser(user.id, provider);
  }
}
