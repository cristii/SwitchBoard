# Next Session Handoff

Prepared on 2026-06-14. Resume on the next work session, expected 2026-06-15.

## First Steps

1. Read `IMPLEMENTATION.md`, especially sections 4, 5, 8, 10, and 11.
2. Open `Playground.dc.html` around the "API keys" screen and sidebar BYOK state.
3. Read `PROGRESS.md`; current focus should be Milestone 4.
4. Run `git status --short` and confirm the worktree is clean.
5. Begin Milestone 4 by updating `PROGRESS.md` with a start decision.

## Where We Left Off

The worktree was clean after Milestone 3.

Latest commits:

- `6a8466e Milestone 3 add read screens`
- `7c65737 Milestone 2 add auth boundary`
- `c7e6fa3 Milestone 1 scaffold monorepo`

Implemented so far:

- pnpm/Turbo monorepo.
- `@switchboard/shared` with enums, schemas, seed fixtures, templates, auth helpers, and read models.
- Prisma schema, initial migration, and deterministic seed data from `Playground.dc.html`.
- NextAuth route in `apps/web`.
- API JWT minting into the NextAuth session.
- Nest `JwtAuthGuard` and `CurrentUser` decorator.
- `GET /api/projects`, `GET /api/templates`, `GET /api/activity`.
- Library, Templates, and Activity pages through the API client.

Known behavior:

- Without OAuth env vars/session, `/library`, `/templates`, and `/activity` render the sign-in-required state.
- `/settings/keys` is only a placeholder route. The real BYOK UI belongs to Milestone 4.
- Docker services are not implemented yet.

## Milestone 4 Scope

Milestone 4 is BYOK keys: encryption + CRUD + settings UI.

Implement only this milestone before moving on:

1. Shared contracts:
   - Provider-key response schema with provider + last4 + createdAt only.
   - Upsert/delete param/body schemas if missing.
   - Keep plaintext key request body server-only.

2. Encryption:
   - AES-256-GCM utility, preferably in `apps/api/src/modules/keys`.
   - `MASTER_ENCRYPTION_KEY` must be a 32-byte base64 key.
   - Store `ciphertext`, `iv`, `authTag`, and `last4`.
   - Never log or return plaintext keys.

3. API:
   - `GET /api/keys`
   - `PUT /api/keys/:provider`
   - `DELETE /api/keys/:provider`
   - All routes behind `JwtAuthGuard`.
   - Scope all records by `userId`.
   - Write `Activity` row of type `KEY` on add/update/delete where appropriate.

4. Web:
   - Replace the placeholder `/settings/keys` page.
   - Match the `Playground.dc.html` API keys screen copy and layout.
   - Show provider rows for Anthropic, OpenAI, Google, Mistral, Groq.
   - Input fields must not prefill stored secrets. Display saved state via `last4`.
   - Update sidebar BYOK state if feasible in this milestone; otherwise log the deferral.

5. Tests:
   - Encryption round-trip: encrypt -> decrypt -> original.
   - Tampered auth tag throws.
   - Provider-key service never returns plaintext.
   - API key schemas reject invalid providers/bodies.
   - Web view-model tests for provider display state if added.

## Expected Verification

Before committing Milestone 4:

```sh
pnpm test
pnpm typecheck
pnpm build
DATABASE_URL=postgresql://switchboard:switchboard@localhost:5432/playground pnpm exec prisma validate
```

If a dev preview is needed:

```sh
pnpm --filter @switchboard/web exec next dev -p 3001
```

Use Playwright to check `/settings/keys` for render/console issues.

## Caveats

- Do not start Milestone 5 until Milestone 4 is tested, `PROGRESS.md` is updated, and a commit is made.
- Do not add real LLM provider calls in Milestone 4; those belong to Milestone 5.
- Do not add channel credential storage yet unless it naturally shares the encryption utility and remains unexposed; channel UI is later.
- Keep the paper-and-ink design system consistent with `Playground.dc.html`.
