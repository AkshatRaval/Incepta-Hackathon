"use client";

import { motion } from "framer-motion";
import { NeuralBackground } from "@/components/effects/neural-background";
import { HelpCircle, ArrowRight, CreditCard, User, Upload, CheckCircle } from "lucide-react";

export default function HelpPage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="badge badge-cyan mb-6 flex items-center gap-2 justify-center w-fit mx-auto px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            <HelpCircle className="w-4 h-4" />
                            <span>Help Center</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                            How to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Apply</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            A step-by-step guide to registering for INCEPTA 2026. Follow these instructions to secure your spot.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500/50 to-emerald-500/50 hidden md:block" />

                        <Step
                            number={1}
                            title="Fill Application Details"
                            icon={User}
                            desc="Navigate to the Apply page. Enter your Team Name, personal details, Discord ID, and GitHub profile."
                        >
                            <div className="aspect-video w-full rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500">
                                {/* Placeholder for Screenshot */}
                                <div className="text-center">
                                    <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <span className="text-sm">Screenshot: Application Form</span>
                                </div>
                            </div>
                        </Step>

                        <Step
                            number={2}
                            title="Pay Registration Fee"
                            icon={CreditCard}
                            desc="Click the 'Pay Now' button. You will be automatically redirected to Instamojo. Complete the payment securely."
                        >
                            <div className="aspect-video w-full rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500">
                                {/* Placeholder for Screenshot */}
                                <div className="text-center">
                                    <CreditCard className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <span className="text-sm">Screenshot: Secure Redirect</span>
                                </div>
                            </div>
                        </Step>

                        <Step
                            number={3}
                            title="Submit Proof of Payment"
                            icon={Upload}
                            desc="Return to the application form. Enter your Transaction ID in the dedicated field. This is crucial for verifying your application."
                        >
                            <div className="aspect-video w-full rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500">
                                {/* Placeholder for Screenshot */}
                                <div className="text-center">
                                    <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <span className="text-sm">Screenshot: Transaction ID Input</span>
                                </div>
                            </div>
                        </Step>

                        <Step
                            number={4}
                            title="Confirmation"
                            icon={CheckCircle}
                            desc="Click 'Submit Application'. You will receive a confirmation email within 24 hours once we verify your payment ID."
                            isLast
                        >
                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                <strong>Tip:</strong> Check your Spam folder if you don't see the email. Join our Discord server for real-time updates.
                            </div>
                        </Step>

                    </div>
                </div>
            </div>
        </>
    );
}

function Step({ number, title, icon: Icon, desc, children, isLast }: { number: number, title: string, icon: any, desc: string, children?: React.ReactNode, isLast?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6 md:gap-10 mb-12 relative"
        >
            <div className="flex flex-col items-center shrink-0">
                <div className="w-14 h-14 rounded-full bg-black border border-cyan-500/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <span className="text-xl font-bold text-cyan-400">{number}</span>
                </div>
            </div>

            <div className={`flex-1 pb-12 ${!isLast ? 'border-b border-white/5' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                    {desc}
                </p>
                {children && (
                    <div className="mt-4">
                        {children}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
