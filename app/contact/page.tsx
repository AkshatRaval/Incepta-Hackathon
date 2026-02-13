"use client";

import { motion } from "framer-motion";
import { NeuralBackground } from "@/components/effects/neural-background";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 flex items-center justify-center">
                <div className="max-w-4xl w-full mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="badge badge-cyan mb-6 flex items-center gap-2 justify-center w-fit mx-auto px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            <MessageCircle className="w-4 h-4" />
                            <span>Get in Touch</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                            Contact <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Us</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Have questions? We're here to help. Reach out to the organizing team.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <ContactCard
                            icon={Mail}
                            title="Email Us"
                            detail="hello@incepta.dev"
                            href="mailto:hello@incepta.dev"
                            delay={0.1}
                        />
                        <ContactCard
                            icon={Phone}
                            title="Call Us"
                            detail="+91 98765 43210"
                            href="tel:+919876543210"
                            delay={0.2}
                        />
                        <ContactCard
                            icon={MapPin}
                            title="Visit Us"
                            detail="Mumbai, India"
                            delay={0.3}
                        />
                        <ContactCard
                            icon={MessageCircle}
                            title="Socials"
                            detail="@incepta2026"
                            href="https://twitter.com/incepta2026"
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function ContactCard({ icon: Icon, title, detail, href, delay = 0 }: { icon: any, title: string, detail: string, href?: string, delay?: number }) {
    const Content = () => (
        <div className="flex flex-col items-center text-center gap-4">
            <div className="p-4 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                <p className="text-slate-400 font-mono">{detail}</p>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="group relative p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300"
        >
            {href ? (
                <a href={href} className="block w-full h-full">
                    <Content />
                </a>
            ) : (
                <Content />
            )}
        </motion.div>
    );
}
