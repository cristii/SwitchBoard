# Progress

## Current focus
Milestone 2: Auth (NextAuth -> Nest JWT guard).

## Milestones
- [x] 1. Scaffold monorepo (pnpm + Turbo), shared package, Prisma schema + seed
- [ ] 2. Auth (NextAuth -> Nest JWT guard)
- [ ] 3. Library / Templates / Activity read screens
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
2026-06-14 - Extracted `SwitchBoard.zip` in place - the workspace contained the archive but not the spec/UI files at repo root.
2026-06-14 - Shared package owns enums, Zod schemas, static templates, fallback scenarios, and seed fixtures - keeps API, worker, and web contracts from drifting.
2026-06-14 - Prisma enum values use uppercase database-safe names while shared metadata carries the design labels/slugs - matches the Prisma schema and preserves UI copy.
2026-06-14 - Added `prisma.config.ts` instead of package-level Prisma config - avoids the installed Prisma CLI deprecation path.
2026-06-14 - Seed data is deterministic and lifted from `Playground.dc.html` - Milestone 1 should not invent extra demo content.

## Open questions / blockers
None.
