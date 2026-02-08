import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] text-black hover:opacity-90 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]",
                neon:
                    "border-2 border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-transparent hover:bg-[var(--neon-cyan)] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]",
                neonPink:
                    "border-2 border-[var(--neon-pink)] text-[var(--neon-pink)] bg-transparent hover:bg-[var(--neon-pink)] hover:text-black hover:shadow-[0_0_30px_rgba(255,0,255,0.5)]",
                neonGreen:
                    "border-2 border-[var(--neon-green)] text-[var(--neon-green)] bg-transparent hover:bg-[var(--neon-green)] hover:text-black hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]",
                ghost:
                    "text-white/70 hover:text-white hover:bg-white/10",
                glass:
                    "glass text-white hover:bg-white/10",
                outline:
                    "border border-white/20 text-white hover:bg-white/10",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-md px-4 text-xs",
                lg: "h-12 rounded-lg px-8 text-base",
                xl: "h-14 rounded-xl px-10 text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
