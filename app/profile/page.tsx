"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { NeuralBackground } from "@/components/effects/neural-background";
import Link from "next/link";
import {
    User,
    Mail,
    MapPin,
    Github,
    Linkedin,
    Globe,
    Users,
    Clock,
    CheckCircle,
    LogOut,
    Shield,
    ArrowRight,
    Briefcase,
    GraduationCap,
    Code,
    CreditCard,
    AlertCircle,
} from "lucide-react";

// Reusable styles
const cardStyle: React.CSSProperties = {
    background: "var(--bg-elevated)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid var(--border-default)",
    borderRadius: "1.5rem",
    padding: "1.5rem",
};

const btnPrimaryStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    fontWeight: 600,
    fontSize: "1rem",
    background: "var(--gradient-primary)",
    color: "#000",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
};

const btnSecondaryStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    fontWeight: 600,
    fontSize: "0.875rem",
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-default)",
    color: "var(--text-primary)",
    cursor: "pointer",
    textDecoration: "none",
};

const iconBoxStyle: React.CSSProperties = {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "0.75rem",
    background: "var(--bg-elevated)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-muted)",
    flexShrink: 0,
};

interface Application {
    id: string;
    inceptaId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    educationLevel: string;
    institution: string;
    fieldOfStudy: string;
    experienceLevel: string;
    primarySkill: string;
    programmingLanguages: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
    teamPreference: string;
    teamName?: string;
    paymentStatus: "paid" | "unpaid" | "pending_verification" | "rejected";
    upiTransactionId?: string;
    createdAt: { seconds: number };
}

