"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles, Zap, Trophy } from "lucide-react";
import { useRef } from "react";

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 overflow-hidden"
        >
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 max-w-5xl mx-auto text-center"
            >
                {/* Announcement Badge */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10 group cursor-pointer hover:border-emerald-500/50 transition-all"
                >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-slate-300">March 15-17, 2026</span>
                    <span className="w-px h-4 bg-slate-700" />
                    <span className="text-sm font-semibold text-emerald-400">Registration Open</span>
                    <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.2 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
                >
                    <span className="text-slate-100 block">Build the Future at</span>
                    <span className="gradient-text block mt-2">INCEPTA 2026</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.3 }}
                    className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed text-balance"
                >
                    Join the most prestigious hackathon of the year. 48 hours of innovation,
                    world-class mentors, and over $50,000 in prizes await.
                </motion.p>

                {/* Stats Row */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-14"
                >
                    {[
                        { value: "500+", label: "Innovators", icon: Zap, color: "text-emerald-400" },
                        { value: "$50K", label: "In Prizes", icon: Trophy, color: "text-amber-400" },
                        { value: "48h", label: "Of Creation", icon: Sparkles, color: "text-blue-400" },
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeInUp}
                            className="text-center group"
                        >
                            <div className={`text-4xl sm:text-5xl font-bold ${stat.color} mb-1 group-hover:scale-110 transition-transform`}>
                                {stat.value}
                            </div>
                            <div className="text-slate-500 text-sm font-medium uppercase tracking-wider flex items-center gap-1.5 justify-center">
                                <stat.icon className="w-3 h-3" />
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/apply" className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                        <button className="relative glow-button flex items-center gap-2 text-lg">
                            Apply Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <Link
                        href="/about"
                        className="px-8 py-4 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800/50 hover:border-slate-600 transition-all"
                    >
                        Learn More
                    </Link>
                </motion.div>

                {/* Trusted By */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.7 }}
                    className="mt-20 pt-10 border-t border-slate-800/50"
                >
                    <p className="text-slate-600 text-sm uppercase tracking-widest mb-6">Backed by Industry Leaders</p>
                    <div className="flex items-center justify-center gap-8 sm:gap-12 opacity-40 hover:opacity-60 transition-opacity">
                        {["Google", "Microsoft", "Meta", "AWS", "OpenAI"].map((company) => (
                            <span key={company} className="text-slate-500 font-semibold text-sm sm:text-base">
                                {company}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                    <span className="text-slate-600 text-xs uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                        Scroll to Explore
                    </span>
                    <ChevronDown className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </motion.div>
            </motion.div>
        </section>
    );
}
