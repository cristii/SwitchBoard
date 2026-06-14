# Switchboard Playground — Implementation Guide

> Build spec for a coding agent. The design lives in `Playground.dc.html` (open it to see
> every screen, state, and interaction). This document turns that design into a running,
> production-shaped system using **Next.js · NestJS · PostgreSQL · Redis · Docker**.
>
> Read the design file first. Names of screens, fields, and flows below match it exactly.

---

## 0. What we are building

A "playground" where a user practices building **AI chatbot automations** for many channels
(WhatsApp, Messenger, Instagram, Telegram, SMS, web widget, Slack, Discord, Teams, email)
and automation engines (n8n, Zapier, Make, Voiceflow).

Core loop (mirrors the designed Workspace):

1. **New project** → pick a channel → pick a goal + difficulty → an AI **generates a scenario**
   (business, customer persona, situation, gradeable objectives).
2. **Build** → edit the bot's system prompt, temperature, tone (with an "AI draft" helper).
3. **Test** → chat with the bot as the customer; replies come from a **real** model call.
4. **Validate** → an AI grades the test transcript against the objectives and returns a score.
5. **Connect** → the bot gets an inbound webhook URL so a real channel can drive it.

Two hard product rules from the design:

- **BYOK (bring your own key).** Scenario generation, bot replies, prompt drafting, and
  validation all run on the **user's** provider key (Anthropic / OpenAI / Google / Mistral / Groq).
- **Real API requests, not simulated.** No mocked model output in production paths. (A built-in
  demo model is allowed only as an explicit, clearly-labelled fallback when the user has no key.)

---

## 1. Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│  Browser (Next.js App Router, React Server + Client Components)        │
│   • Library / Templates / Activity / API keys / Workspace             │
│   • Test chat uses SSE/WebSocket for streamed bot replies             │
└───────────────┬───────────────────────────────────────────────────────┘
                │ HTTPS (REST + SSE)            ▲ inbound channel webhooks
                ▼                               │ (POST from WhatsApp/Telegram/…)
┌──────────────────────────────────────────────────────────────────────┐
│  API gateway — NestJS                                                  │
│   • Auth, Projects, Templates, Scenarios, Bots, Chat, Validation,     │
│     Keys (BYOK), Channels, Webhooks, Activity                         │
│   • AiProviderModule: one interface, many providers                   │
└───┬───────────────┬───────────────────────────┬──────────────────────┘
    │               │                           │
    ▼               ▼                           ▼
┌─────────┐   ┌──────────────┐          ┌────────────────────────────┐
│Postgres │   │ Redis        │          │ Worker — NestJS (BullMQ)   │
│(Prisma) │   │ • BullMQ     │◀────────▶│ • scenario.generate        │
│         │   │ • cache      │  queues  │ • bot.reply (inbound msgs) │
│         │   │ • rate-limit │          │ • validation.run           │
│         │   │ • pub/sub    │          │ • channel.deliver          │
└─────────┘   └──────────────┘          └────────────────────────────┘
```

- **apps/web** — Next.js 14+ (App Router). UI, auth session, REST/SSE client.
- **apps/api** — NestJS HTTP API. Owns all writes; validates; enqueues jobs.
- **apps/worker** — NestJS standalone app consuming BullMQ queues for anything that calls an
  LLM or an external channel (slow, retryable, rate-limited).
- **packages/shared** — TypeScript types, Zod schemas, prompt builders, the provider interface
  shared by api + worker so request/response shapes never drift.

Use a monorepo (pnpm workspaces + Turborepo). One language (TypeScript) end to end.

---

## 2. Repository layout

```
switchboard-playground/
├─ apps/
│  ├─ web/                      # Next.js
│  │  ├─ app/
│  │  │  ├─ (app)/library/      # Projects grid + stats + search
│  │  │  ├─ (app)/templates/    # Starter templates gallery
│  │  │  ├─ (app)/activity/     # Timeline
│  │  │  ├─ (app)/settings/keys # BYOK provider keys
│  │  │  ├─ (app)/projects/[id] # Workspace: Build / Test / Connect + Validation
│  │  │  └─ new/                # New-project wizard (channel → goal/difficulty → scenario)
│  │  ├─ components/            # Port the DS components used in Playground.dc.html
│  │  └─ lib/api.ts             # typed fetch client
│  ├─ api/                      # NestJS gateway
│  │  └─ src/modules/{auth,projects,templates,scenarios,bots,chat,
│  │                   validation,keys,channels,webhooks,activity,ai}
│  └─ worker/                   # NestJS BullMQ consumers
├─ packages/
│  └─ shared/                   # zod schemas, DTOs, prompt builders, provider iface, enums
├─ prisma/                      # schema.prisma + migrations + seed
├─ docker/                      # Dockerfiles
├─ docker-compose.yml
├─ .env.example
└─ turbo.json
```

Keep the design system from `Playground.dc.html` intact: extract the paper-&-ink tokens
(colors `#E9E8DF` paper / `#15211F` ink / `#B45309` orange, Bricolage + Inter + Caveat, hard `4px 4px 0` offset shadows, 1.5–2px ink borders) into `apps/web` global CSS + the Eyebrow,
Badge, Button, Stat, HandUnderline, ChatBubble, Card components. **Do not invent new visuals** —
the HTML is the source of truth.

