import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated" },
        { status: 401 },
      );
    }

    const tokenPayload = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role || "Collaborator",
    };

    const secureToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      success: true,
      user: tokenPayload,
      token: secureToken,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
