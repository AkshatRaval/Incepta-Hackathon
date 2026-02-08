import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-lg border border-white/20 bg-[var(--obsidian-light)] px-4 py-2 text-sm text-white placeholder:text-[var(--text-muted)] transition-all duration-300",
                    "focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-2 focus:ring-[var(--neon-cyan)]/20 focus:shadow-[0_0_20px_rgba(0,255,255,0.2)]",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
