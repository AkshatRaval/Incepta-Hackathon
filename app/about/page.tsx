"use client";

import { motion } from "framer-motion";
import { Shield, Users, Zap, Target, Check, ArrowRight, Box, Code, Trophy, Timer, Calendar } from "lucide-react";
import Link from "next/link";
import { NeuralBackground } from "@/components/effects/neural-background";

const rounds = [
    {
        icon: Code,
        title: "Round 1: MVP Development",
        duration: "48 Hours",
        desc: "Build your core solution from scratch. 10% of teams are eliminated.",
        days: "Day 4-5 (Mar 9-10)",
        color: "var(--accent)",
        bgColor: "rgba(52, 211, 153, 0.15)",
        borderColor: "rgba(52, 211, 153, 0.3)",
    },
    {
        icon: Zap,
        title: "Round 2: The Twist",
        duration: "12 Hours",
        desc: "New feature requirements every 30 minutes. Adapt or die. 50% elimination.",
        days: "Day 7 (Mar 12)",
        color: "var(--cyan)",
        bgColor: "rgba(34, 211, 238, 0.15)",
        borderColor: "rgba(34, 211, 238, 0.3)",
    },
    {
        icon: Trophy,
        title: "Round 3: Grand Finale",
        duration: "Full Day",
        desc: "Technical Defense & Debate. Defend your architecture to expert judges.",
        days: "Day 9 (Mar 14)",
        color: "var(--amber)",
        bgColor: "rgba(251, 191, 36, 0.15)",
        borderColor: "rgba(251, 191, 36, 0.3)",
    },
];

const benefits = [
    "9 days of intense building",
    "₹1500 swag per member (Top 3)",
    "1-on-1 mentorship sessions",
    "Workshops from industry leaders",
    "Official participation certificates",
    "Networking with partner communities",
    "Direct recruiter connections",
    "Champion trophies",
];

const uniqueFeatures = [
    { icon: Box, title: "Mystery Box", desc: "Problem statements revealed on Day 3. First-come, first-serve selection.", color: "var(--blue)" },
    { icon: Timer, title: "Twist Mechanics", desc: "Surprise feature requirements dropped every 30 minutes during Round 2.", color: "var(--pink)" },
    { icon: Shield, title: "Technical Defense", desc: "Live debate with judges questioning your code and architecture.", color: "var(--purple)" },
    { icon: Users, title: "Spin-the-Wheel", desc: "Solo participants get matched into balanced teams during Orientation.", color: "var(--accent)" },
];

