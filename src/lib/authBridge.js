const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://startupforge-server-ten.vercel.app";

export const syncJwtWithBackend = async () => {
  try {
    const tokenRes = await fetch("/api/auth/token", {
      credentials: "include",
    });

    const tokenResult = await tokenRes.json();

    if (!tokenRes.ok || !tokenResult.token) {
      console.error("JWT token fetch failed:", tokenResult.error);
      return false;
    }

    const response = await fetch(`${API_BASE}/api/auth/sync-token`, {
      method: "POST",

      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: tokenResult.token }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("JWT Sync failed:", result.error);
      return false;
    }

    console.log("JWT Synced successfully! Express routes are now unlocked.");
    return true;
  } catch (error) {
    console.error("Network error during JWT sync:", error);
    return false;
  }
};
