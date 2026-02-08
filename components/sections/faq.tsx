"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";

const faqs = [
    {
        question: "Who can participate in INCEPTA?",
        answer: "Anyone passionate about building! Students, professionals, and hobbyists are welcome. Teams can have 1-4 members, and participants must be 16 years or older.",
    },
    {
        question: "Is there a registration fee?",
        answer: "Yes, registration is ₹499 (early bird: ₹299). This covers event access, swag kit, meals for in-person participants, and eligibility for our $50,000 prize pool.",
    },
    {
        question: "Do I need to have a team before registering?",
        answer: "No! You can register individually and form or join a team later. We have a team formation channel on Discord where you can connect with other participants.",
    },
    {
        question: "What can I build?",
        answer: "Anything! We have six tracks: AI/ML, Web3, Cybersecurity, Social Impact, Dev Tools, and Open Innovation. You can also build something outside these tracks.",
    },
    {
        question: "Is this event virtual or in-person?",
        answer: "INCEPTA is hybrid! Participate fully online from anywhere in the world, or join us at hub locations in Mumbai, Bangalore, and Delhi.",
    },
    {
        question: "What resources will be provided?",
        answer: "Access to APIs, cloud credits (AWS, GCP, Azure), mentor sessions, workshops from industry experts, and 24/7 technical support during the hackathon.",
    },
];

export function FAQSection() {
    return (
        <section className="py-20 sm:py-32 px-4 sm:px-6">
            <div className="section-container max-w-3xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        Everything you need to know about INCEPTA 2026.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`faq-${index}`}
                                className="premium-card border-0 px-6 data-[state=open]:border-emerald-500/30"
                            >
                                <AccordionTrigger className="text-left text-slate-100 font-semibold hover:no-underline py-5 text-base sm:text-lg gap-4">
                                    <div className="flex items-start gap-4">
                                        <HelpCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        <span>{faq.question}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-400 pb-5 pl-9 leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12 premium-card p-8 sm:p-10"
                >
                    <h3 className="text-xl font-bold text-slate-100 mb-3">Still have questions?</h3>
                    <p className="text-slate-400 mb-6">Can&apos;t find the answer you&apos;re looking for? Reach out to our team.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="mailto:hello@incepta.dev"
                            className="glow-button inline-flex items-center gap-2"
                        >
                            Contact Us
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="/faq"
                            className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800/50 transition-colors"
                        >
                            View All FAQs
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
