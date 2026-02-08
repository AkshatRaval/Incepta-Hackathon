import { NextRequest } from "next/server";
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let app: App | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// Initialize Firebase Admin lazily
const getFirebaseAdmin = () => {
    if (!app && getApps().length === 0) {
        const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

        if (!serviceAccountKey || serviceAccountKey === "{}") {
            throw new Error("Firebase service account key not configured");
        }

        try {
            const serviceAccount = JSON.parse(serviceAccountKey);
            app = initializeApp({
                credential: cert(serviceAccount),
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            });
        } catch (error) {
            console.error("Failed to initialize Firebase Admin:", error);
            throw new Error("Failed to initialize Firebase Admin");
        }
    } else if (getApps().length > 0 && !app) {
        app = getApps()[0];
    }

    if (!auth) {
        auth = getAuth(app!);
    }
    if (!db) {
        db = getFirestore(app!);
    }

    return { auth, db };
};

// Verify Firebase token
export async function verifyToken(token: string) {
    try {
        const { auth } = getFirebaseAdmin();
        const decodedToken = await auth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}

// Get user from request
export async function getUserFromRequest(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split("Bearer ")[1];
    return verifyToken(token);
}

export function isAdminEmail(email: string | undefined) {
    if (!email) return false;
    const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
    return adminEmails.includes(email);
}

export { getFirebaseAdmin };