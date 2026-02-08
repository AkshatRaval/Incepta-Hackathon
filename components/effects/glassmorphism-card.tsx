"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface GlassmorphismCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glow?: "cyan" | "pink" | "green" | "none";
}

export function GlassmorphismCard({
    children,
    className,
    hover = true,
    glow = "none",
}: GlassmorphismCardProps) {
    const glowClasses = {
        cyan: "hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]",
        pink: "hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]",
        green: "hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]",
        none: "",
    };

    return (
        <div
            className={cn(
                "relative rounded-2xl p-6",
                "bg-white/5 backdrop-blur-xl",
                "border border-white/10",
                "transition-all duration-300",
                hover && "hover:bg-white/10 hover:border-white/20",
                glowClasses[glow],
                className
            )}
        >
            {children}
        </div>
    );
}
