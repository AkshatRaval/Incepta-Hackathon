import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdmin, getUserFromRequest } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// GET - Get current user's application
export async function GET(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);

        if (!user || !user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { db } = getFirebaseAdmin();

        const snapshot = await db
            .collection("applications")
            .where("email", "==", user.email)
            .orderBy("createdAt", "desc")
            .limit(1)
            .get();

        if (snapshot.empty) {
            return NextResponse.json({ application: null });
        }

        const doc = snapshot.docs[0];
        return NextResponse.json({
            application: {
                id: doc.id,
                ...doc.data(),
            },
        });
    } catch (error) {
        console.error("Error fetching user application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
