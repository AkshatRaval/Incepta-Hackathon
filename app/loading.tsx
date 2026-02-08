"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-dark)]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6"
            >
                {/* Animated Logo */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-16 h-16 rounded-2xl bg-[var(--gradient)] flex items-center justify-center shadow-[var(--shadow-glow)]"
                >
                    <span className="text-2xl font-bold text-white">I</span>
                </motion.div>

                {/* Progress Bar */}
                <div className="w-48 h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="h-full w-1/2 bg-[var(--gradient)] rounded-full"
                    />
                </div>

                <p className="text-[var(--text-muted)] text-sm">Loading...</p>
            </motion.div>
        </div>
    );
}
