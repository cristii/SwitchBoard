# Progress

## Current focus
Milestone 4: BYOK keys (encryption + CRUD + settings UI).

## Milestones
- [x] 1. Scaffold monorepo (pnpm + Turbo), shared package, Prisma schema + seed
- [x] 2. Auth (NextAuth -> Nest JWT guard)
- [x] 3. Library / Templates / Activity read screens
- [ ] 4. BYOK keys (encryption + CRUD + settings UI)
- [ ] 5. AiProviderModule + 4 skills + JSON fallbacks
- [ ] 6. New-project wizard -> scenario.generate
- [ ] 7. Workspace Build tab + AI draft
- [ ] 8. Test chat (SSE streaming + persistence)
- [ ] 9. Validation job + score write-back + Activity
- [ ] 10. Connect tab + first live channel (Telegram)
- [ ] 11. Remaining channels behind the adapter interface
- [ ] 12. Hardening (rate limits, quotas, retention, observability)

## Decisions log
2026-06-15 - Starting Milestone 4 with shared key response contracts before API/UI work - provider key metadata must stay aligned and never expose plaintext secrets.
2026-06-14 - Extracted `SwitchBoard.zip` in place - the workspace contained the archive but not the spec/UI files at repo root.
2026-06-14 - Shared package owns enums, Zod schemas, static templates, fallback scenarios, and seed fixtures - keeps API, worker, and web contracts from drifting.
2026-06-14 - Prisma enum values use uppercase database-safe names while shared metadata carries the design labels/slugs - matches the Prisma schema and preserves UI copy.
2026-06-14 - Added `prisma.config.ts` instead of package-level Prisma config - avoids the installed Prisma CLI deprecation path.
2026-06-14 - Seed data is deterministic and lifted from `Playground.dc.html` - Milestone 1 should not invent extra demo content.
2026-06-14 - Starting Milestone 2 with minimal web/api app shells - NextAuth token minting and Nest JWT verification need both sides of the boundary in place.
2026-06-14 - Used OAuth-backed NextAuth with GitHub env hooks for Milestone 2 - satisfies the spec's OAuth option without adding email verification-token tables.
2026-06-14 - Minted a short-lived `switchboard-api` JWT into the NextAuth session - Nest can validate API requests without reading browser cookies.
2026-06-14 - Built `@switchboard/shared` as CommonJS for now - the Nest API runtime imports shared auth helpers directly.
2026-06-14 - Starting Milestone 3 with shared read-model types first - API responses and server-rendered pages should stay contract-aligned.
2026-06-14 - Added scoped read endpoints for `/projects`, `/templates`, and `/activity` - all user-owned database reads go through the Nest JWT guard.
2026-06-14 - Server-rendered the read screens through the API client instead of importing Prisma in the web app - keeps writes and reads behind the gateway contract.
2026-06-14 - Added only a stable API keys placeholder route in Milestone 3 - BYOK CRUD and the full settings UI belong to Milestone 4.

## Open questions / blockers
None.
