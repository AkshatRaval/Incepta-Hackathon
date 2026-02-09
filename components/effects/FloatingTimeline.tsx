"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shuffle, Box, Code, Zap, Trophy, Calendar, ArrowRight } from "lucide-react";

const timelineEvents = [
    {
        day: "Day 0",
        date: "Mar 5",
        title: "Orientation",
        desc: "Community intros & 'Spin-the-Wheel' for solo participants to find teams.",
        details: "Meet your fellow competitors, get briefed on the rules, and if you're solo, we'll match you with a balanced squad.",
        icon: Users,
        color: "var(--accent)",
        bgColor: "rgba(52, 211, 153, 0.15)",
        borderColor: "rgba(52, 211, 153, 0.3)",
    },
    {
        day: "Day 1",
        date: "Mar 6",
        title: "Team Swap",
        desc: "Final day to swap team members and finalize roles.",
        details: "Lock in your squad. After today, no more changes. Choose wisely—your team will define your journey.",
        icon: Shuffle,
        color: "var(--cyan)",
        bgColor: "rgba(34, 211, 238, 0.15)",
        borderColor: "rgba(34, 211, 238, 0.3)",
    },
    {
        day: "Day 3",
        date: "Mar 8",
        title: "Mystery Box",
        desc: "First-come, first-serve problem statement selection.",
        details: "Healthcare, Education, FinTech, and more. Rush to grab your preferred domain before others do!",
        icon: Box,
        color: "var(--blue)",
        bgColor: "rgba(96, 165, 250, 0.15)",
        borderColor: "rgba(96, 165, 250, 0.3)",
    },
    {
        day: "Day 4-5",
        date: "Mar 9-10",
        title: "Round 1: MVP",
        desc: "48 hours to build core solution. 10% elimination.",
        details: "Code, design, iterate. Build a working MVP that solves your problem. Bottom 10% of teams are eliminated.",
        icon: Code,
        color: "var(--purple)",
        bgColor: "rgba(192, 132, 252, 0.15)",
        borderColor: "rgba(192, 132, 252, 0.3)",
    },
    {
        day: "Day 7",
        date: "Mar 12",
        title: "Round 2: Twist",
        desc: "12-hour sprint. New features every 30 min. 50% cut.",
        details: "The ultimate stress test. Every 30 minutes, new requirements drop. Adapt in real-time or get eliminated.",
        icon: Zap,
        color: "var(--pink)",
        bgColor: "rgba(244, 114, 182, 0.15)",
        borderColor: "rgba(244, 114, 182, 0.3)",
    },
    {
        day: "Day 9",
        date: "Mar 14",
        title: "Grand Finale",
        desc: "Technical Defense & Debate. Champion crowned!",
        details: "Present to judges, defend your architecture, and debate your decisions. Only one team takes the crown.",
        icon: Trophy,
        color: "var(--amber)",
        bgColor: "rgba(251, 191, 36, 0.15)",
        borderColor: "rgba(251, 191, 36, 0.3)",
    },
];

export function FloatingTimeline() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="roadmap" className="relative px-4 sm:px-6 py-20">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="badge badge-cyan mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>March 5–14, 2026</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
                        The <span className="gradient-text">9-Day</span> Journey
                    </h2>
                    <p style={{ color: "var(--text-muted)" }} className="max-w-xl mx-auto">
                        Hover over each milestone to explore what awaits you
                    </p>
                </div>

                {/* Timeline Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {timelineEvents.map((event, i) => (
                        <motion.div
                            key={i}
                            className="relative"
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Base Card */}
                            <div
                                className="relative p-6 rounded-2xl transition-all duration-300 cursor-pointer"
                                style={{
                                    background: hoveredIndex === i ? "var(--bg-card-hover)" : "var(--bg-card)",
                                    backdropFilter: "blur(8px)",
                                    WebkitBackdropFilter: "blur(8px)",
                                    border: `1px solid ${hoveredIndex === i ? event.borderColor : "var(--border-default)"}`,
                                    transform: hoveredIndex === i ? "scale(1.02)" : "none",
                                    boxShadow: hoveredIndex === i
                                        ? `0 20px 40px -10px rgba(0,0,0,0.6), 0 0 30px -15px ${event.bgColor}`
                                        : "none"
                                }}
                            >
                                {/* Icon */}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300"
                                    style={{
                                        background: event.bgColor,
                                        border: `1px solid ${event.borderColor}`,
                                        transform: hoveredIndex === i ? "translateY(-4px)" : "none",
                                        boxShadow: hoveredIndex === i ? `0 8px 20px ${event.bgColor}` : "none"
                                    }}
                                >
                                    <event.icon className="w-6 h-6" style={{ color: event.color }} />
                                </div>

                                {/* Date Badge */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="text-xs font-bold uppercase tracking-widest"
                                        style={{ color: event.color }}
                                    >
                                        {event.day}
                                    </span>
                                    <span style={{ color: "var(--text-subtle)" }}>•</span>
                                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{event.date}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{event.title}</h3>

                                {/* Description */}
                                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                    {event.desc}
                                </p>

                                {/* Hover Indicator */}
                                <div
                                    className="mt-4 flex items-center gap-1 text-xs font-medium transition-all duration-300"
                                    style={{
                                        color: event.color,
                                        opacity: hoveredIndex === i ? 1 : 0.5
                                    }}
                                >
                                    Learn more <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>

                            {/* Floating Detail Card */}
                            <AnimatePresence>
                                {hoveredIndex === i && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute z-50 left-0 right-0 top-full mt-3"
                                    >
                                        <div
                                            className="p-5 rounded-xl"
                                            style={{
                                                background: "var(--bg-elevated)",
                                                backdropFilter: "blur(8px)",
                                                WebkitBackdropFilter: "blur(8px)",
                                                border: `1px solid ${event.borderColor}`,
                                                boxShadow: `0 25px 50px -12px rgba(0,0,0,0.7)`
                                            }}
                                        >
                                            {/* Decorative top line */}
                                            <div
                                                className="absolute top-0 left-4 right-4 h-0.5 rounded-full"
                                                style={{ background: `linear-gradient(90deg, transparent, ${event.color}, transparent)` }}
                                            />

                                            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                                {event.details}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-8 mt-16 pt-8"
                    style={{ borderTop: "1px solid var(--border-default)" }}
                >
                    {[
                        { value: "9", label: "Days", color: "var(--accent)" },
                        { value: "3", label: "Rounds", color: "var(--cyan)" },
                        { value: "60%", label: "Eliminated", color: "var(--pink)" },
                        { value: "1", label: "Champion", color: "var(--amber)" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center px-6">
                            <div
                                className="text-3xl font-black mb-1"
                                style={{ color: stat.color }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-xs uppercase tracking-wider font-medium" style={{ color: "var(--text-muted)" }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
