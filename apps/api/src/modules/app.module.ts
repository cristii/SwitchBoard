import { Module } from "@nestjs/common";
import { ActivityModule } from "./activity/activity.module";
import { AuthModule } from "./auth/auth.module";
import { HealthController } from "./health.controller";
import { KeysModule } from "./keys/keys.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProjectsModule } from "./projects/projects.module";
import { TemplatesModule } from "./templates/templates.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProjectsModule,
    TemplatesModule,
    ActivityModule,
    KeysModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
