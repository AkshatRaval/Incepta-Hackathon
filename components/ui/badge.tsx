import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300",
    {
        variants: {
            variant: {
                default: "bg-white/10 text-white border border-white/20",
                cyan: "bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/50 shadow-[0_0_10px_rgba(0,255,255,0.3)]",
                pink: "bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] border border-[var(--neon-pink)]/50 shadow-[0_0_10px_rgba(255,0,255,0.3)]",
                green: "bg-[var(--neon-green)]/20 text-[var(--neon-green)] border border-[var(--neon-green)]/50 shadow-[0_0_10px_rgba(57,255,20,0.3)]",
                pending: "bg-[var(--neon-yellow)]/20 text-[var(--neon-yellow)] border border-[var(--neon-yellow)]/50 shadow-[0_0_10px_rgba(255,229,0,0.3)] animate-pulse",
                success: "bg-[var(--neon-green)]/20 text-[var(--neon-green)] border border-[var(--neon-green)]/50 shadow-[0_0_10px_rgba(57,255,20,0.3)]",
                error: "bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
