import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Lazy initialization to avoid build-time errors
let stripe: Stripe | null = null;

function getStripe() {
    if (!stripe) {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
    }
    return stripe;
}

// POST - Create payment session
export async function POST(request: NextRequest) {
    try {
        // Lazy import to avoid build-time initialization
        const { getFirebaseAdmin, getUserFromRequest } = await import("@/lib/firebase-admin");

        const user = await getUserFromRequest(request);

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { applicationId } = await request.json();

        if (!applicationId) {
            return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
        }

        const { db } = getFirebaseAdmin();

        // Get application
        const appDoc = await db.collection("applications").doc(applicationId).get();

        if (!appDoc.exists) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        const appData = appDoc.data();

        if (appData?.userId !== user.uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (appData?.paymentStatus === "paid") {
            return NextResponse.json({ error: "Payment already completed" }, { status: 400 });
        }

        // Create Stripe checkout session
        const session = await getStripe().checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "INCEPTA 2026 Registration",
                            description: "48-hour hackathon registration fee",
                            images: [`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`],
                        },
                        unit_amount: 49900, // ₹499 in paise
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/apply/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/apply?step=6&cancelled=true`,
            customer_email: user.email || undefined,
            metadata: {
                applicationId,
                userId: user.uid,
            },
        });

        // Update application with payment session
        await db.collection("applications").doc(applicationId).update({
            stripeSessionId: session.id,
            updatedAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            sessionId: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error("Error creating payment session:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
