"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";
import { ArrowRight, Sparkles } from "lucide-react";

const sponsors = {
    platinum: [
        { name: "TechCorp", logo: "🚀" },
        { name: "InnovateLabs", logo: "💡" },
        { name: "CloudScale", logo: "☁️" },
    ],
    gold: [
        { name: "DevTools", logo: "🔧" },
        { name: "AI Systems", logo: "🤖" },
        { name: "StartupHub", logo: "🏢" },
        { name: "CodeForge", logo: "⚡" },
        { name: "DataFlow", logo: "📊" },
        { name: "SecureNet", logo: "🔒" },
    ],
};

export function SponsorsSection() {
    return (
        <section className="py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
                        Our Partners
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
                        Backed by <span className="gradient-text-gold">Industry Leaders</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        Join an event powered by the world&apos;s most innovative companies.
                    </p>
                </motion.div>

                {/* Platinum Sponsors */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Platinum</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {sponsors.platinum.map((sponsor) => (
                            <div
                                key={sponsor.name}
                                className="premium-card px-10 py-8 flex flex-col items-center gap-3 min-w-[160px] hover:border-amber-500/40"
                            >
                                <span className="text-5xl">{sponsor.logo}</span>
                                <span className="text-slate-200 font-semibold">{sponsor.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Gold Sponsors - Marquee */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Gold Partners</span>
                    </div>
                    <Marquee pauseOnHover speed={30} className="py-4">
                        {sponsors.gold.map((sponsor) => (
                            <div
                                key={sponsor.name}
                                className="mx-4 px-8 py-5 rounded-2xl glass flex items-center gap-3 hover:border-slate-600 transition-colors"
                            >
                                <span className="text-3xl">{sponsor.logo}</span>
                                <span className="text-slate-300 font-medium">{sponsor.name}</span>
                            </div>
                        ))}
                    </Marquee>
                </motion.div>

                {/* Become a Sponsor CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center premium-card p-8 sm:p-12 max-w-2xl mx-auto"
                >
                    <h3 className="text-2xl font-bold text-slate-100 mb-4">Become a Sponsor</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Partner with INCEPTA to connect with 500+ talented developers, gain brand visibility,
                        and be part of the innovation.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="mailto:sponsors@incepta.dev" className="gold-button glow-button inline-flex items-center gap-2">
                            Contact Us
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="/sponsors"
                            className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800/50 transition-colors"
                        >
                            View All Sponsors
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
