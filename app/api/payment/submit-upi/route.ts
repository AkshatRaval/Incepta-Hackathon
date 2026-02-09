import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdmin, getUserFromRequest } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// POST - Submit UPI transaction ID for manual verification
export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { applicationId, transactionId } = await request.json();

        if (!applicationId || !transactionId) {
            return NextResponse.json(
                { error: "Application ID and Transaction ID are required" },
                { status: 400 }
            );
        }

        // Basic transaction ID validation (UPI transaction IDs are usually 12-35 characters)
        if (transactionId.length < 8 || transactionId.length > 50) {
            return NextResponse.json(
                { error: "Invalid transaction ID format" },
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

        const applicationData = applicationDoc.data();

        // Verify this application belongs to the user
        if (applicationData?.userId !== user.uid) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Update application with transaction ID (payment pending verification)
        await applicationRef.update({
            upiTransactionId: transactionId,
            paymentStatus: "pending_verification",
            paymentSubmittedAt: new Date(),
            updatedAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            message: "Payment submitted for verification. We'll verify within 24 hours.",
        });
    } catch (error) {
        console.error("Error submitting payment:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
