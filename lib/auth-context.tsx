"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    User,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();

// Admin emails - in production, check this server-side
const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAdmin = user?.email ? ADMIN_EMAILS.includes(user.email) : false;

    useEffect(() => {
        // If auth is not initialized, set loading to false
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        if (!auth) {
            console.error("Firebase auth not initialized");
            return;
        }
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google sign in error:", error);
            throw error;
        }
    };

    const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
        if (!auth) {
            throw new Error("Firebase auth not initialized");
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Set display name if provided
            if (displayName && userCredential.user) {
                await updateProfile(userCredential.user, { displayName });
            }
        } catch (error) {
            console.error("Email sign up error:", error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        if (!auth) {
            throw new Error("Firebase auth not initialized");
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Email sign in error:", error);
            throw error;
        }
    };

    const signOut = async () => {
        if (!auth) {
            console.error("Firebase auth not initialized");
            return;
        }
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Sign out error:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, signInWithGoogle, signUpWithEmail, signInWithEmail, signOut, isAdmin }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
