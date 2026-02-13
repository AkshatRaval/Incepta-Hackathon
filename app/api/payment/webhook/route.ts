import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto"; // Razorpay specific
import { getFirebaseAdmin } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// POST - Handle Payment Webhook (Currently Disabled / Placeholder for Instamojo)
export async function POST(request: NextRequest) {
    try {
        // NOTE: Razorpay logic disabled for Instamojo migration.
        // Instamojo webhooks have a different payload structure and verification method.
        // For now, we rely on the manual "Enter Transaction ID" flow in the frontend.

        console.log("Payment webhook received (Instamojo migration in progress).");

        /* 
        // RAZORPAY LEGACY LOGIC - KEEPING FOR REFERENCE IF NEEDED
        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature") || "";
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

        // Verify webhook signature...
        */

        return NextResponse.json({ message: "Webhook endpoint active (Instamojo pending)" });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
