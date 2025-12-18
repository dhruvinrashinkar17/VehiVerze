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
- (P1, done) Garage services booking flow uses real DB-backed catalog and partner assignment.
  - **Note:** Service catalog remains hardcoded (no DB table), but booking submission now works correctly.
  - Fixed `apps/website/app/garage-services/checkout/CheckoutClient.tsx`:
    - Was using `setTimeout` with `localStorage` to simulate booking (broken)
    - Now calls `POST /api/garage/bookings` with all vehicle and booking data
    - Clears localStorage on success and redirects to success page with booking ID
    - Added loading states and error handling with toast notifications
  - Partner assignment is manual (staff assigns via admin panel after booking is created)
- (P1, done) Sell vehicle flow persists a sell order and schedules inspection.
  - Fixed `apps/website/components/sell-final-checkout.tsx`:
    - Was using `setTimeout` with `localStorage` to simulate submission (broken)
    - Now calls `POST /api/sell-orders` with all vehicle data from sessionStorage
    - Includes: vehicleType, brand, model, variant, year, kilometers, condition, location
    - Includes: sellerName, sellerEmail, sellerPhone, sellerAddress
    - Includes: inspectionDate, inspectionTime, inspectionAddress, estimatedPriceMin/Max
    - Added loading states, error handling, and condition-based price estimation
    - Clears sessionStorage on success and shows celebration before redirect
- (P1, done) Customer can view their own booking/order status after login.
  - Created customer-facing API routes:
    - `GET /api/garage/bookings/mine` — returns bookings matching user's phone
    - `GET /api/sell-orders/mine` — returns sell orders matching user's phone
  - Customer dashboard at `apps/website/app/dashboard/page.tsx`:
    - Shows quick stats (total bookings, orders, active bookings, pending orders)
    - Lists garage service bookings with status badges
    - Lists sell orders with inspection dates and price estimates
    - Auth-gated (redirects to login if not authenticated)

### Admin (private)
- (P1, done) Staff login (private admin) with proper server-validated sessions.
  - Better Auth client in `apps/admin-panel/lib/auth-client.ts` connects to website's auth API
  - Auth hook with role checking in `apps/admin-panel/hooks/use-auth.tsx`
  - AuthProvider context in `apps/admin-panel/components/auth-provider.tsx`
  - Route protection middleware in `apps/admin-panel/middleware.ts`
  - OTP login page with role verification in `apps/admin-panel/app/login/page.tsx`
  - Admin layout checks role client-side with loading/error states
  - User role verification via `GET /api/auth/me` endpoint
- (P1, done) Admin views and updates:
  - lead status — `GET/PATCH /api/leads/[id]` (staff-only)
  - sell order status — `GET/PATCH /api/sell-orders/[id]` (staff-only)
  - garage partner verification — `GET/PUT /api/garage/partners/[id]` (staff-only)
  - booking status (confirmed → in progress → completed/cancelled) — `GET/PUT /api/garage/bookings/[id]` (staff-only)
- (P1, done) Admin panel pages now fetch from real API instead of mock data:
  - `apps/admin-panel/lib/api.ts` — API client with typed functions
  - `apps/admin-panel/app/admin/leads/page.tsx` — fetches from `/api/leads`
  - `apps/admin-panel/app/admin/vendors/page.tsx` — fetches from `/api/garage/partners`
  - `apps/admin-panel/app/admin/orders/page.tsx` — fetches from `/api/garage/bookings` + `/api/sell-orders` with tabs

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
