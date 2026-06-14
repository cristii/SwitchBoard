CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
CREATE TYPE "ChannelKind" AS ENUM ('WHATSAPP', 'MESSENGER', 'INSTAGRAM', 'TELEGRAM', 'SMS', 'WEBCHAT', 'SLACK', 'DISCORD', 'TEAMS', 'EMAIL', 'N8N', 'ZAPIER', 'MAKE', 'VOICEFLOW');
CREATE TYPE "GoalKind" AS ENUM ('LEAD', 'SUPPORT', 'BOOKING', 'FAQ', 'ORDER', 'RECO');
CREATE TYPE "ProviderKind" AS ENUM ('ANTHROPIC', 'OPENAI', 'GOOGLE', 'MISTRAL', 'GROQ');
CREATE TYPE "MsgRole" AS ENUM ('BOT', 'USER', 'SYSTEM');
CREATE TYPE "RunState" AS ENUM ('IDLE', 'RUNNING', 'DONE', 'FAILED');
CREATE TYPE "ActivityType" AS ENUM ('CREATE', 'VALIDATE', 'TEST', 'EDIT', 'KEY');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Project" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "channel" "ChannelKind" NOT NULL,
  "goal" "GoalKind" NOT NULL,
  "difficulty" "Difficulty" NOT NULL,
  "isDraft" BOOLEAN NOT NULL DEFAULT true,
  "systemPrompt" TEXT NOT NULL,
  "temperature" INTEGER NOT NULL DEFAULT 35,
  "tone" TEXT NOT NULL DEFAULT 'Warm',
  "score" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Scenario" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "business" TEXT NOT NULL,
  "persona" TEXT NOT NULL,
  "situation" TEXT NOT NULL,
  "opener" TEXT NOT NULL,
  "objectives" TEXT[] NOT NULL,
  "generatedBy" "ProviderKind",
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Conversation" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "source" TEXT NOT NULL DEFAULT 'test',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Message" (
  "id" TEXT NOT NULL,
  "conversationId" TEXT NOT NULL,
  "role" "MsgRole" NOT NULL,
  "text" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ValidationRun" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "state" "RunState" NOT NULL DEFAULT 'RUNNING',
  "score" INTEGER,
  "verdict" TEXT,
  "results" JSONB,
  "conversationId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ValidationRun_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProviderKey" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "provider" "ProviderKind" NOT NULL,
  "ciphertext" TEXT NOT NULL,
  "iv" TEXT NOT NULL,
  "authTag" TEXT NOT NULL,
  "last4" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ProviderKey_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ChannelLink" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "channel" "ChannelKind" NOT NULL,
  "webhookToken" TEXT NOT NULL,
  "secretHash" TEXT,
  "credentials" JSONB,
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ChannelLink_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Activity" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" "ActivityType" NOT NULL,
  "title" TEXT NOT NULL,
  "detail" TEXT NOT NULL,
  "projectId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "Project_userId_updatedAt_idx" ON "Project"("userId", "updatedAt");
CREATE UNIQUE INDEX "Scenario_projectId_key" ON "Scenario"("projectId");
CREATE INDEX "Conversation_projectId_idx" ON "Conversation"("projectId");
CREATE INDEX "Message_conversationId_createdAt_idx" ON "Message"("conversationId", "createdAt");
CREATE INDEX "ValidationRun_projectId_createdAt_idx" ON "ValidationRun"("projectId", "createdAt");
CREATE UNIQUE INDEX "ProviderKey_userId_provider_key" ON "ProviderKey"("userId", "provider");
CREATE UNIQUE INDEX "ChannelLink_projectId_key" ON "ChannelLink"("projectId");
CREATE UNIQUE INDEX "ChannelLink_webhookToken_key" ON "ChannelLink"("webhookToken");
CREATE INDEX "Activity_userId_createdAt_idx" ON "Activity"("userId", "createdAt");

ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ValidationRun" ADD CONSTRAINT "ValidationRun_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProviderKey" ADD CONSTRAINT "ProviderKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ChannelLink" ADD CONSTRAINT "ChannelLink_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

