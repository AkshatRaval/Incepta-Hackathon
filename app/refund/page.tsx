"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeuralBackground } from "@/components/effects/neural-background";
import { Shield, RefreshCcw, AlertTriangle, Info, CreditCard, Ban } from "lucide-react";

export default function RefundPage() {
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
                            <Shield className="w-4 h-4" />
                            <span>Policy</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                            Refund & <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Cancellation</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Comprehensive details regarding our no-refund policy and fee allocation.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {/* No Refunds Policy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-md"
                        >
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="p-3 rounded-lg bg-red-500/10 text-red-400 shrink-0">
                                    <Ban className="w-6 h-6" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-white">Strict Non-Refundable Policy</h2>
                                    <div className="text-slate-400 leading-relaxed space-y-3">
                                        <p>All registration fees for INCEPTA 2026 are <strong className="text-red-400">final and non-refundable</strong>.</p>
                                        <p>Unlike commercial events, INCEPTA is a student-run, independent educational initiative. The funds collected are immediately allocated to securing logistics, server infrastructure, and swag for participants. Therefore, we cannot process refunds once a transaction is complete.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Detailed Scenarios */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <InfoCard title="If You Cannot Attend" icon={AlertTriangle}>
                                If for any reason you are unable to attend the hackathon after registering, your fee will not be refunded. However, you may transfer your ticket to another student up to 48 hours before the event by contacting support.
                            </InfoCard>
                            <InfoCard title="Disqualification" icon={Ban}>
                                If a team or individual is disqualified from the event for violating the Code of Conduct, cheating, or unethical behavior, 100% of the entry fee is forfeited. No appeals for refunds will be entertained in such cases.
                            </InfoCard>
                            <InfoCard title="Event Cancellation" icon={Info}>
                                In the unlikely event that INCEPTA 2026 is completely cancelled by the organizers due to unforeseen circumstances (force majeure), we will strive to refund the fee after deducting unavoidable processing charges (approx. 5-10%).
                            </InfoCard>
                            <InfoCard title="Technical Failures" icon={CreditCard}>
                                If a double payment occurs due to a technical glitch, the duplicate amount <strong>will be refunded</strong> automatically within 5-7 business days. Please retain your transaction IDs for reference.
                            </InfoCard>
                        </div>

                        {/* Payment Purpose */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md"
                        >
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                                    <RefreshCcw className="w-6 h-6" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-white">Indicative use of registration fee</h2>
                                    <p className="text-slate-400 leading-relaxed">
                                        We believe in complete transparency. The nominal fee of ₹60 is used directly for participant benefits. Percentages are approximate and may vary based on final participation and costs:
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-4 mt-4">
                                        <CostItem
                                            label="Platform & Tools"
                                            value="30%"
                                            desc="Discord management, bot subscriptions, submission tools & automation services"
                                        />
                                        <CostItem
                                            label="Prizes & Certificates"
                                            value="30%"
                                            desc="Winner rewards, digital certificates generation & distribution"
                                        />
                                        <CostItem
                                            label="Event Operations"
                                            value="20%"
                                            desc="Management, coordination, mentor onboarding & support handling"
                                        />
                                        <CostItem
                                            label="Contingency & Gateway"
                                            value="20%"
                                            desc="Gateway fees, transaction failures & emergency operational expenses"
                                        />
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-center pt-8 text-slate-500 text-sm"
                        >
                            <p>Transaction disputes regarding double payments? Contact <a href="mailto:finance@incepta.dev" className="text-cyan-400 hover:underline transition-colors">finance@incepta.dev</a> with your Transaction ID.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}

function InfoCard({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Icon className="w-5 h-5 text-slate-400" />
                {title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
                {children}
            </p>
        </div>
    );
}

function CostItem({ label, value, desc }: { label: string; value: string; desc: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.li
                layout
                className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                        {value}
                    </div>
                    <div className="text-white font-bold text-base">
                        {label}
                    </div>
                </div>
                <div className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider font-semibold">
                    Read More
                </div>
            </motion.li>

            {/* Floating "Read More" Card */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-20 top-full left-0 right-0 mt-2 p-4 rounded-xl bg-black/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] shadow-cyan-500/10"
                    >
                        <div className="text-slate-300 text-sm leading-relaxed">
                            {desc}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
