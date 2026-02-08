"use client";

import { motion } from "framer-motion";
import { Check, Circle, ArrowRight } from "lucide-react";

const timelineEvents = [
    {
        date: "Feb 1",
        title: "Registration Opens",
        description: "Sign up and form your team of up to 4 members.",
        status: "completed",
    },
    {
        date: "Feb 15",
        title: "Early Bird Ends",
        description: "Last day for discounted registration pricing.",
        status: "completed",
    },
    {
        date: "Mar 1",
        title: "Registration Closes",
        description: "Final deadline to register your team.",
        status: "current",
    },
    {
        date: "Mar 15",
        title: "Hackathon Begins",
        description: "Opening ceremony and 48-hour countdown starts!",
        status: "upcoming",
    },
    {
        date: "Mar 17",
        title: "Submissions Due",
        description: "All projects must be submitted by 10 AM IST.",
        status: "upcoming",
    },
    {
        date: "Mar 18",
        title: "Winners Announced",
        description: "Closing ceremony and prize distribution.",
        status: "upcoming",
    },
];

export function TimelineSection() {
    return (
        <section className="py-20 sm:py-32 px-4 sm:px-6">
            <div className="section-container max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
                        Important Dates
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-6">
                        Event <span className="gradient-text-gold">Timeline</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        Mark your calendars. Here&apos;s everything you need to know.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-amber-500 to-slate-700" />

                    <div className="space-y-1">
                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={event.title}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                                className="relative flex gap-6 sm:gap-10 pb-10"
                            >
                                {/* Dot */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${event.status === "completed"
                                                ? "bg-emerald-500 border-emerald-400"
                                                : event.status === "current"
                                                    ? "bg-amber-500 border-amber-400 pulse-glow"
                                                    : "bg-slate-800 border-slate-600"
                                            }`}
                                    >
                                        {event.status === "completed" ? (
                                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        ) : event.status === "current" ? (
                                            <Circle className="w-3 h-3 sm:w-4 sm:h-4 text-slate-900 fill-current" />
                                        ) : (
                                            <span className="text-slate-500 font-bold text-xs sm:text-sm">{index + 1}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-2">
                                    <div
                                        className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 ${event.status === "completed"
                                                ? "text-emerald-400"
                                                : event.status === "current"
                                                    ? "text-amber-400"
                                                    : "text-slate-600"
                                            }`}
                                    >
                                        {event.date}, 2026
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2">{event.title}</h3>
                                    <p className="text-slate-400 text-sm sm:text-base">{event.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-8"
                >
                    <a
                        href="/timeline"
                        className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors group"
                    >
                        View full schedule
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
