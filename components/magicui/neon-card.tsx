"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface NeonCardProps {
    children: React.ReactNode;
    className?: string;
    borderColor?: "cyan" | "pink" | "green" | "gradient";
}

export function NeonCard({
    children,
    className,
    borderColor = "gradient",
}: NeonCardProps) {
    const borderClasses = {
        cyan: "before:bg-[var(--neon-cyan)]",
        pink: "before:bg-[var(--neon-pink)]",
        green: "before:bg-[var(--neon-green)]",
        gradient:
            "before:bg-[linear-gradient(135deg,var(--neon-cyan),var(--neon-pink),var(--neon-green),var(--neon-cyan))] before:bg-[length:300%_300%] before:animate-gradient-rotate",
    };

    const glowClasses = {
        cyan: "shadow-[0_0_30px_rgba(0,255,255,0.2)]",
        pink: "shadow-[0_0_30px_rgba(255,0,255,0.2)]",
        green: "shadow-[0_0_30px_rgba(57,255,20,0.2)]",
        gradient: "shadow-[0_0_30px_rgba(0,255,255,0.15),0_0_30px_rgba(255,0,255,0.15)]",
    };

    return (
        <div
            className={cn(
                "relative rounded-2xl p-[2px] transition-all duration-500",
                "before:absolute before:inset-0 before:rounded-2xl before:p-[2px]",
                "before:-z-10",
                borderClasses[borderColor],
                glowClasses[borderColor],
                "hover:shadow-[0_0_50px_rgba(0,255,255,0.3),0_0_50px_rgba(255,0,255,0.3)]",
                className
            )}
        >
            <div className="relative rounded-2xl bg-[var(--obsidian-light)] p-6 backdrop-blur-xl">
                {children}
            </div>
        </div>
    );
}
