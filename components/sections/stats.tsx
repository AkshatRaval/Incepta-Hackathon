"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, Trophy, Clock, Lightbulb } from "lucide-react";

const stats = [
    { icon: Users, value: 500, suffix: "+", label: "Participants", color: "emerald" },
    { icon: Trophy, value: 50000, prefix: "$", label: "In Prizes", color: "amber" },
    { icon: Clock, value: 48, label: "Hours", color: "blue" },
    { icon: Lightbulb, value: 50, suffix: "+", label: "Mentors", color: "purple" },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += 1;
            const progress = current / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));

            if (current >= steps) {
                setCount(value);
                clearInterval(timer);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [value, inView]);

    return (
        <span ref={ref}>
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

const colorClasses = {
    emerald: {
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        glow: "group-hover:shadow-emerald-500/20",
    },
    amber: {
        text: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        glow: "group-hover:shadow-amber-500/20",
    },
    blue: {
        text: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        glow: "group-hover:shadow-blue-500/20",
    },
    purple: {
        text: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        glow: "group-hover:shadow-purple-500/20",
    },
};

export function StatsSection() {
    return (
        <section className="py-20 sm:py-32 px-4 sm:px-6">
            <div className="section-container">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stats.map((stat, index) => {
                        const colors = colorClasses[stat.color as keyof typeof colorClasses];
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className={`group premium-card p-6 sm:p-8 text-center ${colors.glow} hover:shadow-2xl`}
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border mb-4`}>
                                    <stat.icon className={`w-7 h-7 ${colors.text}`} />
                                </div>
                                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${colors.text} mb-2`}>
                                    <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                </div>
                                <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
