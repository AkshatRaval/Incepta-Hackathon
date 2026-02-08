"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface GlitchTextProps {
    children: string;
    className?: string;
    intensity?: "low" | "medium" | "high";
}

export function GlitchText({
    children,
    className,
    intensity = "medium",
}: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const intensityClasses = {
        low: "before:animate-[glitch_3s_infinite_linear_alternate-reverse] after:animate-[glitch-2_3s_infinite_linear_alternate-reverse]",
        medium: "before:animate-[glitch_2s_infinite_linear_alternate-reverse] after:animate-[glitch-2_2s_infinite_linear_alternate-reverse]",
        high: "before:animate-[glitch_1s_infinite_linear_alternate-reverse] after:animate-[glitch-2_1s_infinite_linear_alternate-reverse]",
    };

    return (
        <span
            className={cn(
                "relative inline-block",
                "before:content-[attr(data-text)] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:text-[var(--neon-cyan)] before:-z-10",
                "after:content-[attr(data-text)] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:text-[var(--neon-pink)] after:-z-10",
                intensityClasses[intensity],
                isGlitching && "animate-pulse",
                className
            )}
            data-text={children}
        >
            {children}
        </span>
    );
}
