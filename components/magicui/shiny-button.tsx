"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
    initial: { "--x": "100%", scale: 0.8 },
    animate: { "--x": "-100%", scale: 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 1,
        type: "spring" as const,
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: "spring",
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
};

interface ShinyButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function ShinyButton({ children, className, onClick }: ShinyButtonProps) {
    return (
        <motion.button
            {...animationProps}
            onClick={onClick}
            className={cn(
                "relative rounded-xl px-8 py-4 font-semibold backdrop-blur-xl transition-shadow duration-300 ease-in-out",
                "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)]",
                "text-black",
                "hover:shadow-[0_0_40px_8px_rgba(0,255,255,0.3)]",
                className
            )}
        >
            <span
                className="relative block h-full w-full text-base tracking-wide"
                style={{
                    maskImage:
                        "linear-gradient(-75deg,var(--neon-cyan) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--neon-cyan) calc(var(--x) + 100%))",
                }}
            >
                {children}
            </span>
            <span
                style={{
                    mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
                    maskComposite: "exclude",
                }}
                className="absolute inset-0 z-10 block rounded-xl bg-[linear-gradient(-75deg,rgba(255,255,255,0.2)_calc(var(--x)+20%),rgba(255,255,255,0.5)_calc(var(--x)+25%),rgba(255,255,255,0.2)_calc(var(--x)+100%))] p-px"
            />
        </motion.button>
    );
}
