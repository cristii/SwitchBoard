import { Module } from "@nestjs/common";
import { KeysController } from "./keys.controller";
import { EncryptionService } from "./encryption.service";
import { KeysService } from "./keys.service";

@Module({
  controllers: [KeysController],
  providers: [
    KeysService,
    {
      provide: EncryptionService,
      useFactory: () => EncryptionService.fromEnv()
    }
  ]
})
export class KeysModule {}
