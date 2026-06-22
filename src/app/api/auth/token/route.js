import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // 1. Fetch the authenticated session details from Better-Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated" },
        { status: 401 },
      );
    }

    // 2. Package the user metadata into the token payload
    const tokenPayload = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role || "Collaborator",
    };

    // 3. Sign the token using your shared secret (Expires in 7 days)
    const secureToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({ success: true, user: tokenPayload });

    // 4. Drop the signed JWT token back into an HTTP-Only Cookie
    response.cookies.set("startupforge_jwt", secureToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
