"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
    value: string;
    className?: string;
    delay?: number;
}

export function NumberTicker({ value, className, delay = 0 }: NumberTickerProps) {
    const [displayValue, setDisplayValue] = useState("0");
    const ref = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Extract numeric part and suffix
    const numericMatch = value.match(/^(\d+)/);
    const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
    const suffix = value.replace(/^\d+/, "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const timeout = setTimeout(() => {
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;
            let current = 0;

            const interval = setInterval(() => {
                current += 1;
                const progress = current / steps;
                const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                const currentValue = Math.floor(easedProgress * numericValue);
                setDisplayValue(currentValue.toString());

                if (current >= steps) {
                    clearInterval(interval);
                    setDisplayValue(numericValue.toString());
                }
            }, stepDuration);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isVisible, numericValue, delay]);

    return (
        <span ref={ref} className={cn("tabular-nums", className)}>
            {displayValue}
            {suffix}
        </span>
    );
}
