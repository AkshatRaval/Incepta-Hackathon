"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Mail } from "lucide-react";
import { NeuralBackground } from "@/components/effects/neural-background";

const platinum = [
    { name: "TechCorp", logo: "🚀" },
    { name: "InnovateLabs", logo: "💡" },
    { name: "CloudScale", logo: "☁️" },
];

const gold = [
    { name: "DevTools", logo: "🔧" },
    { name: "AI Systems", logo: "🤖" },
    { name: "StartupHub", logo: "🏢" },
    { name: "CodeForge", logo: "⚡" },
    { name: "DataFlow", logo: "📊" },
    { name: "SecureNet", logo: "🔒" },
];

export default function SponsorsPage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative z-10 pt-24 pb-20">
                <section className="py-20 px-6">
                    <div className="container max-w-5xl mx-auto">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16 max-w-2xl mx-auto"
                        >
                            <div className="badge mb-6 mx-auto">
                                <Trophy className="w-4 h-4" />
                                <span>Sponsors</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                                Our <span className="text-gradient">Partners</span>
                            </h1>
                            <p className="text-[var(--text-secondary)] text-lg">INCEPTA is powered by industry leaders.</p>
                        </motion.div>

                        {/* Platinum */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-16"
                        >
                            <div className="flex items-center justify-center gap-2 mb-8">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
                                <span className="text-sm font-bold uppercase tracking-wider text-yellow-500 drop-shadow-md">Platinum Sponsors</span>
                            </div>
                            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                                {platinum.map((s) => (
                                    <div key={s.name} className="card p-10 text-center hover:border-yellow-500/50 transition-all group">
                                        <span className="text-6xl block mb-6 group-hover:scale-110 transition-transform duration-300">{s.logo}</span>
                                        <span className="text-xl font-bold">{s.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Gold */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-20"
                        >
                            <div className="flex items-center justify-center gap-2 mb-8">
                                <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)]">Gold Partners</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                {gold.map((s) => (
                                    <div key={s.name} className="card px-8 py-5 flex items-center gap-4 hover:bg-[var(--bg-elevated)] transition-colors">
                                        <span className="text-3xl">{s.logo}</span>
                                        <span className="font-semibold text-lg">{s.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card-static p-12 text-center max-w-2xl mx-auto relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--gradient)]" />
                            <h3 className="text-3xl font-bold mb-4">Become a Sponsor</h3>
                            <p className="text-[var(--text-secondary)] mb-8 text-lg max-w-md mx-auto">Connect with 500+ developers and gain brand visibility at the biggest tech event of the year.</p>
                            <a href="mailto:sponsors@incepta.dev" className="btn btn-primary btn-lg">
                                <Mail className="w-5 h-5" />
                                Contact Us
                            </a>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}
