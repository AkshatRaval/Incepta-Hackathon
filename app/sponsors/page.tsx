"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Building2, Users, ArrowRight, Mail } from "lucide-react";
import { NeuralBackground } from "@/components/effects/neural-background";
import Link from "next/link";

const titleSponsor = {
    name: "Your Brand Here",
    tagline: "Title Partner • Lead Sponsor",
};

const goldSponsors = [
    { name: "TechCorp", tagline: "Cloud Partner" },
    { name: "DataFlow", tagline: "AI Partner" },
    { name: "CloudBase", tagline: "Infrastructure" },
    { name: "DevTools", tagline: "Developer Tools" },
];

const communityPartners = [
    { name: "DevCommunity" },
    { name: "CodeClub" },
    { name: "TechMeetup" },
    { name: "HackerSpace" },
    { name: "StartupHub" },
    { name: "InnovateLab" },
];

export default function SponsorsPage() {
    return (
        <>
            <NeuralBackground />
            <main className="relative z-10 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-16">
                            <div className="badge badge-amber mb-6">
                                <Trophy className="w-4 h-4" />
                                <span>Our Partners</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
                                Powered by <span className="gradient-text">Industry Leaders</span>
                            </h1>
                            <p style={{ color: "var(--text-secondary)" }} className="text-lg max-w-2xl mx-auto">
                                INCEPTA 2026 is made possible by our incredible sponsors and community partners.
                            </p>
                        </div>

                        {/* Title Sponsor */}
                        <div className="mb-16">
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <Star className="w-6 h-6" style={{ color: "var(--amber)" }} />
                                <span className="text-lg font-bold uppercase tracking-wider" style={{ color: "var(--amber)" }}>Title Sponsor</span>
                                <Star className="w-6 h-6" style={{ color: "var(--amber)" }} />
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="relative group"
                            >
                                {/* Glow Effect */}
                                <div
                                    className="absolute -inset-1 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"
                                    style={{ background: "linear-gradient(90deg, var(--amber), var(--amber-light), var(--amber))" }}
                                />
                                <div
                                    className="relative rounded-3xl p-6 md:p-12 text-center transition-all"
                                    style={{
                                        background: "var(--bg-elevated)",
                                        backdropFilter: "blur(20px)",
                                        WebkitBackdropFilter: "blur(20px)",
                                        border: "1px solid rgba(251, 191, 36, 0.3)",
                                    }}
                                >
                                    <div
                                        className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                        style={{
                                            background: "linear-gradient(135deg, var(--amber), var(--amber-light))",
                                            boxShadow: "0 0 40px rgba(251, 191, 36, 0.4)"
                                        }}
                                    >
                                        <Building2 className="w-12 h-12 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-black mb-2" style={{ color: "var(--text-primary)" }}>{titleSponsor.name}</h2>
                                    <span style={{ color: "var(--amber)" }} className="text-sm uppercase tracking-widest">{titleSponsor.tagline}</span>
                                    <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>Your brand here? Let&apos;s talk.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Gold Partners */}
                        <div className="mb-16">
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <Building2 className="w-5 h-5" style={{ color: "var(--cyan)" }} />
                                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--cyan)" }}>Gold Partners</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {goldSponsors.map((sponsor, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <div
                                            className="rounded-2xl p-8 text-center h-full transition-all"
                                            style={{
                                                background: "var(--bg-card)",
                                                backdropFilter: "blur(16px)",
                                                WebkitBackdropFilter: "blur(16px)",
                                                border: "1px solid var(--border-default)",
                                            }}
                                        >
                                            <div
                                                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                                                style={{
                                                    background: "rgba(34, 211, 238, 0.15)",
                                                    border: "1px solid rgba(34, 211, 238, 0.3)",
                                                }}
                                            >
                                                <Building2 className="w-8 h-8" style={{ color: "var(--cyan)" }} />
                                            </div>
                                            <h3 className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>{sponsor.name}</h3>
                                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>{sponsor.tagline}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Community Partners */}
                        <div className="mb-16">
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <Users className="w-5 h-5" style={{ color: "var(--accent)" }} />
                                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>Community Partners</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {communityPartners.map((partner, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-4 px-6 py-4 rounded-xl transition-all"
                                        style={{
                                            background: "var(--bg-card)",
                                            backdropFilter: "blur(12px)",
                                            WebkitBackdropFilter: "blur(12px)",
                                            border: "1px solid var(--border-default)",
                                        }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: "rgba(52, 211, 153, 0.15)",
                                                border: "1px solid rgba(52, 211, 153, 0.3)",
                                            }}
                                        >
                                            <Users className="w-5 h-5" style={{ color: "var(--accent)" }} />
                                        </div>
                                        <span className="font-medium" style={{ color: "var(--text-primary)" }}>{partner.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center rounded-3xl p-6 md:p-12"
                            style={{
                                background: "var(--bg-card)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                                border: "1px solid var(--border-default)",
                            }}
                        >
                            <h2 className="text-3xl font-black mb-4" style={{ color: "var(--text-primary)" }}>Become a Sponsor</h2>
                            <p className="mb-8 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                                Partner with INCEPTA 2026 and connect with 200+ talented engineers building the future.
                            </p>
                            <Link
                                href="mailto:sponsors@incepta.dev"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all"
                                style={{
                                    background: "var(--gradient-primary)",
                                    color: "#000",
                                }}
                            >
                                <Mail className="w-5 h-5" />
                                Contact Us
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
