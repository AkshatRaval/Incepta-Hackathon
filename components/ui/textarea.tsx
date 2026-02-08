import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[120px] w-full rounded-lg border border-white/20 bg-[var(--obsidian-light)] px-4 py-3 text-sm text-white placeholder:text-[var(--text-muted)] transition-all duration-300 resize-none",
                    "focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-2 focus:ring-[var(--neon-cyan)]/20 focus:shadow-[0_0_20px_rgba(0,255,255,0.2)]",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
