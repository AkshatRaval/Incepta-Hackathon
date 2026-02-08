"use client";

import { motion } from "framer-motion";
import { Check, Clock, Calendar } from "lucide-react";
import { NeuralBackground } from "@/components/effects/neural-background";

const events = [
    { date: "Feb 1", title: "Registration Opens", desc: "Sign up and form your team.", status: "done" },
    { date: "Feb 15", title: "Early Bird Ends", desc: "Last day for discounted pricing.", status: "done" },
    { date: "Mar 1", title: "Registration Closes", desc: "Final deadline to register.", status: "current" },
    { date: "Mar 10", title: "Pre-Event Workshops", desc: "Join workshops by industry experts.", status: "upcoming" },
    { date: "Mar 15", title: "Hackathon Begins", desc: "Opening ceremony at 9:00 AM IST.", status: "upcoming" },
    { date: "Mar 17", title: "Submissions Due", desc: "Submit by 10:00 AM IST.", status: "upcoming" },
    { date: "Mar 18", title: "Winners Announced", desc: "Closing ceremony at 5:00 PM IST.", status: "upcoming" },
];

export default function TimelinePage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative min-h-screen text-white pt-24">
                <div className="relative z-10 flex flex-col gap-y-20">
                    <section className="px-6 py-24">
                        <div className="max-w-4xl mx-auto">
                            <div className="relative bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)] p-12">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                        <Calendar className="w-4 h-4 text-cyan-400" />
                                        <span className="text-sm text-cyan-400 font-medium">Timeline</span>
                                    </div>
                                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
                                        Event <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Schedule</span>
                                    </h1>
                                    <p className="text-slate-300 text-lg">Mark your calendar with these important dates.</p>
                                </motion.div>

                                <div className="relative">
                                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-slate-700 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                    <div className="space-y-12">
                                        {events.map((event, i) => (
                                            <motion.div
                                                key={event.title}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="relative pl-20"
                                            >
                                                <div className="absolute left-0 top-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 rounded-full bg-black border-4 border-slate-950/50 flex items-center justify-center z-10">
                                                        {event.status === "done" ? (
                                                            <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                                                                <Check className="w-5 h-5 text-white" />
                                                            </div>
                                                        ) : event.status === "current" ? (
                                                            <div className="w-full h-full rounded-full bg-cyan-500 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                                                                <Clock className="w-5 h-5 text-white" />
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm font-bold text-slate-500">{i + 1}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className={`p-6 rounded-2xl bg-black border-l-4 transition-all ${event.status === "done"
                                                        ? "border-l-emerald-500 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                                                        : event.status === "current"
                                                            ? "border-l-cyan-500 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                                                            : "border-l-slate-700 border border-white/5"
                                                    }`}>
                                                    <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${event.status === "done" ? "text-emerald-400" :
                                                            event.status === "current" ? "text-cyan-400" :
                                                                "text-slate-500"
                                                        }`}>
                                                        {event.date}, 2026
                                                    </div>
                                                    <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                                                    <p className="text-slate-400 text-sm leading-relaxed">{event.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                        <span className="text-sm text-slate-400">Completed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                                        <span className="text-sm text-slate-400">In Progress</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-slate-600" />
                                        <span className="text-sm text-slate-400">Upcoming</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
