import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST - Handle Razorpay webhook
export async function POST(request: NextRequest) {
    try {
        const { getFirebaseAdmin } = await import("@/lib/firebase-admin");

        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature") || "";
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

        // Verify webhook signature
        const expectedSignature = crypto
            .createHmac("sha256", webhookSecret)
            .update(body)
            .digest("hex");

        if (expectedSignature !== signature) {
            console.error("Webhook signature verification failed");
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const event = JSON.parse(body);
        const { db } = getFirebaseAdmin();

        switch (event.event) {
            case "payment.captured": {
                const payment = event.payload.payment.entity;
                const orderId = payment.order_id;
                const paymentId = payment.id;

                // Find application by order ID
                const appsSnapshot = await db
                    .collection("applications")
                    .where("razorpayOrderId", "==", orderId)
                    .limit(1)
                    .get();

                if (!appsSnapshot.empty) {
                    const appDoc = appsSnapshot.docs[0];
                    const appData = appDoc.data();

                    // Update payment status
                    await appDoc.ref.update({
                        paymentStatus: "paid",
                        razorpayPaymentId: paymentId,
                        paidAt: new Date(),
                        updatedAt: new Date(),
                    });

                    // Send confirmation email
                    if (appData) {
                        await sendEmail({
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
                                                ₹60 Paid Successfully
                                            </p>
                                        </div>
                                        
                                        <p style="color: #94a3b8;">
                                            We'll send you more details as we get closer to the event. Get ready for 9 intense days of building!
                                        </p>
                                    </div>
                                </div>
                            `,
                        });
                    }
                }
                break;
            }

            case "payment.failed": {
                const payment = event.payload.payment.entity;
                const orderId = payment.order_id;

                // Find and update application
                const appsSnapshot = await db
                    .collection("applications")
                    .where("razorpayOrderId", "==", orderId)
                    .limit(1)
                    .get();

                if (!appsSnapshot.empty) {
                    await appsSnapshot.docs[0].ref.update({
                        paymentStatus: "failed",
                        updatedAt: new Date(),
                    });
                }
                break;
            }

            case "order.paid": {
                // Order marked as paid - can be used as backup verification
                const order = event.payload.order.entity;
                const orderId = order.id;

                const appsSnapshot = await db
                    .collection("applications")
                    .where("razorpayOrderId", "==", orderId)
                    .limit(1)
                    .get();

                if (!appsSnapshot.empty) {
                    const appData = appsSnapshot.docs[0].data();
                    if (appData.paymentStatus !== "paid") {
                        await appsSnapshot.docs[0].ref.update({
                            paymentStatus: "paid",
                            paidAt: new Date(),
                            updatedAt: new Date(),
                        });
                    }
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
