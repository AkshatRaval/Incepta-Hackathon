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
    XCircle,
    AlertCircle,
    LogOut,
    Shield,
    ArrowRight,
    Briefcase,
    GraduationCap,
    Code,
} from "lucide-react";

interface Application {
    id: string;
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
    status: "pending" | "approved" | "rejected";
    createdAt: { seconds: number };
}

export default function ProfilePage() {
    const { user, loading, signInWithGoogle, signInWithGithub, signOut, isAdmin } = useAuth();
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
                <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
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
                        <div className="card-static p-10 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--gradient)] flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">I</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Sign In to INCEPTA</h2>
                            <p className="text-[var(--text-muted)] text-sm mb-8">Sign in to view your application status and profile</p>

                            <div className="space-y-3">
                                <button onClick={signInWithGoogle} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Continue with Google
                                </button>
                                <button onClick={signInWithGithub} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-surface)] transition-colors border border-[var(--border-subtle)]">
                                    <Github className="w-5 h-5" />
                                    Continue with GitHub
                                </button>
                            </div>

                            <p className="text-[var(--text-muted)] text-sm mt-8">
                                Don&apos;t have an application yet? <Link href="/apply" className="text-[var(--accent)] hover:underline">Apply now</Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </>
        );
    }

    const statusConfig = {
        pending: { icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-400/15", border: "border-amber-400/30", label: "Pending Review" },
        approved: { icon: CheckCircle, color: "text-[var(--accent)]", bg: "bg-[rgba(34,197,94,0.15)]", border: "border-[rgba(34,197,94,0.3)]", label: "Approved" },
        rejected: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/15", border: "border-red-400/30", label: "Not Selected" },
    };

    return (
        <>
            <NeuralBackground />
            <div className="relative z-10 min-h-screen py-28 px-6">
                <div className="container max-w-4xl">
                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                        <div className="flex items-center gap-4">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-2xl border-2 border-[var(--accent)]" />
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-[var(--gradient)] flex items-center justify-center">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold">{user.displayName || "Welcome"}</h1>
                                <p className="text-[var(--text-muted)]">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {isAdmin && (
                                <button onClick={() => router.push("/admin")} className="btn btn-secondary">
                                    <Shield className="w-4 h-4" />
                                    Admin
                                </button>
                            )}
                            <button onClick={signOut} className="btn btn-secondary">
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>

                    {loadingApp ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : application ? (
                        <div className="space-y-6">
                            {/* Status Card */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <div className={`card-static p-6 ${statusConfig[application.status].bg} ${statusConfig[application.status].border}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="font-semibold mb-1">Application Status</h2>
                                            <p className="text-[var(--text-muted)] text-sm">
                                                Submitted on {new Date(application.createdAt.seconds * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[application.status].bg} border ${statusConfig[application.status].border}`}>
                                            {(() => {
                                                const Icon = statusConfig[application.status].icon;
                                                return <Icon className={`w-5 h-5 ${statusConfig[application.status].color}`} />;
                                            })()}
                                            <span className={`font-semibold ${statusConfig[application.status].color}`}>
                                                {statusConfig[application.status].label}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Personal Info */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <div className="card-static p-6">
                                    <h3 className="font-semibold mb-5 flex items-center gap-2">
                                        <User className="w-5 h-5 text-[var(--accent)]" />
                                        Personal Information
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div className="flex items-center gap-3">
                                            <div className="icon-box"><User className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs text-[var(--text-muted)]">Full Name</p>
                                                <p className="font-medium">{application.firstName} {application.lastName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="icon-box"><Mail className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs text-[var(--text-muted)]">Email</p>
                                                <p className="font-medium">{application.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="icon-box"><MapPin className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs text-[var(--text-muted)]">Location</p>
                                                <p className="font-medium">{application.city}, {application.country}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="icon-box"><GraduationCap className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs text-[var(--text-muted)]">Institution</p>
                                                <p className="font-medium">{application.institution}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Technical Profile */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <div className="card-static p-6">
                                    <h3 className="font-semibold mb-5 flex items-center gap-2">
                                        <Code className="w-5 h-5 text-[var(--accent)]" />
                                        Technical Profile
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="icon-box"><Briefcase className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs text-[var(--text-muted)]">Primary Skill</p>
                                                <p className="font-medium capitalize">{application.primarySkill?.replace("-", " ")}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="icon-box"><Clock className="w-4 h-4" /></div>
                                            <div>
                                                <p className="text-xs text-[var(--text-muted)]">Experience Level</p>
                                                <p className="font-medium capitalize">{application.experienceLevel}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <p className="text-xs text-[var(--text-muted)] mb-2">Programming Languages</p>
                                        <div className="flex flex-wrap gap-2">
                                            {application.programmingLanguages?.split(",").map((lang) => (
                                                <span key={lang.trim()} className="px-3 py-1 rounded-full bg-[rgba(34,197,94,0.1)] text-[var(--accent)] text-sm border border-[rgba(34,197,94,0.2)]">
                                                    {lang.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {(application.github || application.linkedin || application.portfolio) && (
                                        <div className="flex flex-wrap gap-4 pt-5 border-t border-[var(--border-subtle)]">
                                            {application.github && (
                                                <a href={application.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                                                    <Github className="w-5 h-5" /> GitHub
                                                </a>
                                            )}
                                            {application.linkedin && (
                                                <a href={application.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                                                    <Linkedin className="w-5 h-5" /> LinkedIn
                                                </a>
                                            )}
                                            {application.portfolio && (
                                                <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                                                    <Globe className="w-5 h-5" /> Portfolio
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Team Info */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <div className="card-static p-6">
                                    <h3 className="font-semibold mb-5 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-[var(--accent)]" />
                                        Team Information
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div className="icon-box"><Users className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-xs text-[var(--text-muted)]">Team Preference</p>
                                            <p className="font-medium capitalize">{application.teamPreference?.replace("-", " ")}</p>
                                        </div>
                                    </div>
                                    {application.teamName && (
                                        <div className="mt-4 p-4 rounded-xl bg-[var(--bg-elevated)]">
                                            <p className="text-xs text-[var(--text-muted)]">Team Name</p>
                                            <p className="font-semibold">{application.teamName}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-10 h-10 text-[var(--text-muted)]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">No Application Found</h2>
                            <p className="text-[var(--text-muted)] mb-8">You haven&apos;t submitted an application yet. Apply now to join INCEPTA 2026!</p>
                            <Link href="/apply" className="btn btn-primary">
                                Apply Now <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
