"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const mousePos = useRef({ x: -100, y: -100 });
    const points = useRef<{ x: number; y: number; age: number }[]>([]);

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsVisible(false);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            // Add trail point
            points.current.push({ x: e.clientX, y: e.clientY, age: 0 });
            if (points.current.length > 50) points.current.shift();
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw trail
            const pts = points.current;
            if (pts.length > 2) {
                ctx.beginPath();
                ctx.moveTo(pts[0].x, pts[0].y);

                for (let i = 1; i < pts.length - 1; i++) {
                    const xc = (pts[i].x + pts[i + 1].x) / 2;
                    const yc = (pts[i].y + pts[i + 1].y) / 2;
                    ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
                }

                // Gradient stroke
                const gradient = ctx.createLinearGradient(
                    pts[0].x, pts[0].y,
                    pts[pts.length - 1].x, pts[pts.length - 1].y
                );
                gradient.addColorStop(0, "rgba(34, 197, 94, 0)");
                gradient.addColorStop(0.5, "rgba(34, 197, 94, 0.5)");
                gradient.addColorStop(1, "rgba(6, 182, 212, 0.8)");

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();
            }

            // Age and remove old points
            for (let i = pts.length - 1; i >= 0; i--) {
                pts[i].age++;
                if (pts[i].age > 15) pts.splice(i, 1);
            }

            // Draw cursor dot with glow
            const { x, y } = mousePos.current;

            // Outer glow
            const glow = ctx.createRadialGradient(x, y, 0, x, y, 30);
            glow.addColorStop(0, "rgba(6, 182, 212, 0.4)");
            glow.addColorStop(1, "rgba(6, 182, 212, 0)");
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();

            // Inner dot
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#06b6d4";
            ctx.fill();

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[9999] pointer-events-none hidden lg:block"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