export default function ProfilePage() {
    const { user, loading, signInWithGoogle, signOut, isAdmin } = useAuth();
    const [application, setApplication] = useState<Application | null>(null);
    const [loadingApp, setLoadingApp] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchApplication = async () => {
            if (!user?.email || !db) return;
            setLoadingApp(true);
            try {
                const q = query(
                    collection(db, "applications"),
                    where("email", "==", user.email),
                    orderBy("createdAt", "desc")
                );
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    const doc = snapshot.docs[0];
                    setApplication({ id: doc.id, ...doc.data() } as Application);
                }
            } catch (error) {
                console.error("Error fetching application:", error);
            } finally {
                setLoadingApp(false);
            }
        };
        if (user) fetchApplication();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return (
            <>
                <NeuralBackground />
                <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
                        <div style={{ ...cardStyle, padding: "2.5rem", textAlign: "center" }}>
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                style={{ background: "var(--gradient-primary)" }}
                            >
                                <span className="text-2xl font-bold text-white">I</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Sign In to INCEPTA</h2>
                            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>Sign in to view your application and profile</p>

                            <button
                                onClick={signInWithGoogle}
                                className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            <p className="text-sm mt-8" style={{ color: "var(--text-muted)" }}>
                                Don&apos;t have an application yet? <Link href="/apply" style={{ color: "var(--accent)" }} className="hover:underline">Apply now</Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </>
        );
    }

    const isPaid = application?.paymentStatus === "paid";

    return (
        <>
            <NeuralBackground />
            <div className="relative z-10 min-h-screen py-28 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
                    >
                        <div className="flex items-center gap-4">
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-2xl"
                                    style={{ border: "2px solid var(--accent)" }}
                                />
                            ) : (
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                    style={{ background: "var(--gradient-primary)" }}
                                >
                                    <User className="w-8 h-8 text-white" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{user.displayName || "Welcome"}</h1>
                                <p style={{ color: "var(--text-muted)" }}>{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {isAdmin && (
                                <button onClick={() => router.push("/admin")} style={btnSecondaryStyle}>
                                    <Shield className="w-4 h-4" />
                                    Admin
                                </button>
                            )}
                            <button onClick={signOut} style={btnSecondaryStyle}>
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>

                    {loadingApp ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
                        </div>
                    ) : application ? (
                        <div className="space-y-6">
                            {/* Participant ID Card */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <div
                                    style={{
                                        ...cardStyle,
                                        background: isPaid ? "rgba(52, 211, 153, 0.1)" : application.paymentStatus === "pending_verification" ? "rgba(59, 130, 246, 0.1)" : "rgba(251, 191, 36, 0.1)",
                                        borderColor: isPaid ? "rgba(52, 211, 153, 0.3)" : application.paymentStatus === "pending_verification" ? "rgba(59, 130, 246, 0.3)" : "rgba(251, 191, 36, 0.3)"
                                    }}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
                                                Participant ID
                                            </p>
                                            <p className="text-2xl font-mono font-bold tracking-wider" style={{ color: "var(--accent)" }}>
                                                {application.inceptaId || "PENDING"}
                                            </p>
                                            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                                                Applied on {new Date(application.createdAt.seconds * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                                            </p>
                                        </div>
                                        {isPaid ? (
                                            <div
                                                className="flex items-center gap-2 px-4 py-2 rounded-full"
                                                style={{
                                                    background: "rgba(52, 211, 153, 0.15)",
                                                    border: "1px solid rgba(52, 211, 153, 0.3)"
                                                }}
                                            >
                                                <CheckCircle className="w-5 h-5" style={{ color: "var(--accent)" }} />
                                                <span className="font-semibold" style={{ color: "var(--accent)" }}>
                                                    Registered
                                                </span>
                                            </div>
                                        ) : application.paymentStatus === "pending_verification" ? (
                                            <div className="flex flex-col items-end gap-2">
                                                <div
                                                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                                                    style={{
                                                        background: "rgba(59, 130, 246, 0.15)",
                                                        border: "1px solid rgba(59, 130, 246, 0.3)"
                                                    }}
                                                >
                                                    <Clock className="w-5 h-5" style={{ color: "#3b82f6" }} />
                                                    <span className="font-semibold" style={{ color: "#3b82f6" }}>
                                                        Verifying Payment
                                                    </span>
                                                </div>
                                                {application.upiTransactionId && (
                                                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                        Transaction ID: {application.upiTransactionId}
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-end gap-2">
                                                <div
                                                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                                                    style={{
                                                        background: "rgba(251, 191, 36, 0.15)",
                                                        border: "1px solid rgba(251, 191, 36, 0.3)"
                                                    }}
                                                >
                                                    <AlertCircle className="w-5 h-5" style={{ color: "#fbbf24" }} />
                                                    <span className="font-semibold" style={{ color: "#fbbf24" }}>
                                                        Payment Pending
                                                    </span>
                                                </div>
                                                <Link
                                                    href="/apply?step=6"
                                                    className="text-sm flex items-center gap-1 hover:underline"
                                                    style={{ color: "var(--accent)" }}
                                                >
                                                    <CreditCard className="w-4 h-4" />
                                                    Complete Payment
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Personal Info */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <div style={cardStyle}>
                                    <h3 className="font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                                        <User className="w-5 h-5" style={{ color: "var(--accent)" }} />
                                        Personal Information
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div className="flex items-center gap-3">
                                            <div style={iconBoxStyle}><User className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Full Name</p>
                                                <p className="font-medium" style={{ color: "var(--text-primary)" }}>{application.firstName} {application.lastName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div style={iconBoxStyle}><Mail className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Email</p>
                                                <p className="font-medium" style={{ color: "var(--text-primary)" }}>{application.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div style={iconBoxStyle}><MapPin className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Location</p>
                                                <p className="font-medium" style={{ color: "var(--text-primary)" }}>{application.city}, {application.country}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div style={iconBoxStyle}><GraduationCap className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Institution</p>
                                                <p className="font-medium" style={{ color: "var(--text-primary)" }}>{application.institution}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Technical Profile */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <div style={cardStyle}>
                                    <h3 className="font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                                        <Code className="w-5 h-5" style={{ color: "var(--accent)" }} />
                                        Technical Profile
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                                        <div className="flex items-center gap-3">
                                            <div style={iconBoxStyle}><Briefcase className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Primary Skill</p>
                                                <p className="font-medium capitalize" style={{ color: "var(--text-primary)" }}>{application.primarySkill?.replace("-", " ")}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div style={iconBoxStyle}><Clock className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Experience Level</p>
                                                <p className="font-medium capitalize" style={{ color: "var(--text-primary)" }}>{application.experienceLevel}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Programming Languages</p>
                                        <div className="flex flex-wrap gap-2">
                                            {application.programmingLanguages?.split(",").map((lang) => (
                                                <span
                                                    key={lang.trim()}
                                                    className="px-3 py-1 rounded-full text-sm"
                                                    style={{
                                                        background: "rgba(52, 211, 153, 0.1)",
                                                        color: "var(--accent)",
                                                        border: "1px solid rgba(52, 211, 153, 0.2)"
                                                    }}
                                                >
                                                    {lang.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {(application.github || application.linkedin || application.portfolio) && (
                                        <div className="flex flex-wrap gap-4 pt-5" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                                            {application.github && (
                                                <a
                                                    href={application.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                                                    style={{ color: "var(--text-muted)" }}
                                                >
                                                    <Github className="w-5 h-5" /> GitHub
                                                </a>
                                            )}
                                            {application.linkedin && (
                                                <a
                                                    href={application.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                                                    style={{ color: "var(--text-muted)" }}
                                                >
                                                    <Linkedin className="w-5 h-5" /> LinkedIn
                                                </a>
                                            )}
                                            {application.portfolio && (
                                                <a
                                                    href={application.portfolio}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                                                    style={{ color: "var(--text-muted)" }}
                                                >
                                                    <Globe className="w-5 h-5" /> Portfolio
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Team Info */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <div style={cardStyle}>
                                    <h3 className="font-semibold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                                        <Users className="w-5 h-5" style={{ color: "var(--accent)" }} />
                                        Team Information
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div style={iconBoxStyle}><Users className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Team Preference</p>
                                            <p className="font-medium capitalize" style={{ color: "var(--text-primary)" }}>{application.teamPreference?.replace("-", " ")}</p>
                                        </div>
                                    </div>
                                    {application.teamName && (
                                        <div className="mt-4 p-4 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Team Name</p>
                                            <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{application.teamName}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                            <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                style={{ background: "var(--bg-elevated)" }}
                            >
                                <Clock className="w-10 h-10" style={{ color: "var(--text-muted)" }} />
                            </div>
                            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>No Application Found</h2>
                            <p className="mb-8" style={{ color: "var(--text-muted)" }}>You haven&apos;t submitted an application yet. Apply now to join INCEPTA 2026!</p>
                            <Link href="/apply" style={btnPrimaryStyle}>
                                Apply Now <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
