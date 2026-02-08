"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
}

export function ScrollReveal({
    children,
    className,
    direction = "up",
    delay = 0,
    duration = 0.5,
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const directions = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { y: 0, x: 50 },
        right: { y: 0, x: -50 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...directions[direction],
            }}
            animate={
                isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        x: 0,
                    }
                    : {
                        opacity: 0,
                        ...directions[direction],
                    }
            }
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
