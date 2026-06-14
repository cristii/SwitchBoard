# AGENTS.md

Guidance for AI agents working on Switchboard Playground.

## Source Of Truth

Read these before coding:

1. `IMPLEMENTATION.md` - architecture, data model, API surface, security, Docker, tests, and 12-milestone build plan.
2. `Playground.dc.html` - visual and behavioral source of truth for screens, copy, states, and the paper-and-ink design system.
3. `PROGRESS.md` - current milestone status, decisions log, and blockers.

Do not invent product features, screens, copy, channels, or visuals outside those files. If a detail is ambiguous and one-way-door, ask the human. Otherwise make a conservative decision and log it in `PROGRESS.md`.

## Build Discipline

- Build strictly in milestone order from `PROGRESS.md`.
- At the start of each milestone, update `PROGRESS.md` current focus and append any meaningful decision.
- At the end of each milestone, run tests/build checks, mark the milestone complete, move current focus to the next milestone, and commit.
- Keep commits review-sized: one milestone per commit.
- Never weaken or delete tests to make the suite pass.
- Preserve user work. Do not reset, checkout, or remove unrelated changes.

## Current State

Completed and committed:

- Milestone 1: `c7e6fa3` - monorepo scaffold, shared package, Prisma schema/migration/seed.
- Milestone 2: `7c65737` - NextAuth boundary, API JWT, Nest JWT guard.
- Milestone 3: `6a8466e` - read-only Projects/Templates/Activity API and web screens.

Current focus: Milestone 4, BYOK keys.

## Repo Layout

- `apps/web` - Next.js App Router web app.
- `apps/api` - NestJS HTTP API.
- `apps/worker` - not scaffolded yet; expected in later milestones.
- `packages/shared` - shared enums, Zod schemas, read models, seed fixtures, auth helpers, provider interfaces.
- `prisma` - Prisma schema, migration, seed script.
- `PROGRESS.md` - living checklist.

## Verification Commands

Run these before finishing a milestone:

```sh
pnpm test
pnpm typecheck
pnpm build
DATABASE_URL=postgresql://switchboard:switchboard@localhost:5432/playground pnpm exec prisma validate
```

Notes:

- Do not run `pnpm typecheck` concurrently with `pnpm build`; Next mutates `.next/types` and can race TypeScript.
- If Prisma engine cache writes fail under sandboxing, rerun the Prisma command with approval.
- If starting a dev server fails with bind permissions, rerun with approval. Use another port if 3000 is occupied.

## Design System Rules

The UI must match `Playground.dc.html`:

- Paper background `#E9E8DF`, ink `#15211F`, board `#11201E`, orange `#B45309`.
- Bricolage Grotesque for headings/buttons/tags, Inter for body/input text, Caveat for handwritten notes.
- Hard offset shadows only: no blurred shadows.
- Ink borders, compact cards, 8px-ish rhythm, no invented decorative gradients or orbs.
- Use the existing custom line-icon style in `apps/web/components/icons.tsx`.

## Security Rules

Security is part of done for every milestone:

- Every authenticated API route must scope queries by `userId`.
- Never return or log plaintext secrets.
- BYOK and channel credentials must be encrypted at rest with AES-256-GCM.
- Inputs must be validated with Zod schemas from `packages/shared`.
- LLM calls are server-side only.
- Webhook routes are public only where required and must signature-verify before processing.