export default function AboutPage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative min-h-screen pt-32" style={{ color: "var(--text-primary)" }}>
                <div className="relative z-10 flex flex-col gap-y-20">
                    {/* Hero */}
                    <section className="px-4 sm:px-6 pt-32 pb-24">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="badge badge-cyan mb-6">
                                    <Target className="w-4 h-4" />
                                    <span>About INCEPTA 2026</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                                    9 Days. 3 Rounds. <span className="gradient-text">1 Champion.</span>
                                </h1>
                                <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                                    INCEPTA 2026 is not your typical hackathon. It&apos;s a 9-day engineering gauntlet designed to test persistence, adaptability, and real-time problem-solving. Only the most resilient teams survive.
                                </p>
                                <div className="flex items-center justify-center gap-2 mt-6" style={{ color: "var(--text-muted)" }}>
                                    <Calendar className="w-5 h-5" />
                                    <span>March 5th – 14th, 2026</span>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Competition Rounds */}
                    <section className="px-4 sm:px-6 py-24">
                        <div className="max-w-6xl mx-auto">
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
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                                        The 3 <span className="gradient-text">Rounds</span>
                                    </h2>
                                    <p style={{ color: "var(--text-secondary)" }}>Each round tests different aspects of your engineering prowess.</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {rounds.map((round, i) => (
                                        <motion.div
                                            key={round.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-8 rounded-2xl transition-all"
                                            style={{
                                                background: "var(--bg-elevated)",
                                                backdropFilter: "blur(12px)",
                                                WebkitBackdropFilter: "blur(12px)",
                                                border: `1px solid ${round.borderColor}`,
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-6">
                                                <div
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                                    style={{
                                                        background: round.bgColor,
                                                        border: `1px solid ${round.borderColor}`,
                                                        boxShadow: `0 0 15px ${round.bgColor}`
                                                    }}
                                                >
                                                    <round.icon className="w-6 h-6" style={{ color: round.color }} />
                                                </div>
                                                <span
                                                    className="text-sm font-bold px-3 py-1 rounded-full"
                                                    style={{
                                                        color: round.color,
                                                        background: round.bgColor,
                                                        border: `1px solid ${round.borderColor}`
                                                    }}
                                                >
                                                    {round.duration}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{round.title}</h3>
                                            <p className="text-xs font-mono mb-3" style={{ color: round.color }}>{round.days}</p>
                                            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{round.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Unique Features */}
                    <section className="px-4 sm:px-6 py-24">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                                    What Makes Us <span className="gradient-text">Different</span>
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {uniqueFeatures.map((feature, i) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="p-6 rounded-2xl transition-all flex gap-4"
                                        style={{
                                            background: "var(--bg-card)",
                                            backdropFilter: "blur(12px)",
                                            WebkitBackdropFilter: "blur(12px)",
                                            border: "1px solid var(--border-default)",
                                        }}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: "rgba(52, 211, 153, 0.1)",
                                                border: "1px solid rgba(52, 211, 153, 0.3)",
                                            }}
                                        >
                                            <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>{feature.title}</h3>
                                            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Benefits & CTA */}
                    <section className="px-4 sm:px-6 py-24">
                        <div className="max-w-6xl mx-auto">
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
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                        <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
                                            What You <span className="gradient-text">Get</span>
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {benefits.map((benefit) => (
                                                <div
                                                    key={benefit}
                                                    className="flex items-center gap-3 p-3 rounded-lg transition-all"
                                                    style={{
                                                        background: "var(--bg-elevated)",
                                                        backdropFilter: "blur(8px)",
                                                        WebkitBackdropFilter: "blur(8px)",
                                                        border: "1px solid var(--border-default)",
                                                    }}
                                                >
                                                    <div
                                                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                                        style={{
                                                            background: "rgba(52, 211, 153, 0.1)",
                                                            border: "1px solid rgba(52, 211, 153, 0.3)"
                                                        }}
                                                    >
                                                        <Check className="w-3 h-3" style={{ color: "var(--accent)" }} />
                                                    </div>
                                                    <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="p-10 rounded-2xl text-center relative overflow-hidden"
                                        style={{
                                            background: "var(--bg-elevated)",
                                            backdropFilter: "blur(16px)",
                                            WebkitBackdropFilter: "blur(16px)",
                                            border: "1px solid rgba(34, 211, 238, 0.3)",
                                            boxShadow: "var(--shadow-glow-cyan)"
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: "linear-gradient(135deg, rgba(52, 211, 153, 0.1), transparent, rgba(34, 211, 238, 0.1))" }}
                                        />
                                        <div className="relative z-10">
                                            <div className="text-6xl sm:text-7xl font-bold gradient-text mb-2">₹60</div>
                                            <div className="uppercase tracking-widest text-sm mb-8 font-semibold" style={{ color: "var(--text-muted)" }}>Entry Fee Only</div>
                                            <Link
                                                href="/apply"
                                                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl transition-all hover:scale-105"
                                                style={{
                                                    background: "var(--gradient-primary)",
                                                    color: "#000",
                                                    boxShadow: "var(--shadow-glow)"
                                                }}
                                            >
                                                Register Now
                                                <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="px-4 sm:px-6 py-24 pb-32">
                        <div className="max-w-3xl mx-auto">
                            <div
                                className="relative rounded-3xl p-12 text-center"
                                style={{
                                    background: "var(--bg-card)",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                    border: "1px solid var(--border-default)",
                                    boxShadow: "var(--shadow-glow-cyan)"
                                }}
                            >
                                <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Ready to Prove Yourself?</h2>
                                <p className="mb-8 text-lg" style={{ color: "var(--text-secondary)" }}>Registration closes March 4th. Don&apos;t miss your chance.</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href="/apply"
                                        className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-2xl transition-all hover:scale-105"
                                        style={{
                                            background: "var(--gradient-primary)",
                                            color: "#000",
                                            boxShadow: "var(--shadow-glow)"
                                        }}
                                    >
                                        Register for ₹60
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="/faq"
                                        className="px-8 py-4 text-lg font-medium rounded-2xl transition-all"
                                        style={{
                                            background: "var(--bg-elevated)",
                                            border: "1px solid var(--border-default)",
                                            color: "var(--text-primary)"
                                        }}
                                    >
                                        View FAQ
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}