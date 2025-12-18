import { createAuthClient } from "better-auth/react";
import { phoneNumberClient } from "better-auth/client/plugins";

// Admin panel auth client - connects to the website's auth API
// In production, both apps are on the same domain so cookies are shared
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000",
  plugins: [phoneNumberClient()],
});

export const { useSession } = authClient;
