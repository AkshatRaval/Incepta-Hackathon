"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    hue: number;
}

export function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>(0);

    const initParticles = useCallback((width: number, height: number) => {
        // Less particles for better performance on smaller screens
        const area = width * height;
        const particleCount = Math.min(80, Math.floor(area / 15000));

        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5, // Slower movement for less chaos
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 0.8 + 0.5,
            hue: 160 + Math.random() * 40,
        }));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let resizeTimeout: NodeJS.Timeout;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas.width, canvas.height);
        };

        const debouncedResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 100);
        };

        resize();
        window.addEventListener("resize", debouncedResize);

        const animate = () => {
            if (!canvas || !ctx) return;

            // Fade effect for trails - optimized with clearRect if alpha not needed, 
            // but keeping fade for aesthetic. Using fillRect with low opacity.
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;

            // Draw connections - O(n^2) optimized by reduced count
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;

                    // Simple bounding box check before sqrt
                    if (Math.abs(dx) > 120 || Math.abs(dy) > 120) continue;

                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        const opacity = (1 - dist / 120) * 0.4; // Lower opacity
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `hsla(${(p1.hue + p2.hue) / 2}, 70%, 60%, ${opacity})`;
                        ctx.stroke();
                    }
                }
            }

            // Update and draw particles
            for (const p of particles) {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges instead of wrapping for smoother visual on small screens
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw glow
                const glowSize = p.radius * 4; // Smaller glow
                // Optimization: Skip gradient for very small particles or low performance? 
                // Keeping it but reducing size.

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, 0.8)`;
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        // Initial fill
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", debouncedResize);
            clearTimeout(resizeTimeout);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0"
            style={{ background: "#000000", zIndex: -10 }}
        />
    );
}
