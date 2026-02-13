"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { NeuralBackground } from "@/components/effects/neural-background";

const faqs = [
    {
        q: "Why is there a ₹60 fee?",
        a: "To ensure a high-quality, committed pool of hackers. The fee filters out casual signups and guarantees serious participants who will see it through all 9 days."
    },
    {
        q: "What if I don't have a team?",
        a: "No worries! We facilitate 'Spin-the-Wheel' team forming during Orientation (Day 0) to ensure every solo participant gets a balanced squad with complementary skills."
    },
    {
        q: "What is the team size?",
        a: "Teams must have exactly 4 members. No more, no less. This ensures fair competition and balanced workload distribution."
    },
    {
        q: "What are the problem statement themes?",
        a: "Themes include Healthcare, Education, FinTech, and more. But here's the twist—you pick your theme during 'The Mystery Box' on a first-come, first-serve basis!"
    },
    {
        q: "How does The Twist Round work?",
        a: "During the 12-hour Round 2, new feature requirements are released every 30 minutes. Your team must adapt on-the-fly while maintaining code quality. 50% of teams are eliminated here."
    },
    {
        q: "What is Technical Defense?",
        a: "In the Grand Finale, you don't just demo—you defend. Judges will question your architecture, code decisions, and technical trade-offs in a live debate format."
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={false}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${open ? "bg-white/10 border-cyan-500/50" : "bg-white/5 border-white/10 hover:border-cyan-500/30"}`}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className={`font-bold text-lg pr-4 transition-colors ${open ? "text-cyan-400" : "text-white"}`}>
                    {q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? "rotate-180 bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-slate-400"}`}>
                    <ChevronDown className="w-5 h-5 flex-shrink-0" />
                </div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "anticipate" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 text-slate-300 text-base leading-relaxed border-t border-white/5 pt-4">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQPage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="badge badge-cyan mb-6 flex items-center gap-2 justify-center w-fit mx-auto px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            <HelpCircle className="w-4 h-4" />
                            <span>Help Center</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black mb-6 text-white tracking-tight">
                            Frequently Asked <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Questions</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">
                            Everything you need to know about the format, rules, and twist mechanics of INCEPTA 2026.
                        </p>
                    </motion.div>

                    {/* FAQs */}
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={faq.q}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <FAQItem q={faq.q} a={faq.a} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-emerald-900/20 border border-cyan-500/20 text-center backdrop-blur-md"
                    >
                        <h3 className="text-2xl font-bold text-white mb-3">Still have questions?</h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            Can't find the answer you're looking for? Reach out to our support team directly.
                        </p>
                        <a
                            href="mailto:hello@incepta.dev"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-cyan-50 transition-colors shadow-lg hover:shadow-cyan-500/20"
                        >
                            <Mail className="w-5 h-5" />
                            Contact Support
                        </a>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
