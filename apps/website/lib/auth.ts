import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { toNextJsHandler } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import { headers } from "next/headers";
import { db } from "@vehiverze/database";
import * as schema from "@vehiverze/database/schema";

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
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        // TODO: integrate SMS provider.
        // Intentionally do not return OTP in API responses.
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.info(`[DEV OTP] ${phoneNumber}: ${code}`);
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
