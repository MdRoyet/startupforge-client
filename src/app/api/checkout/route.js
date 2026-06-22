import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";

// Stable Price ID mapping values matching your Sandbox environment
const STRIPE_PRICES = {
  collaborator: "price_1TlBc6CgNBR0iE9DkTIFvS07",
  founder: "price_1TlBcoCgNBR0iE9DrOAYRAzZ",
};

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Initialize parameters safely
    let role = "";
    let email = "";
    const contentType = request.headers.get("content-type") || "";

    // Extract both role and email safely regardless of payload encoding type
    if (contentType.includes("application/json")) {
      const body = await request.json();
      role = body.role;
      email = body.email; // 🧠 Extracted from client-side JSON request body payload
    } else {
      const formData = await request.formData();
      role = formData.get("role");
      email = formData.get("email"); // 🧠 Extracted from native HTML hidden input node values
    }

    // Normalize formatting check
    const normalizedRole = role?.toLowerCase().trim();
    const activePriceId = STRIPE_PRICES[normalizedRole];

    if (!activePriceId) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid or missing billing role attribute: "${role}"`,
        },
        { status: 400 },
      );
    }

    // Create Checkout Sessions using the resolved Sandbox Price ID and locked email
    const session = await stripe.checkout.sessions.create({
      customer_email: email ? email.trim() : undefined,
      line_items: [
        {
          price: activePriceId,
          quantity: 1,
        },
      ],
      mode: "subscription",

      // 🎯 STEP 1: Attach your custom role parameter to the ledger metadata box
      metadata: {
        role: normalizedRole, // Stores "founder" or "collaborator" inside Stripe
      },

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard`,
    });

    // If triggered by a standard HTML <form action="..." method="POST">
    if (!contentType.includes("application/json")) {
      return NextResponse.redirect(session.url, 303);
    }

    // If triggered via an asynchronous client-side fetch() handler engine
    return NextResponse.json({ success: true, url: session.url });
  } catch (err) {
    console.error("Stripe gateway initialization exception:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
