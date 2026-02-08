import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdmin, getUserFromRequest, isAdminEmail } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// PATCH - Update application status (admin only)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getUserFromRequest(request);

        if (!user || !isAdminEmail(user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { status } = await request.json();

        if (!["pending", "approved", "rejected"].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const { db } = getFirebaseAdmin();
        await db.collection("applications").doc(id).update({
            status,
            updatedAt: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// GET - Get single application
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getUserFromRequest(request);

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { db } = getFirebaseAdmin();
        const doc = await db.collection("applications").doc(id).get();

        if (!doc.exists) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        const data = doc.data();

        // Only allow users to see their own application, or admins to see any
        if (data?.userId !== user.uid && !isAdminEmail(user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.json({ application: { id: doc.id, ...data } });
    } catch (error) {
        console.error("Error fetching application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
