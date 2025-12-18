# Vehiverze — Production TODO

This TODO is the long‑term tracker for getting Vehiverze to production.

## Priorities
- **P0** — Production blocker (security, data leakage, broken core flows)
- **P1** — Required for v1 launch (reliability, correctness, essential UX)
- **P2** — Post‑launch improvements (scale, polish, maintainability)
- **P3** — Nice‑to‑have

## Status
Use: `todo` · `in-progress` · `blocked` · `done` · `removed`

---

## Product Scope (Chosen for v1)

### Public website (v1)
- Browse offerings and learn about the brand
- Submit interest/leads (contact / buy enquiry)
- **Sell a vehicle** (submit details → schedule inspection)
- **Book a garage service** (choose vehicle → choose services → book slot)
- Blog / content pages

### Login (v1)
- **Phone number login using SMS OTP (Twilio)**
- Login is required for:
  - creating a booking/order
  - viewing personal booking/order status

### Admin panel (v1)
- **Private-only** (staff dashboard)
- Manage:
  - leads
  - sell orders
  - garage partners
  - garage service bookings
  - basic content (optional)

### Explicitly deferred (removed or post‑launch)
- Insurance purchase flows
- Live bidding / auction flows
- Online payment gateways and refunds (can start with cash/UPI recorded by staff)

---

## Milestone 0 — Stop Data Leaks & Fix Auth (P0)

### Authentication & sessions
- (P0, done) Replace forgeable cookie session with a signed session.
  - Migrated website auth to Better Auth: `apps/website/lib/auth.ts` + `apps/website/app/api/auth/[...all]/route.ts`
  - Added auth tables/migration: `packages/database/src/schema.ts` + `packages/database/drizzle/0001_better_auth.sql`
- (P0, done) Remove localStorage as the "truth" for auth.
  - `apps/website/hooks/use-auth.tsx` now uses Better Auth session (`useSession`) instead.
- (P0, done) Implement Twilio OTP end-to-end:
  - Twilio SMS integration in `apps/website/lib/auth.ts`
  - Rate limiting configured: 10 req/min general, 3 OTP req/min
  - Dev mode logs OTP to console; production sends via Twilio
  - Required env vars: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
- (P0, done) Do not return OTP code in API responses.
  - Deprecated legacy endpoints now return `410 Gone`: `apps/website/app/api/auth/otp/send/route.ts` + `apps/website/app/api/auth/otp/verify/route.ts`
- (P0, todo) Set `BETTER_AUTH_SECRET` in production env.

### Authorization (who can do what)
- (P0, done) Lock down all "lists everything" and "mutate anything" APIs.
  - Added `role` field to domain `user` table: `packages/database/drizzle/0002_user_role_and_nullable_partner.sql`
  - Created auth helpers in `apps/website/lib/domain-user.ts`: `requireAuth()`, `requireStaff()`, `requireAdmin()`
  - Protected routes:
    - `GET /api/leads` — staff-only
    - `GET /api/sell-orders` — staff-only
    - `GET/PATCH /api/sell-orders/[id]` — staff-only
    - `PUT/DELETE /api/garage/partners/[id]` — staff-only
    - `GET /api/garage/bookings` — staff-only
    - `GET/PUT/DELETE /api/garage/bookings/[id]` — staff-only
    - `GET/POST /api/garage/payments` — staff-only
    - `GET/POST /api/garage/notifications` — staff-only
    - `GET /api/garage/dashboard/stats` — staff-only
  - Public routes remain: lead submission, sell order submission, partner registration, partner listing

### Correctness (runtime breakers)
- (P0, done) Fix Drizzle `.where(undefined)` patterns.
  - Fixed in: `garage/partners`, `garage/bookings`, `garage/payments`, `garage/notifications`
  - Now uses conditional query building to avoid passing undefined to `.where()`
- (P0, done) Fix garage booking creation referencing a non-existent partner id.
  - Made `garagePartnerId` nullable in schema for manual staff assignment
  - Migration: `packages/database/drizzle/0002_user_role_and_nullable_partner.sql`

---

## Milestone 1 — Core Flows (P1)

### Admin panel stability
- (P1, done) Fix orders hydration mismatch (SSR/client date formatting).
  - Use deterministic formatter (UTC) in `apps/admin-panel/app/admin/orders/page.tsx`
  - Seed faker mock data in `apps/admin-panel/lib/mock-data.ts`

### Public website
- (P1, todo) Garage services booking flow uses real DB-backed catalog and partner assignment.
- (P1, todo) Sell vehicle flow persists a sell order and schedules inspection.
- (P1, todo) Customer can view their own booking/order status after login.

### Admin (private)
- (P1, todo) Staff login (private admin) with proper server-validated sessions.
- (P1, todo) Admin views and updates:
  - lead status
  - sell order status
  - garage partner verification
  - booking status (confirmed → in progress → completed/cancelled)

---

## Milestone 2 — Data Model Cleanup (P1/P2)

- (P1, todo) Choose one garage booking table and retire the legacy path.
  - Current: `garage_booking` (legacy) and `garage_service_booking` (new)
  - Schema: `packages/database/src/schema.ts`
- (P2, todo) Add retention/cleanup for OTP table (delete expired codes).
- (P2, todo) Add appropriate indexes based on real query patterns.

---

## Milestone 3 — Build Quality Gates (P1)

- (P1, done) Get `turbo lint` running again (no blocking errors).
  - Updated package ESLint configs for ESM (`.eslintrc.cjs`).
  - Fixed package lint globs (`eslint "src/**/*.{ts,tsx}"`).
  - Removed duplicate JSX props in premium selector components.

- (P1, todo) Remove `ignoreBuildErrors` / `ignoreDuringBuilds`.
  - Website: `apps/website/next.config.mjs`
  - Admin: `apps/admin-panel/next.config.mjs`
- (P1, todo) Pin runtime dependencies (avoid `latest` in production).
- (P1, todo) Align React + TypeScript types across all workspaces.
  - Current mismatch: `apps/admin-panel/package.json`
- (P1, todo) Add CI checks: lint, type-check, build.

---

## Milestone 4 — Safety & Operations (P2)

- (P2, done) Add rate limiting to public routes (OTP, leads, bookings).
  - Better Auth rate limiting configured in `apps/website/lib/auth.ts`
- (P2, todo) Add basic audit logging for admin actions.
- (P2, todo) Add error reporting and monitoring.
- (P2, todo) Add security headers and a safe content policy.

---

## Backlog (P3)

- (P3, todo) Improve content tooling for blog pages.
- (P3, todo) Add automated tests for the booking and OTP flows.
