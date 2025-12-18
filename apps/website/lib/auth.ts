import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { toNextJsHandler } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import { headers } from "next/headers";
import { db } from "@vehiverze/database";
import * as schema from "@vehiverze/database/schema";
import twilio from "twilio";

// Initialize Twilio client (lazy to avoid errors if env vars not set)
function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    return null;
  }

  return twilio(accountSid, authToken);
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    // Map Better Auth to our dedicated auth_* tables
    schema: {
      ...schema,
      user: schema.authUsers,
      session: schema.authSessions,
      account: schema.authAccounts,
      verification: schema.authVerifications,
    },
  }),
  rateLimit: {
    enabled: true,
    window: 60, // 60 seconds
    max: 10, // 10 requests per window
    customRules: {
      // Stricter rate limiting for OTP sending
      "/send-otp": {
        window: 60,
        max: 3, // 3 OTP requests per minute per IP
      },
    },
  },
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber: phone, code }) => {
        // In development, log OTP to console
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.info(`[DEV OTP] ${phone}: ${code}`);
          return;
        }

        // In production, send via Twilio
        const client = getTwilioClient();
        const fromNumber = process.env.TWILIO_PHONE_NUMBER;

        if (!client || !fromNumber) {
          console.error(
            "Twilio not configured. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER."
          );
          throw new Error("SMS service not configured");
        }

        try {
          await client.messages.create({
            body: `Your Vehiverze verification code is: ${code}. This code expires in 5 minutes.`,
            from: fromNumber,
            to: phone,
          });
        } catch (error) {
          console.error("Failed to send OTP via Twilio:", error);
          throw new Error("Failed to send verification code");
        }
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumberValue) =>
          `${phoneNumberValue.replace(/[^0-9]/g, "")}@vehiverze.local`,
        getTempName: (phoneNumberValue) => phoneNumberValue,
      },
    }),
  ],
});

export const { GET, POST } = toNextJsHandler(auth);

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}
