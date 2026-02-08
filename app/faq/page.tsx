"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Mail } from "lucide-react";
import { useState } from "react";
import { NeuralBackground } from "@/components/effects/neural-background";

const faqs = [
    { q: "Who can participate?", a: "Anyone 16+ with a passion for building. Students, professionals, and hobbyists welcome." },
    { q: "How much does registration cost?", a: "Early bird: ₹299, Regular: ₹499. Covers event access, swag, meals (in-person), and prize eligibility." },
    { q: "Can I participate solo?", a: "Yes! Teams of 1-4 are allowed. Find teammates on our Discord before the event." },
    { q: "Is this virtual or in-person?", a: "Hybrid! Join online from anywhere or at our hubs in Mumbai, Bangalore, and Delhi." },
    { q: "What can I build?", a: "Anything! Choose from 6 tracks: AI/ML, Web3, Security, Dev Tools, Social Impact, or Open Innovation." },
    { q: "Do I need to have a team before registering?", a: "No, you can register solo and find teammates on Discord before March 1st." },
    { q: "What resources are provided?", a: "$500+ in cloud credits, premium APIs, mentor sessions, and 24/7 support." },
    { q: "When are winners announced?", a: "March 18, 2026 at 5:00 PM IST during the closing ceremony." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="card overflow-hidden transition-all hover:border-[var(--border-default)]">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="font-bold text-lg text-[var(--text-primary)] pr-4">{q}</span>
                <div className={`w-8 h-8 rounded-full bg-[var(--bg-surface)] flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180 bg-[var(--accent)] text-white" : "text-[var(--text-muted)]"}`}>
                    <ChevronDown className="w-5 h-5 flex-shrink-0" />
                </div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 text-[var(--text-secondary)] text-base leading-relaxed border-t border-[var(--border-subtle)] pt-4">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQPage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative z-10 pt-24 pb-20">
                <section className="py-20 px-6">
                    <div className="container max-w-3xl mx-auto">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <div className="badge mb-6 mx-auto">
                                <HelpCircle className="w-4 h-4" />
                                <span>FAQ</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                                Frequently Asked <span className="text-gradient">Questions</span>
                            </h1>
                            <p className="text-[var(--text-secondary)] text-lg">Everything you need to know about INCEPTA 2026.</p>
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
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="card-static p-10 text-center mt-12 bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] border border-[var(--border-subtle)]"
                        >
                            <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
                            <p className="text-[var(--text-secondary)] mb-8 text-lg">Our team is here to help you succeed.</p>
                            <a href="mailto:hello@incepta.dev" className="btn btn-primary btn-lg">
                                <Mail className="w-5 h-5" />
                                Contact Us
                            </a>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
}
