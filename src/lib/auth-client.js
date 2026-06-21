import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server */
  baseURL: "http://localhost:3000",
});

// Extract methods directly from the configured instance
export const { signIn, signUp, useSession, signOut } = authClient;
