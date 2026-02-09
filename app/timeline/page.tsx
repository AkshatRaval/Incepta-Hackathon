"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Shuffle, Box, Code, Zap, Trophy } from "lucide-react";
import { NeuralBackground } from "@/components/effects/neural-background";

const timelineData = [
    {
        day: "Day 0",
        date: "March 5",
        title: "Orientation",
        desc: "Community intros & 'Spin-the-Wheel' for solo participants to find teams.",
        icon: Users,
    },
    {
        day: "Day 1",
        date: "March 6",
        title: "Team Swap",
        desc: "Final day to swap team members and lock in your squad.",
        icon: Shuffle,
    },
    {
        day: "Day 3",
        date: "March 8",
        title: "Mystery Box",
        desc: "First-come, first-serve problem statement selection from various domains.",
        icon: Box,
    },
    {
        day: "Day 4-5",
        date: "March 9-10",
        title: "Round 1: MVP",
        desc: "48 hours to build your core solution. Bottom 10% eliminated.",
        icon: Code,
    },
    {
        day: "Day 7",
        date: "March 12",
        title: "Round 2: The Twist",
        desc: "12-hour sprint with new features every 30 minutes. 50% elimination.",
        icon: Zap,
    },
    {
        day: "Day 9",
        date: "March 14",
        title: "Grand Finale",
        desc: "Technical Defense & Debate. The champion is crowned!",
        icon: Trophy,
    },
];

const colors = [
    { text: "var(--accent)", bg: "rgba(52, 211, 153, 0.15)", border: "rgba(52, 211, 153, 0.3)" },
    { text: "var(--cyan)", bg: "rgba(34, 211, 238, 0.15)", border: "rgba(34, 211, 238, 0.3)" },
    { text: "var(--blue)", bg: "rgba(96, 165, 250, 0.15)", border: "rgba(96, 165, 250, 0.3)" },
    { text: "var(--purple)", bg: "rgba(192, 132, 252, 0.15)", border: "rgba(192, 132, 252, 0.3)" },
    { text: "var(--pink)", bg: "rgba(244, 114, 182, 0.15)", border: "rgba(244, 114, 182, 0.3)" },
    { text: "var(--amber)", bg: "rgba(251, 191, 36, 0.15)", border: "rgba(251, 191, 36, 0.3)" },
];

export default function TimelinePage() {
    return (
        <>
            <NeuralBackground />
            <main className="relative z-10 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Main Card */}
                        <div
                            className="relative rounded-3xl p-6 md:p-12"
                            style={{
                                background: "var(--bg-card)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid var(--border-default)",
                                boxShadow: "var(--shadow-glow-cyan)"
                            }}
                        >
                            {/* Header */}
                            <div className="text-center mb-12">
                                <div className="badge badge-cyan mb-6">
                                    <Calendar className="w-4 h-4" />
                                    <span>9-Day Journey</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
                                    INCEPTA 2026 <span className="gradient-text">Timeline</span>
                                </h1>
                                <p style={{ color: "var(--text-secondary)" }} className="text-lg">March 5th – 14th | Mark your calendar.</p>
                            </div>

                            {/* Timeline */}
                            <div className="relative">
                                {/* Vertical Line */}
                                <div
                                    className="absolute left-6 top-0 bottom-0 w-0.5"
                                    style={{
                                        background: "linear-gradient(to bottom, var(--accent), var(--cyan), var(--amber))",
                                        boxShadow: "var(--shadow-glow-cyan)"
                                    }}
                                />

                                <div className="space-y-6">
                                    {timelineData.map((event, i) => {
                                        const color = colors[i];
                                        const Icon = event.icon;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                viewport={{ once: true }}
                                                className="relative flex gap-6"
                                            >
                                                {/* Icon Circle */}
                                                <div
                                                    className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                                    style={{
                                                        background: color.bg,
                                                        border: `1px solid ${color.border}`,
                                                    }}
                                                >
                                                    <Icon className="w-5 h-5" style={{ color: color.text }} />
                                                </div>

                                                {/* Card */}
                                                <div
                                                    className="p-6 rounded-2xl flex-1 transition-all group"
                                                    style={{
                                                        background: "var(--bg-elevated)",
                                                        backdropFilter: "blur(12px)",
                                                        WebkitBackdropFilter: "blur(12px)",
                                                        border: "1px solid var(--border-default)",
                                                    }}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span
                                                            className="text-sm font-bold uppercase tracking-widest"
                                                            style={{ color: color.text }}
                                                        >
                                                            {event.day}
                                                        </span>
                                                        <span style={{ color: "var(--text-subtle)" }}>•</span>
                                                        <span className="text-sm font-mono" style={{ color: color.text }}>{event.date}, 2026</span>
                                                    </div>
                                                    <h3
                                                        className="text-xl font-bold mb-2 transition-colors"
                                                        style={{ color: "var(--text-primary)" }}
                                                    >
                                                        {event.title}
                                                    </h3>
                                                    <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed">{event.desc}</p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Stats */}
                            <div
                                className="flex flex-wrap justify-center gap-12 mt-12 pt-8"
                                style={{ borderTop: "1px solid var(--border-default)" }}
                            >
                                {[
                                    { value: "9", label: "Days", color: "var(--accent)" },
                                    { value: "3", label: "Rounds", color: "var(--cyan)" },
                                    { value: "60%", label: "Elimination", color: "var(--pink)" },
                                    { value: "1", label: "Champion", color: "var(--amber)" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-4xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                                        <div className="text-sm uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
