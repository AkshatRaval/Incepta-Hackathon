"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { NeuralBackground } from "@/components/effects/neural-background";
import {
    Users,
    CheckCircle,
    XCircle,
    Clock,
    ArrowLeft,
    Search,
    Eye,
    Check,
    X,
    Shield,
    BarChart3,
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
    experienceLevel: string;
    primarySkill: string;
    programmingLanguages: string;
    teamPreference: string;
    motivation: string;
    projectIdea: string;
    status: "pending" | "approved" | "rejected";
    createdAt: { seconds: number };
}

export default function AdminPage() {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loadingApps, setLoadingApps] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            router.push("/profile");
        }
    }, [user, loading, isAdmin, router]);

    useEffect(() => {
        const fetchApplications = async () => {
            if (!db) {
                setLoadingApps(false);
                return;
            }
            try {
                const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const apps = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Application[];
                setApplications(apps);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoadingApps(false);
            }
        };

        if (isAdmin) {
            fetchApplications();
        } else {
            setLoadingApps(false);
        }
    }, [isAdmin]);

    const updateApplicationStatus = async (appId: string, status: "approved" | "rejected") => {
        if (!db) return;
        try {
            await updateDoc(doc(db, "applications", appId), { status });
            setApplications((prev) =>
                prev.map((app) => (app.id === appId ? { ...app, status } : app))
            );
            if (selectedApp?.id === appId) {
                setSelectedApp({ ...selectedApp, status });
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    if (loading || loadingApps) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAdmin) return null;

    const stats = {
        total: applications.length,
        pending: applications.filter((a) => a.status === "pending").length,
        approved: applications.filter((a) => a.status === "approved").length,
        rejected: applications.filter((a) => a.status === "rejected").length,
    };

    const filteredApps = applications.filter((app) => {
        const matchesSearch =
            app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || app.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <NeuralBackground />
            <div className="relative z-10 min-h-screen py-28 px-6">
                <div className="container max-w-7xl">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <button onClick={() => router.push("/profile")} className="p-2 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] transition-colors border border-[var(--border-subtle)]">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Shield className="w-5 h-5 text-[var(--accent)]" />
                                <span className="text-sm text-[var(--accent)] font-medium">Admin Panel</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold">Application Dashboard</h1>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="card-static p-5 text-center">
                            <Users className="w-8 h-8 text-[var(--accent-blue)] mx-auto mb-2" />
                            <div className="stat-value text-3xl">{stats.total}</div>
                            <div className="text-[var(--text-muted)] text-sm">Total</div>
                        </div>
                        <div className="card-static p-5 text-center">
                            <Clock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-amber-400">{stats.pending}</div>
                            <div className="text-[var(--text-muted)] text-sm">Pending</div>
                        </div>
                        <div className="card-static p-5 text-center">
                            <CheckCircle className="w-8 h-8 text-[var(--accent)] mx-auto mb-2" />
                            <div className="text-3xl font-bold text-[var(--accent)]">{stats.approved}</div>
                            <div className="text-[var(--text-muted)] text-sm">Approved</div>
                        </div>
                        <div className="card-static p-5 text-center">
                            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                            <div className="text-3xl font-bold text-red-400">{stats.rejected}</div>
                            <div className="text-[var(--text-muted)] text-sm">Rejected</div>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input pl-12 w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["all", "pending", "approved", "rejected"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${statusFilter === status
                                            ? "bg-[var(--accent)] text-white"
                                            : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Applications Table */}
                    <div className="card-static overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[var(--bg-elevated)]">
                                    <tr>
                                        <th className="text-left text-[var(--text-muted)] text-sm font-medium px-6 py-4">Applicant</th>
                                        <th className="text-left text-[var(--text-muted)] text-sm font-medium px-6 py-4">Location</th>
                                        <th className="text-left text-[var(--text-muted)] text-sm font-medium px-6 py-4">Skill</th>
                                        <th className="text-left text-[var(--text-muted)] text-sm font-medium px-6 py-4">Experience</th>
                                        <th className="text-left text-[var(--text-muted)] text-sm font-medium px-6 py-4">Status</th>
                                        <th className="text-left text-[var(--text-muted)] text-sm font-medium px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredApps.map((app) => (
                                        <tr key={app.id} className="border-t border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)]/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium">{app.firstName} {app.lastName}</div>
                                                <div className="text-sm text-[var(--text-muted)]">{app.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-[var(--text-secondary)]">{app.city}, {app.country}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-full bg-[rgba(34,197,94,0.1)] text-[var(--accent)] text-xs capitalize border border-[rgba(34,197,94,0.2)]">
                                                    {app.primarySkill?.replace("-", " ")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-[var(--text-secondary)] capitalize">{app.experienceLevel}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs capitalize ${app.status === "pending" ? "bg-amber-400/15 text-amber-400 border border-amber-400/30" :
                                                            app.status === "approved" ? "bg-[rgba(34,197,94,0.15)] text-[var(--accent)] border border-[rgba(34,197,94,0.3)]" :
                                                                "bg-red-400/15 text-red-400 border border-red-400/30"
                                                        }`}
                                                >
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => setSelectedApp(app)} className="p-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors border border-[var(--border-subtle)]" title="View Details">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    {app.status === "pending" && (
                                                        <>
                                                            <button onClick={() => updateApplicationStatus(app.id, "approved")} className="p-2 rounded-lg bg-[rgba(34,197,94,0.15)] hover:bg-[rgba(34,197,94,0.25)] text-[var(--accent)] transition-colors" title="Approve">
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => updateApplicationStatus(app.id, "rejected")} className="p-2 rounded-lg bg-red-400/15 hover:bg-red-400/25 text-red-400 transition-colors" title="Reject">
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredApps.length === 0 && (
                            <div className="text-center py-12">
                                <BarChart3 className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3" />
                                <p className="text-[var(--text-muted)]">No applications found</p>
                            </div>
                        )}
                    </div>

                    {/* Application Detail Modal */}
                    {selectedApp && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            >
                                <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] px-6 py-4 flex items-center justify-between">
                                    <h2 className="text-xl font-bold">{selectedApp.firstName} {selectedApp.lastName}</h2>
                                    <button onClick={() => setSelectedApp(null)} className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><span className="text-[var(--text-muted)] text-sm">Email</span><p>{selectedApp.email}</p></div>
                                        <div><span className="text-[var(--text-muted)] text-sm">Phone</span><p>{selectedApp.phone}</p></div>
                                        <div><span className="text-[var(--text-muted)] text-sm">Location</span><p>{selectedApp.city}, {selectedApp.country}</p></div>
                                        <div><span className="text-[var(--text-muted)] text-sm">Institution</span><p>{selectedApp.institution}</p></div>
                                        <div><span className="text-[var(--text-muted)] text-sm">Primary Skill</span><p className="capitalize">{selectedApp.primarySkill?.replace("-", " ")}</p></div>
                                        <div><span className="text-[var(--text-muted)] text-sm">Experience</span><p className="capitalize">{selectedApp.experienceLevel}</p></div>
                                    </div>

                                    <div>
                                        <span className="text-[var(--text-muted)] text-sm">Programming Languages</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {selectedApp.programmingLanguages?.split(",").map((lang) => (
                                                <span key={lang.trim()} className="px-2 py-1 rounded-full bg-[rgba(34,197,94,0.1)] text-[var(--accent)] text-sm border border-[rgba(34,197,94,0.2)]">
                                                    {lang.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-[var(--text-muted)] text-sm">Motivation</span>
                                        <p className="text-[var(--text-secondary)] mt-2">{selectedApp.motivation}</p>
                                    </div>

                                    {selectedApp.projectIdea && (
                                        <div>
                                            <span className="text-[var(--text-muted)] text-sm">Project Idea</span>
                                            <p className="text-[var(--text-secondary)] mt-2">{selectedApp.projectIdea}</p>
                                        </div>
                                    )}

                                    {selectedApp.status === "pending" && (
                                        <div className="flex gap-4 pt-4 border-t border-[var(--border-subtle)]">
                                            <button onClick={() => updateApplicationStatus(selectedApp.id, "approved")} className="flex-1 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition-opacity">
                                                Approve Application
                                            </button>
                                            <button onClick={() => updateApplicationStatus(selectedApp.id, "rejected")} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:opacity-90 transition-opacity">
                                                Reject Application
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
