import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdmin, getUserFromRequest, isAdminEmail } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// POST - Verify a UPI payment (admin only)
export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);

        if (!user || !isAdminEmail(user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { applicationId, action } = await request.json();

        if (!applicationId || !action) {
            return NextResponse.json(
                { error: "Application ID and action are required" },
                { status: 400 }
            );
        }

        if (!["approve", "reject"].includes(action)) {
            return NextResponse.json(
                { error: "Invalid action. Must be 'approve' or 'reject'" },
                { status: 400 }
            );
        }

        const { db } = getFirebaseAdmin();
        const applicationRef = db.collection("applications").doc(applicationId);
        const applicationDoc = await applicationRef.get();

        if (!applicationDoc.exists) {
            return NextResponse.json(
                { error: "Application not found" },
                { status: 404 }
            );
        }

        if (action === "approve") {
            await applicationRef.update({
                paymentStatus: "paid",
                paymentVerifiedAt: new Date(),
                paymentVerifiedBy: user.email,
                updatedAt: new Date(),
            });
            return NextResponse.json({
                success: true,
                message: "Payment verified and approved",
            });
        } else {
            await applicationRef.update({
                paymentStatus: "rejected",
                paymentRejectedAt: new Date(),
                paymentRejectedBy: user.email,
                updatedAt: new Date(),
            });
            return NextResponse.json({
                success: true,
                message: "Payment rejected",
            });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
