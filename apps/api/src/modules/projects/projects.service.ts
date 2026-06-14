import { Injectable } from "@nestjs/common";
import type { ProjectsListResponse } from "@switchboard/shared";
import { PrismaService } from "../prisma/prisma.service";

export function computeProjectStats(
  projects: Array<{ score: number | null; channel: string }>
): ProjectsListResponse["stats"] {
  const scored = projects.filter((project) => project.score !== null);
  const averageScore =
    scored.length === 0
      ? 0
      : Math.round(
          scored.reduce((sum, project) => sum + (project.score ?? 0), 0) /
            scored.length
        );

  return {
    projectCount: projects.length,
    averageScore,
    channelsPractised: new Set(projects.map((project) => project.channel)).size
  };
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async listForUser(userId: string): Promise<ProjectsListResponse> {
    const projects = await this.prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        channel: true,
        goal: true,
        difficulty: true,
        score: true,
        isDraft: true,
        updatedAt: true,
        scenario: {
          select: {
            situation: true
          }
        }
      }
    });

    return {
      stats: computeProjectStats(projects),
      projects: projects.map((project) => ({
        id: project.id,
        name: project.name,
        channel: project.channel,
        goal: project.goal,
        difficulty: project.difficulty,
        scenario: project.scenario?.situation ?? "Scenario generation pending.",
        score: project.score,
        isDraft: project.isDraft,
        updatedAt: project.updatedAt.toISOString()
      }))
    };
  }
}

