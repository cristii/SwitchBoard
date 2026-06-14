import { Injectable } from "@nestjs/common";
import type { ActivityListResponse } from "@switchboard/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async listForUser(userId: string): Promise<ActivityListResponse> {
    const activity = await this.prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        type: true,
        title: true,
        detail: true,
        projectId: true,
        createdAt: true
      }
    });

    return {
      activity: activity.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.title,
        detail: item.detail,
        projectId: item.projectId,
        createdAt: item.createdAt.toISOString()
      }))
    };
  }
}

