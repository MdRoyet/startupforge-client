import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server */
  // 🎯 THE FIX: Use the live Vercel URL in production, or fallback to localhost for local dev!
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    "https://startupforge-client-kappa.vercel.app",
});

// Extract methods directly from the configured instance
export const { signIn, signUp, useSession, signOut } = authClient;