---

## 3. Data model (Prisma / PostgreSQL)

```prisma
// prisma/schema.prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum Difficulty { BEGINNER INTERMEDIATE ADVANCED }
enum ChannelKind {
  WHATSAPP MESSENGER INSTAGRAM TELEGRAM SMS WEBCHAT
  SLACK DISCORD TEAMS EMAIL N8N ZAPIER MAKE VOICEFLOW
}
enum GoalKind { LEAD SUPPORT BOOKING FAQ ORDER RECO }
enum ProviderKind { ANTHROPIC OPENAI GOOGLE MISTRAL GROQ }
enum MsgRole { BOT USER SYSTEM }
enum RunState { IDLE RUNNING DONE FAILED }
enum ActivityType { CREATE VALIDATE TEST EDIT KEY }

model User {
  id          String       @id @default(cuid())
  email       String       @unique
  name        String?
  createdAt   DateTime     @default(now())
  projects    Project[]
  providerKeys ProviderKey[]
  activity    Activity[]
}

model Project {
  id          String       @id @default(cuid())
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  name        String
  channel     ChannelKind
  goal        GoalKind
  difficulty  Difficulty
  isDraft     Boolean      @default(true)
  // bot config (the "Build" tab)
  systemPrompt String      @db.Text
  temperature Int          @default(35)   // 0..100 in UI; map to provider 0..1/0..2
  tone        String       @default("Warm")
  // latest score shown on the card / topbar
  score       Int?
  scenario    Scenario?
  conversations Conversation[]
  validations ValidationRun[]
  channelLink ChannelLink?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  @@index([userId, updatedAt])
}

model Scenario {
  id          String   @id @default(cuid())
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId   String   @unique
  business    String
  persona     String
  situation   String
  opener      String
  objectives  String[]                       // gradeable list
  generatedBy ProviderKind?
  createdAt   DateTime @default(now())
}

model Conversation {
  id         String    @id @default(cuid())
  project    Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId  String
  source     String    @default("test")      // "test" | "channel"
  messages   Message[]
  createdAt  DateTime  @default(now())
  @@index([projectId])
}

model Message {
  id             String       @id @default(cuid())
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  conversationId String
  role           MsgRole
  text           String       @db.Text
  createdAt      DateTime     @default(now())
  @@index([conversationId, createdAt])
}

model ValidationRun {
  id         String   @id @default(cuid())
  project    Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId  String
  state      RunState @default(RUNNING)
  score      Int?
  verdict    String?
  results    Json?    // [{ objective, met, note }]
  conversationId String?
  createdAt  DateTime @default(now())
  @@index([projectId, createdAt])
}

model ProviderKey {
  id         String       @id @default(cuid())
  user       User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId     String
  provider   ProviderKind
  ciphertext String                          // AES-256-GCM encrypted API key
  iv         String
  authTag    String
  last4      String                          // for display only
  createdAt  DateTime     @default(now())
  @@unique([userId, provider])
}

model ChannelLink {
  id            String      @id @default(cuid())
  project       Project     @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId     String      @unique
  channel       ChannelKind
  webhookToken  String      @unique          // path segment for inbound webhook URL
  secretHash    String?                      // for verifying provider signatures
  credentials   Json?                        // encrypted channel tokens (page token, bot token…)
  verified      Boolean     @default(false)
  createdAt     DateTime    @default(now())
}

model Activity {
  id        String       @id @default(cuid())
  user      User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  type      ActivityType
  title     String
  detail    String
  projectId String?
  createdAt DateTime     @default(now())
  @@index([userId, createdAt])
}
```

