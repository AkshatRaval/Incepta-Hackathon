import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdmin, getUserFromRequest, isAdminEmail } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// GET - Fetch all applications (admin only)
export async function GET(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);

        if (!user || !isAdminEmail(user.email)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { db } = getFirebaseAdmin();
        const snapshot = await db
            .collection("applications")
            .orderBy("createdAt", "desc")
            .get();

        const applications = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({ applications });
    } catch (error) {
        console.error("Error fetching applications:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST - Create new application
export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { db } = getFirebaseAdmin();

        // Check if user already applied
        const existingApp = await db
            .collection("applications")
            .where("email", "==", user.email)
            .limit(1)
            .get();

        if (!existingApp.empty) {
            return NextResponse.json(
                { error: "You have already submitted an application" },
                { status: 400 }
            );
        }

        const data = await request.json();

        const applicationData = {
            ...data,
            userId: user.uid,
            email: user.email,
            status: "pending",
            paymentStatus: "unpaid",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const docRef = await db.collection("applications").add(applicationData);

        return NextResponse.json({
            success: true,
            applicationId: docRef.id,
            message: "Application submitted successfully"
        });
    } catch (error) {
        console.error("Error creating application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
