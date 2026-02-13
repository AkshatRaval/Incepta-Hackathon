"use client";

import { motion } from "framer-motion";
import { NeuralBackground } from "@/components/effects/neural-background";
import { ShieldAlert, Heart, MessageCircle, AlertOctagon } from "lucide-react";

export default function CodeOfConductPage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="badge badge-cyan mb-6 flex items-center gap-2 justify-center w-fit mx-auto px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            <Heart className="w-4 h-4" />
                            <span>Community Guidelines</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                            Code of <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Conduct</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            INCEPTA 2026 is dedicated to providing a safe, inclusive, and harassment-free hackathon experience for everyone.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {/* Core Values */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <ValueCard
                                icon={ShieldAlert}
                                title="Safe Environment"
                                desc="We are committed to providing a friendly, safe and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, or religion."
                            />
                            <ValueCard
                                icon={MessageCircle}
                                title="Respectful Communication"
                                desc="Be kind to others. Do not insult or put down other attendees. Harassment and exclusionary behavior aren't acceptable."
                            />
                        </div>

                        {/* Detailed Policy */}
                        <div className="p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md">
                            <h2 className="text-2xl font-bold text-white mb-6">Harassment Policy</h2>
                            <div className="text-slate-400 space-y-4 leading-relaxed">
                                <p>Harassment includes offensive verbal comments related to gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion, technology choices, sexual images in public spaces, deliberate intimidation, stalking, following, harassing photography or recording, sustained disruption of talks or other events, inappropriate physical contact, and unwelcome sexual attention.</p>
                                <p>Participants asked to stop any harassing behavior are expected to comply immediately.</p>
                                <p>If a participant engages in harassing behavior, the conference organisers may take any action they deem appropriate, including warning the offender or expulsion from the conference with no refund.</p>
                            </div>
                        </div>

                        {/* Reporting */}
                        <div className="p-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="p-4 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                                    <AlertOctagon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">Reporting an Incident</h2>
                                    <p className="text-slate-400 mb-4">
                                        If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of conference staff immediately.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <a href="mailto:conduct@incepta.dev" className="px-6 py-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors font-semibold text-center">
                                            conduct@incepta.dev
                                        </a>
                                        <a href="tel:+919876543210" className="px-6 py-3 rounded-lg bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-colors font-semibold text-center">
                                            +91 98765 43210
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

function ValueCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
        >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    );
}
