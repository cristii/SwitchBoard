import { PrismaClient } from "@prisma/client";
import {
  demoUser,
  seedActivity,
  seedProjects,
  templates
} from "../packages/shared/src/index";

const prisma = new PrismaClient();

function fromNow(offsetMs: number): Date {
  return new Date(Date.now() - offsetMs);
}

async function main(): Promise<void> {
  await prisma.user.upsert({
    where: { email: demoUser.email },
    update: {
      name: demoUser.name
    },
    create: demoUser
  });

  for (const project of seedProjects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {
        name: project.name,
        channel: project.channel,
        goal: project.goal,
        difficulty: project.difficulty,
        isDraft: project.isDraft,
        systemPrompt: project.systemPrompt,
        temperature: project.temperature,
        tone: project.tone,
        score: project.score
      },
      create: {
        id: project.id,
        userId: demoUser.id,
        name: project.name,
        channel: project.channel,
        goal: project.goal,
        difficulty: project.difficulty,
        isDraft: project.isDraft,
        systemPrompt: project.systemPrompt,
        temperature: project.temperature,
        tone: project.tone,
        score: project.score
      }
    });

    await prisma.scenario.upsert({
      where: { projectId: project.id },
      update: {
        business: project.scenario.business,
        persona: project.scenario.persona,
        situation: project.scenario.situation,
        opener: project.scenario.opener,
        objectives: project.scenario.objectives
      },
      create: {
        id: `${project.id}_scenario`,
        projectId: project.id,
        business: project.scenario.business,
        persona: project.scenario.persona,
        situation: project.scenario.situation,
        opener: project.scenario.opener,
        objectives: project.scenario.objectives
      }
    });
  }

  for (const activity of seedActivity) {
    await prisma.activity.upsert({
      where: { id: activity.id },
      update: {
        type: activity.type,
        title: activity.title,
        detail: activity.detail,
        projectId: activity.projectId ?? null,
        createdAt: fromNow(activity.offsetMs)
      },
      create: {
        id: activity.id,
        userId: demoUser.id,
        type: activity.type,
        title: activity.title,
        detail: activity.detail,
        projectId: activity.projectId,
        createdAt: fromNow(activity.offsetMs)
      }
    });
  }

  console.info(
    `Seeded ${templates.length} static templates, ${seedProjects.length} projects, and ${seedActivity.length} activity rows for ${demoUser.email}.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
