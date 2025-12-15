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
- (P0, todo) Replace forgeable cookie session with a signed session.
  - Current: unsigned JSON stored in cookie: `apps/website/lib/auth.ts`
- (P0, todo) Remove localStorage as the “truth” for auth.
  - Current: `apps/website/hooks/use-auth.tsx`
- (P0, todo) Implement Twilio OTP end-to-end:
  - send OTP via SMS (Twilio)
  - verify OTP and create session
  - enforce expiry and attempt limits
- (P0, todo) Do not return OTP code in API responses.

### Authorization (who can do what)
- (P0, todo) Lock down all “lists everything” and “mutate anything” APIs.
  - Leads and sell orders must not be publicly listable.
  - Garage partners/bookings/payments/notifications stats must be staff-only.

### Correctness (runtime breakers)
- (P0, todo) Fix Drizzle `.where(undefined)` patterns.
  - Example: `apps/website/app/api/garage/partners/route.ts`
- (P0, todo) Fix garage booking creation referencing a non-existent partner id.
  - Current insert uses `garagePartnerId: "default-garage-id"`.

---

## Milestone 1 — Core Flows (P1)

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

- (P2, todo) Add rate limiting to public routes (OTP, leads, bookings).
- (P2, todo) Add basic audit logging for admin actions.
- (P2, todo) Add error reporting and monitoring.
- (P2, todo) Add security headers and a safe content policy.

---

## Backlog (P3)

- (P3, todo) Improve content tooling for blog pages.
- (P3, todo) Add automated tests for the booking and OTP flows.
