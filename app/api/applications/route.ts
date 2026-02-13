import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdmin, getUserFromRequest, isAdminEmail } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

// Generate next sequential application ID (e.g., INCEPTA00001)
async function generateApplicationId(db: FirebaseFirestore.Firestore): Promise<string> {
    const counterRef = db.collection("counters").doc("applications");

    // Use transaction to safely increment counter
    const newCount = await db.runTransaction(async (transaction) => {
        const counterDoc = await transaction.get(counterRef);

        let currentCount = 0;
        if (counterDoc.exists) {
            currentCount = counterDoc.data()?.count || 0;
        }

        const nextCount = currentCount + 1;
        transaction.set(counterRef, { count: nextCount }, { merge: true });

        return nextCount;
    });

    // Format as INCEPTA00001, INCEPTA00002, etc.
    const paddedNumber = String(newCount).padStart(5, "0");
    return `INCEPTA${paddedNumber}`;
}

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

        // Generate sequential application ID
        const inceptaId = await generateApplicationId(db);

        const applicationData = {
            ...data,
            inceptaId,
            userId: user.uid,
            email: user.email,
            paymentStatus: "unpaid",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Use inceptaId as the document ID
        await db.collection("applications").doc(inceptaId).set(applicationData);

        return NextResponse.json({
            success: true,
            applicationId: inceptaId,
            inceptaId,
            message: "Application submitted successfully"
        });
    } catch (error) {
        console.error("Error creating application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
