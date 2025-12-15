# Vehiverze

Vehiverze is a customer‑facing website and a private staff dashboard.

## What you can do on the website

- **Browse** what Vehiverze offers and learn about services
- **Sell a vehicle** by submitting details and requesting an inspection
- **Book a garage service** for your vehicle by choosing services and a time slot
- **Get updates** on your requests and bookings after you sign in

## How sign-in works

Sign-in uses your **phone number**.
- You request a one‑time code (OTP)
- The code is sent by SMS using **Twilio**
- After you enter the code, you are signed in and can view your own booking/order updates

## Staff dashboard (private)

The admin panel is **private-only** and meant for internal staff.
It is used to:
- review and update leads
- manage sell orders and inspection scheduling
- manage garage partners
- manage garage service bookings and statuses

## Main flow (simple overview)

1. A customer visits the website.
2. They either:
   - book a garage service, or
   - submit details to sell a vehicle, or
   - request a call-back / leave an enquiry.
3. If they need to track progress, they sign in with an SMS code.
4. Staff uses the private dashboard to respond, schedule, and update statuses.

## Project status

This repository is being prepared for production.
See `TODO.md` for the long-term plan and priorities.
