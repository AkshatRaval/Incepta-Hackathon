"use client";

import { motion } from "framer-motion";
import { Brain, Globe, Shield, Rocket, Users, Zap, Target, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { NeuralBackground } from "@/components/effects/neural-background";

const tracks = [
    { icon: Brain, title: "AI & Machine Learning", desc: "Build intelligent solutions using cutting-edge AI.", prize: "$5,000" },
    { icon: Globe, title: "Web3 & Blockchain", desc: "Create decentralized applications and smart contracts.", prize: "$5,000" },
    { icon: Shield, title: "Cybersecurity", desc: "Develop security tools and protocols.", prize: "$5,000" },
    { icon: Rocket, title: "Open Innovation", desc: "Build anything that pushes boundaries.", prize: "$5,000" },
    { icon: Users, title: "Social Impact", desc: "Create solutions that address real-world challenges.", prize: "$5,000" },
    { icon: Zap, title: "Developer Tools", desc: "Build tools that enhance developer productivity.", prize: "$5,000" },
];

const benefits = [
    "48 hours of focused building",
    "$500+ in cloud credits",
    "1-on-1 mentorship sessions",
    "Workshops from industry leaders",
    "Exclusive swag kit",
    "Certificate of participation",
    "Networking opportunities",
    "Access to career fair",
];

export default function AboutPage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative min-h-screen text-white pt-24">
                <div className="relative z-10 flex flex-col gap-y-20">
                    <section className="px-6 py-24">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                    <Target className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm text-cyan-400 font-medium">About INCEPTA</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
                                    48 Hours to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Build the Future</span>
                                </h1>
                                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                                    INCEPTA is the most prestigious hackathon of 2026. Join 500+ innovators, compete for $50,000 in prizes, and build solutions that matter.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    <section className="px-6 py-24">
                        <div className="max-w-6xl mx-auto">
                            <div className="relative bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)] p-12">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl font-bold mb-4 text-white">
                                        Competition <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Tracks</span>
                                    </h2>
                                    <p className="text-slate-300">Six unique tracks, each with a $5,000 prize pool.</p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {tracks.map((track, i) => (
                                        <motion.div key={track.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-8 rounded-2xl bg-black border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                                    <track.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">{track.prize}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-white">{track.title}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">{track.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-6 py-24">
                        <div className="max-w-6xl mx-auto">
                            <div className="relative bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)] p-12">
                                <div className="grid lg:grid-cols-2 gap-16 items-center">
                                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">
                                            What You <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Get</span>
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {benefits.map((benefit) => (
                                                <div key={benefit} className="flex items-center gap-3 p-3 rounded-lg bg-black border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
                                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                                                        <Check className="w-3 h-3 text-emerald-400" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-300">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-10 rounded-2xl bg-black border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
                                        <div className="relative z-10">
                                            <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">$50K+</div>
                                            <div className="text-slate-500 uppercase tracking-widest text-sm mb-8 font-semibold">Total Prize Pool</div>
                                            <Link href="/apply" className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-black bg-[#00f7ff] rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(0,247,255,0.6)] transition-all">
                                                Apply Now
                                                <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-6 py-24 pb-32">
                        <div className="max-w-3xl mx-auto">
                            <div className="relative bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)] p-12 text-center">
                                <h2 className="text-3xl font-bold mb-4 text-white">Ready to Build?</h2>
                                <p className="text-slate-300 mb-8 text-lg">Registration closes March 1st. Don&apos;t miss out.</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/apply" className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-black bg-[#00f7ff] rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(0,247,255,0.6)] transition-all">
                                        Apply Now
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link href="/faq" className="px-8 py-4 text-lg font-medium text-white bg-white/5 border border-cyan-500/30 rounded-2xl hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
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
