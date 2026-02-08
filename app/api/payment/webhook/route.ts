import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Force dynamic - this route should never be statically analyzed
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

export async function POST(request: NextRequest) {
    try {
        // Lazy import to avoid build-time initialization
        const { getFirebaseAdmin } = await import("@/lib/firebase-admin");

        const body = await request.text();
        const signature = request.headers.get("stripe-signature") || "";
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

        let event: Stripe.Event;

        try {
            event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err) {
            console.error("Webhook signature verification failed:", err);
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const { db } = getFirebaseAdmin();

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const { applicationId } = session.metadata || {};

                if (applicationId) {
                    // Update application payment status
                    await db.collection("applications").doc(applicationId).update({
                        paymentStatus: "paid",
                        stripePaymentId: session.payment_intent,
                        paidAt: new Date(),
                        updatedAt: new Date(),
                    });

                    // Get application details for email
                    const appDoc = await db.collection("applications").doc(applicationId).get();
                    const appData = appDoc.data();

                    // Send payment confirmation email
                    if (process.env.RESEND_API_KEY && appData) {
                        await fetch("https://api.resend.com/emails", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                            },
                            body: JSON.stringify({
                                from: process.env.EMAIL_FROM || "noreply@incepta.dev",
                                to: appData.email,
                                subject: "✅ Payment Confirmed - INCEPTA 2026",
                                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #020617;">
                    <div style="text-align: center; margin-bottom: 30px;">
                      <h1 style="color: #4ade80; font-size: 32px; margin: 0;">Payment Successful!</h1>
                    </div>
                    
                    <div style="background: #0f172a; border-radius: 16px; padding: 30px; border: 1px solid #4ade80;">
                      <h2 style="color: #f1f5f9; margin-top: 0;">Hey ${appData.firstName}! 🎉</h2>
                      
                      <p style="color: #94a3b8; line-height: 1.6;">
                        Your registration for <strong style="color: #22d3ee;">INCEPTA 2026</strong> is now complete!
                      </p>
                      
                      <div style="background: #1e293b; border-radius: 12px; padding: 20px; margin: 20px 0;">
                        <p style="color: #4ade80; margin: 0; font-size: 20px; font-weight: bold;">
                          ₹499 Paid Successfully
                        </p>
                      </div>
                      
                      <p style="color: #94a3b8;">
                        We'll send you more details as we get closer to the event. Get ready to build something amazing!
                      </p>
                    </div>
                  </div>
                `,
                            }),
                        });
                    }
                }
                break;
            }

            case "checkout.session.expired": {
                const session = event.data.object as Stripe.Checkout.Session;
                const { applicationId } = session.metadata || {};

                if (applicationId) {
                    await db.collection("applications").doc(applicationId).update({
                        paymentStatus: "expired",
                        updatedAt: new Date(),
                    });
                }
                break;
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
