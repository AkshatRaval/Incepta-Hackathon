"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Mail, Users, Twitter, Linkedin } from "lucide-react";
import { NeuralBackground } from "@/components/effects/neural-background";

const cardStyle = {
    background: "var(--bg-elevated)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(52, 211, 153, 0.3)",
    borderRadius: "1.5rem",
    boxShadow: "var(--shadow-glow)",
    overflow: "hidden",
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
    flex: 1,
};

const btnSecondaryStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    fontWeight: 600,
    fontSize: "1rem",
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-default)",
    color: "var(--text-primary)",
    cursor: "pointer",
    textDecoration: "none",
    flex: 1,
};

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <div style={cardStyle}>
                    {/* Header */}
                    <div className="p-8 text-center relative overflow-hidden" style={{ background: "rgba(52, 211, 153, 0.1)" }}>
                        {showConfetti && (
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ y: -20, x: (Math.random() - 0.5) * 300, opacity: 1 }}
                                        animate={{ y: 400, opacity: 0 }}
                                        transition={{ duration: 2.5, delay: Math.random() * 0.5 }}
                                        className="absolute left-1/2 top-0 text-xl"
                                    >
                                        {["🎉", "✨", "🚀", "💻"][Math.floor(Math.random() * 4)]}
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: "var(--accent)", boxShadow: "0 0 20px rgba(52, 211, 153, 0.3)" }}
                        >
                            <CheckCircle className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-3xl font-bold mb-2 text-white">You&apos;re In!</h1>
                        <p style={{ color: "var(--text-secondary)" }}>Welcome to INCEPTA 2026</p>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">
                        {/* Confirmation Number */}
                        <div
                            className="text-center p-4 rounded-xl"
                            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                        >
                            <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Order ID</p>
                            <p className="text-xl font-mono font-bold tracking-wider" style={{ color: "var(--accent)" }}>
                                {orderId?.slice(-12).toUpperCase() || "INCEPTA-2026"}
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-5">
                            <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>Next Steps</h3>

                            <div className="flex gap-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                                >
                                    <Mail className="w-5 h-5" style={{ color: "var(--blue)" }} />
                                </div>
                                <div>
                                    <p className="font-medium" style={{ color: "var(--text-primary)" }}>Check your email</p>
                                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>We&apos;ve sent payment confirmation and event details.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                                >
                                    <Users className="w-5 h-5" style={{ color: "var(--purple)" }} />
                                </div>
                                <div>
                                    <p className="font-medium" style={{ color: "var(--text-primary)" }}>Join the Community</p>
                                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Connect with 500+ hackers on Discord.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                                >
                                    <Calendar className="w-5 h-5" style={{ color: "var(--amber)" }} />
                                </div>
                                <div>
                                    <p className="font-medium" style={{ color: "var(--text-primary)" }}>Calendar Invite</p>
                                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>March 15-17, 2026. Don&apos;t miss it.</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/profile" style={btnPrimaryStyle}>
                                View Profile
                            </Link>
                            <a
                                href="https://discord.gg/incepta"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={btnSecondaryStyle}
                            >
                                <Users className="w-4 h-4" />
                                Join Discord
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Share you&apos;re going!</p>
                    <div className="flex justify-center gap-3">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just registered for INCEPTA 2026! 🚀 #INCEPTA2026 #Hackathon")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg transition-colors"
                            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://incepta.dev")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg transition-colors"
                            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <>
            <NeuralBackground />
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
                </div>
            }>
                <SuccessContent />
            </Suspense>
        </>
    );
}
