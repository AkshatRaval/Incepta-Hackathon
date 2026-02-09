"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Shuffle, Box, Code, Zap, Trophy } from "lucide-react";

const timelineEvents = [
    {
        day: "Day 0",
        date: "Mar 5",
        title: "Orientation",
        desc: "Community intros & 'Spin-the-Wheel' for solo participants",
        icon: Users,
        color: "#10b981",
    },
    {
        day: "Day 1",
        date: "Mar 6",
        title: "Team Swap",
        desc: "Finalizing roles and member adjustments",
        icon: Shuffle,
        color: "#06b6d4",
    },
    {
        day: "Day 3",
        date: "Mar 8",
        title: "Mystery Box",
        desc: "First-come, first-serve problem statement selection",
        icon: Box,
        color: "#3b82f6",
    },
    {
        day: "Day 4-5",
        date: "Mar 9-10",
        title: "Round 1: MVP",
        desc: "48 hours to build core solution. 10% elimination.",
        icon: Code,
        color: "#8b5cf6",
    },
    {
        day: "Day 7",
        date: "Mar 12",
        title: "Round 2: Twist",
        desc: "12-hour sprint. New features every 30 min. 50% cut.",
        icon: Zap,
        color: "#ec4899",
    },
    {
        day: "Day 9",
        date: "Mar 14",
        title: "Grand Finale",
        desc: "Technical Defense & Debate. Champion crowned!",
        icon: Trophy,
        color: "#f59e0b",
    },
];

export function WalkingTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
            setScrollProgress(progress);

            // Calculate active index based on scroll
            const newIndex = Math.min(
                Math.floor(progress * timelineEvents.length),
                timelineEvents.length - 1
            );
            setActiveIndex(newIndex);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    // p5.js-style character animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrame: number;
        let walkCycle = 0;

        const drawCharacter = (x: number, y: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Walking animation cycle
            walkCycle += 0.15;
            const legSwing = Math.sin(walkCycle) * 8;
            const armSwing = Math.sin(walkCycle + Math.PI) * 10;
            const bounce = Math.abs(Math.sin(walkCycle * 2)) * 3;

            ctx.save();
            ctx.translate(x, y - bounce);

            // Glow effect
            ctx.shadowColor = "#10b981";
            ctx.shadowBlur = 20;

            // Body
            ctx.strokeStyle = "#10b981";
            ctx.lineWidth = 3;
            ctx.lineCap = "round";

            // Head
            ctx.beginPath();
            ctx.arc(0, -35, 12, 0, Math.PI * 2);
            ctx.stroke();

            // Eyes (LED-like)
            ctx.fillStyle = "#06b6d4";
            ctx.beginPath();
            ctx.arc(-4, -37, 2, 0, Math.PI * 2);
            ctx.arc(4, -37, 2, 0, Math.PI * 2);
            ctx.fill();

            // Antenna
            ctx.beginPath();
            ctx.moveTo(0, -47);
            ctx.lineTo(0, -55);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, -57, 3, 0, Math.PI * 2);
            ctx.fillStyle = "#f59e0b";
            ctx.fill();

            // Body line
            ctx.beginPath();
            ctx.moveTo(0, -23);
            ctx.lineTo(0, 5);
            ctx.stroke();

            // Arms
            ctx.beginPath();
            ctx.moveTo(0, -15);
            ctx.lineTo(-15, -5 + armSwing);
            ctx.moveTo(0, -15);
            ctx.lineTo(15, -5 - armSwing);
            ctx.stroke();

            // Legs
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo(-10, 25 + legSwing);
            ctx.moveTo(0, 5);
            ctx.lineTo(10, 25 - legSwing);
            ctx.stroke();

            // Feet
            ctx.beginPath();
            ctx.arc(-10, 28 + legSwing, 4, 0, Math.PI * 2);
            ctx.arc(10, 28 - legSwing, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#10b981";
            ctx.fill();

            ctx.restore();
        };

        const animate = () => {
            const charX = 60 + scrollProgress * (canvas.width - 120);
            drawCharacter(charX, canvas.height / 2 + 10);
            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [scrollProgress]);

    return (
        <section id="roadmap" className="relative px-4 sm:px-6 py-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        The <span className="text-cyan-400">9-Day</span> Journey
                    </h2>
                    <p className="text-slate-400">Scroll horizontally to explore the roadmap →</p>
                </div>

                {/* Character Canvas */}
                <div className="relative mb-4">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={100}
                        className="w-full h-24 mx-auto"
                        style={{ maxWidth: "800px" }}
                    />
                    {/* Progress line */}
                    <div className="absolute bottom-4 left-0 right-0 h-1 bg-slate-800 rounded-full mx-auto" style={{ maxWidth: "700px", marginLeft: "50px", marginRight: "50px" }}>
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500 rounded-full"
                            style={{ width: `${scrollProgress * 100}%` }}
                        />
                    </div>
                </div>

                {/* Horizontal Scrollable Timeline */}
                <div
                    ref={containerRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {timelineEvents.map((event, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex-shrink-0 w-72 snap-center p-6 rounded-3xl border transition-all duration-300 ${i === activeIndex
                                    ? "bg-white/[0.08] border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                                    : "bg-white/[0.03] border-white/[0.05] hover:border-white/[0.1]"
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="p-3 rounded-xl"
                                    style={{ backgroundColor: `${event.color}20` }}
                                >
                                    <event.icon className="w-5 h-5" style={{ color: event.color }} />
                                </div>
                                <div>
                                    <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest">
                                        {event.day}
                                    </span>
                                    <span className="text-slate-600 mx-2">•</span>
                                    <span className="text-cyan-400 font-mono text-xs">{event.date}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{event.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Scroll indicator */}
                <div className="flex justify-center gap-2 mt-4">
                    {timelineEvents.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const container = containerRef.current;
                                if (container) {
                                    const scrollTo = (i / (timelineEvents.length - 1)) * (container.scrollWidth - container.clientWidth);
                                    container.scrollTo({ left: scrollTo, behavior: "smooth" });
                                }
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "w-6 bg-emerald-500" : "bg-slate-700 hover:bg-slate-600"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
