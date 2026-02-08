"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    User,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signOut: () => Promise<void>;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

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

    const signInWithGithub = async () => {
        if (!auth) {
            console.error("Firebase auth not initialized");
            return;
        }
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (error) {
            console.error("GitHub sign in error:", error);
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
            value={{ user, loading, signInWithGoogle, signInWithGithub, signOut, isAdmin }}
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