Templates from the design are **seed data**, not a table (they're static starters). Put them in
`packages/shared/templates.ts` and expose via `GET /templates`. "Use this template" creates a
`Project` with the template's channel/goal/difficulty, then triggers scenario generation.

---

## 4. API surface (NestJS)

All routes under `/api`, JSON, authed via session cookie (NextAuth) → JWT validated by a Nest guard.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/projects` | Library grid + computed stats (count, avg score, channels used) |
| `POST` | `/projects` | Create project (manual or from template) |
| `GET` | `/projects/:id` | Full workspace payload (project + scenario + last conversation + last validation) |
| `PATCH` | `/projects/:id` | Save Build tab: systemPrompt, temperature, tone, name |
| `DELETE` | `/projects/:id` | Remove |
| `GET` | `/templates` | Static starter templates |
| `POST` | `/projects/:id/scenario` | Generate (or **reroll**) scenario → enqueues `scenario.generate` |
| `POST` | `/projects/:id/prompt-draft` | "AI draft" the system prompt → enqueues / streams |
| `POST` | `/projects/:id/chat` | Send a customer message; streams bot reply (SSE) |
| `POST` | `/projects/:id/chat/reset` | Clear the test conversation |
| `POST` | `/projects/:id/validate` | Grade transcript → enqueues `validation.run` |
| `GET` | `/projects/:id/validate/:runId` | Poll validation result (or subscribe via SSE) |
| `GET` | `/keys` | List configured providers (name + last4 only — never the key) |
| `PUT` | `/keys/:provider` | Save/update a BYOK key (encrypt, store, return last4) |
| `DELETE` | `/keys/:provider` | Remove |
| `POST` | `/projects/:id/channel` | Create/refresh the ChannelLink + webhook URL (Connect tab) |
| `GET` | `/activity` | Timeline feed |
| `POST` | `/hooks/:channel/:token` | **Public** inbound webhook from a real channel |

DTO validation with `zod` (shared package) via a `ZodValidationPipe`. Return typed errors
`{ error: { code, message } }`.

### Streaming the test chat

Prefer **SSE** for bot replies (simpler than WS, fits request/response). Endpoint holds the
connection, streams provider tokens as `data:` events, persists the full `Message` on completion,
then emits a `done` event. The Next.js client appends tokens to the ChatBubble in real time.
Use a WebSocket gateway only if you later add multi-tab live presence.

---

## 5. BYOK provider abstraction (the heart of the app)

`packages/shared/ai/provider.ts`:

```ts
export interface ChatTurn { role: 'system' | 'user' | 'assistant'; content: string; }

export interface CompleteOpts {
  system?: string;
  messages: ChatTurn[];
  temperature?: number;   // normalized 0..1
  maxTokens?: number;
  json?: boolean;         // ask for strict JSON (scenario + validation)
}

export interface AiProvider {
  readonly kind: ProviderKind;
  complete(opts: CompleteOpts): Promise<string>;
  stream(opts: CompleteOpts): AsyncIterable<string>; // for chat
}
```

Implement one adapter per provider (`AnthropicProvider`, `OpenAiProvider`, `GoogleProvider`,
`MistralProvider`, `GroqProvider`). A `ProviderFactory` resolves the user's saved key, decrypts
it, and returns the right adapter. **Temperature mapping:** UI 0–100 → provider scale (clamp;
Anthropic/OpenAI 0–1, some 0–2). Tone is injected into the system prompt, not a param.

Four call sites — keep them as named "skills" in `packages/shared/skills/` so prompts are
versioned and testable:

1. `generateScenario({ channel, goal, difficulty })` → **strict JSON**
   `{ business, persona, situation, opener, objectives[] }`.
2. `draftSystemPrompt({ business, goal, tone, objectives })` → plain text, < 130 words.
3. `botReply({ systemPrompt, tone, transcript })` → 1–3 sentence reply (streamed).
4. `gradeTranscript({ objectives, transcript })` → **strict JSON**
   `{ results: [{ objective, met, note }] }`; server computes `score = met/total * 100`.

Robust JSON parsing: strip code fences, slice to outer `{...}`/`[...]`, `JSON.parse`, and on
failure fall back to the deterministic templates already encoded in `Playground.dc.html`
(`fallbackScenario`, `heuristicValidate`). Mark fallback runs so the UI can show "demo model".

### Fallback / demo model

When the user has no key for the requested provider, route to a single server-managed demo
provider with strict quotas (see rate-limiting). Surface it in the UI exactly like the design's
"Built-in demo model" sidebar state.

---

## 6. Redis — what it's for

- **BullMQ queues:** `scenario.generate`, `prompt.draft`, `validation.run`, `bot.reply`
  (inbound channel messages), `channel.deliver`. Concurrency + retry with backoff; dead-letter on
  repeated failure. LLM/channel calls **never** run in the HTTP request path except the
  user-facing test-chat SSE (which can call the provider directly for latency, still rate-limited).
- **Rate limiting:** per-user + per-provider token buckets (`@nestjs/throttler` with Redis store,
  plus a custom limiter for the demo model). Protects the user's spend and your demo quota.
- **Caching:** `GET /projects` stats, `/templates`, provider model lists. Short TTLs; bust on write.
- **Pub/Sub:** worker → api fan-out so a finished `validation.run` pushes to the right SSE
  subscriber (multi-instance safe).
- **Idempotency:** store processed inbound webhook message IDs (SETNX + TTL) so retried channel
  deliveries don't double-reply.

---

## 7. Channels & webhooks (Connect tab)

`POST /projects/:id/channel` provisions a `ChannelLink` with a random `webhookToken` and returns:

```
https://<host>/api/hooks/<channel>/<webhookToken>
```

This is the URL shown in the Connect tab. Inbound flow:

1. Channel POSTs to `/hooks/:channel/:token` (public, **no session**).
2. Gateway verifies the provider signature (e.g. Meta `X-Hub-Signature-256`, Telegram secret
   token header, Twilio signature) against `secretHash`; rejects on mismatch.
3. Normalize the payload to `{ from, text, channelMessageId }` via a per-channel adapter.
4. Idempotency check in Redis; enqueue `bot.reply`.
5. Worker loads project + system prompt, calls `botReply` with the user's key, persists messages,
   then enqueues `channel.deliver` to send the reply back on the same channel (Graph API send,
   Telegram `sendMessage`, Twilio messages, SMTP for email, etc.).

Per-channel verification + send adapters live in `apps/api/src/modules/channels/adapters/`.
WhatsApp/Messenger/Instagram also need a **GET verify** handshake (`hub.challenge`). Store channel
credentials (page tokens, bot tokens, Twilio SID/auth, SMTP creds) encrypted like provider keys.
n8n/Zapier/Make/Voiceflow just consume the generic webhook + a documented JSON contract — give
them a copy-paste example in the Connect tab.

---

## 8. Security

- **Encryption at rest for all secrets** (provider keys + channel credentials): AES-256-GCM with a
  `MASTER_ENCRYPTION_KEY` from env/secret manager. Store `{ciphertext, iv, authTag}`. Never log or
  return plaintext; expose only `last4`.
- **Webhook auth:** verify every provider signature; constant-time compare; reject unverified.
- **Authz:** every project/route scoped to `userId`; a Nest guard + Prisma `where: { userId }`.
- **Input validation:** Zod on every body/query/param.
- **Secrets never reach the browser.** All LLM calls are server-side; the web app only ever sees
  generated text, never keys. (This is the production version of the design's BYOK promise.)
- **CORS** locked to the web origin; webhook routes exempt from CSRF but signature-checked.
- **PII:** transcripts may contain customer data — encrypt DB at rest, support project deletion
  (cascade), add a retention job.

---

## 9. Docker & local dev

`docker-compose.yml` (dev):

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: switchboard
      POSTGRES_PASSWORD: switchboard
      POSTGRES_DB: playground
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U switchboard"]
      interval: 5s
      timeout: 5s
      retries: 10

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    volumes: ["redisdata:/data"]
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 10

  api:
    build: { context: ., dockerfile: docker/api.Dockerfile }
    env_file: .env
    depends_on:
      db: { condition: service_healthy }
      redis: { condition: service_healthy }
    command: sh -c "pnpm prisma migrate deploy && node apps/api/dist/main.js"
    ports: ["4000:4000"]

  worker:
    build: { context: ., dockerfile: docker/worker.Dockerfile }
    env_file: .env
    depends_on:
      db: { condition: service_healthy }
      redis: { condition: service_healthy }
    command: node apps/worker/dist/main.js

  web:
    build: { context: ., dockerfile: docker/web.Dockerfile }
    env_file: .env
    depends_on: [api]
    ports: ["3000:3000"]

volumes: { pgdata: {}, redisdata: {} }
```

Dockerfiles: multi-stage (pnpm install with cache → build → slim runtime on `node:20-alpine`).
Use `output: 'standalone'` for Next.js. For local dev, a `docker-compose.override.yml` can run
just `db` + `redis` while you run apps with `pnpm dev` (hot reload).

`.env.example`:

```
DATABASE_URL=postgresql://switchboard:switchboard@db:5432/playground
REDIS_URL=redis://redis:6379
MASTER_ENCRYPTION_KEY=        # 32-byte base64; generate with: openssl rand -base64 32
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
API_URL=http://api:4000
PUBLIC_APP_URL=http://localhost:3000
DEMO_PROVIDER=anthropic       # which server key backs the no-BYOK fallback
DEMO_PROVIDER_KEY=            # server-owned key for the demo fallback only
DEMO_DAILY_LIMIT=25
```

---

## 10. Build order (milestones for the agent)

1. **Scaffold monorepo** (pnpm + Turbo), `packages/shared` with enums + Zod schemas, Prisma schema
   + first migration + seed (1 demo user, the 6 seed projects, 8 templates, sample activity from
   the design).
2. **Auth** (NextAuth email/magic-link or OAuth) → Nest JWT guard.
3. **Library + Templates + Activity** read screens against real `/projects`, `/templates`,
   `/activity`. Port DS components from `Playground.dc.html`.
4. **BYOK keys**: encryption util + `/keys` CRUD + settings screen.
5. **AiProviderModule** + the 4 skills with strict-JSON parsing and deterministic fallbacks.
6. **New-project wizard** → create project → `scenario.generate` job → render the generated brief
   (with reroll).
7. **Workspace Build tab** (save prompt/temp/tone) + **AI draft**.
8. **Test chat** with SSE streaming + persistence + reset.
9. **Validation** job + results panel + score write-back to project + Activity entry.
10. **Connect tab**: ChannelLink + webhook URL + one real channel end-to-end (Telegram is the
    fastest to wire: `setWebhook` + `sendMessage`).
11. **Remaining channels** behind the adapter interface; idempotency + signature verification.
12. **Hardening**: rate limits, quotas, retention, observability, tests.

---

## 11. Testing & quality

- **Unit:** prompt builders, JSON parser/fallback, encryption round-trip, temperature mapping,
  each channel payload normalizer + signature verifier.
- **Integration:** spin up `db` + `redis` via Testcontainers; exercise the full
  create → generate → chat → validate flow with a **stubbed** `AiProvider` (deterministic).
- **E2E:** Playwright over the web app for the new-project wizard and the workspace tabs.
- **Contract:** the stubbed provider returns malformed JSON in some cases to prove fallbacks fire.
- CI: typecheck, lint, unit + integration on PR; build all Docker images.

---

## 12. Observability & ops

- Structured logs (pino) with request IDs; **never** log secrets or full transcripts at info level.
- Metrics: queue depth, job duration, provider latency/error rate per provider, demo-quota usage.
- Per-user **cost/usage** counter (tokens in/out) so users see their spend — surface later in the
  Activity or a Usage screen.
- Sentry for web + api + worker.
- Health endpoints (`/healthz`) checked by compose/orchestrator.

---

## 13. Mapping design → code (quick reference)

| Design (`Playground.dc.html`) | Implementation |
|---|---|
| Sidebar "BYOK MODEL" state | `GET /keys` → show configured provider or demo fallback |
| Library stats (count / avg score / channels) | computed in `GET /projects`, cached in Redis |
| New-project step 3 "Writing your scenario…" | `scenario.generate` BullMQ job → strict-JSON skill |
| Build "AI draft" button | `draftSystemPrompt` skill |
| Test chat bubbles | SSE stream of `botReply`; persisted `Message` rows |
| AI validation panel + score | `validation.run` job → `gradeTranscript`; writes `ValidationRun` + `Project.score` |
| Connect webhook URL | `ChannelLink.webhookToken` → `/api/hooks/:channel/:token` |
| Templates "Use this template" | `POST /projects` from `templates.ts` then `scenario.generate` |
| Activity timeline | `Activity` rows written on create/validate/test/edit/key |
| Difficulty badge (green/amber/violet) | `Difficulty` enum → DS `Badge` variant |

---

**Definition of done:** a user signs in, adds their own provider key, starts a project from a
template, gets a real AI-generated scenario, chats with a bot whose replies come from their key,
runs an AI validation that scores the transcript, and connects the bot to at least one live
channel via webhook — all running under `docker compose up`.
