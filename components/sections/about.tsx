"use client";

import { motion } from "framer-motion";
import { Brain, Globe, Shield, Rocket, Users, Zap } from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "AI & Machine Learning",
        description: "Build intelligent solutions using cutting-edge AI technologies and compete for the AI track prize.",
        color: "emerald",
    },
    {
        icon: Globe,
        title: "Web3 & Blockchain",
        description: "Create decentralized applications and smart contracts for the future of the internet.",
        color: "amber",
    },
    {
        icon: Shield,
        title: "Cybersecurity",
        description: "Develop security solutions and tools to protect digital infrastructure.",
        color: "blue",
    },
    {
        icon: Rocket,
        title: "Open Innovation",
        description: "Build anything that pushes boundaries. No limits, just pure innovation.",
        color: "purple",
    },
    {
        icon: Users,
        title: "Social Impact",
        description: "Create solutions that address real-world challenges and improve lives.",
        color: "rose",
    },
    {
        icon: Zap,
        title: "Dev Tools",
        description: "Build tools that enhance developer productivity and workflows.",
        color: "cyan",
    },
];

const colorClasses = {
    emerald: {
        icon: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
        hover: "hover:border-emerald-500/40",
    },
    amber: {
        icon: "text-amber-400",
        iconBg: "bg-amber-500/10 border-amber-500/20",
        hover: "hover:border-amber-500/40",
    },
    blue: {
        icon: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/20",
        hover: "hover:border-blue-500/40",
    },
    purple: {
        icon: "text-purple-400",
        iconBg: "bg-purple-500/10 border-purple-500/20",
        hover: "hover:border-purple-500/40",
    },
    rose: {
        icon: "text-rose-400",
        iconBg: "bg-rose-500/10 border-rose-500/20",
        hover: "hover:border-rose-500/40",
    },
    cyan: {
        icon: "text-cyan-400",
        iconBg: "bg-cyan-500/10 border-cyan-500/20",
        hover: "hover:border-cyan-500/40",
    },
};

export function AboutSection() {
    return (
        <section className="py-20 sm:py-32 px-4 sm:px-6">
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
                        Competition Tracks
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
                        Choose Your <span className="gradient-text">Challenge</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Six unique tracks, endless possibilities. Pick the one that ignites your passion and start building.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {features.map((feature, index) => {
                        const colors = colorClasses[feature.color as keyof typeof colorClasses];
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className={`premium-card p-6 sm:p-8 ${colors.hover} group`}
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${colors.iconBg} border mb-5 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className={`w-7 h-7 ${colors.icon}`} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-100 mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center mt-16"
                >
                    <a
                        href="/about"
                        className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors group"
                    >
                        Explore all tracks
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
