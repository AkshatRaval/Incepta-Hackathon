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
        // More particles for richer effect
        const particleCount = Math.min(120, Math.floor((width * height) / 12000));
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.2, // Faster movement
            vy: (Math.random() - 0.5) * 1.2, // Faster movement
            radius: Math.random() * 0.8 + 0.5, // Smaller nodes
            hue: 160 + Math.random() * 40, // Cyan to emerald range
        }));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas.width, canvas.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        const animate = () => {
            if (!canvas || !ctx) return;

            // Fade effect for trails
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Draw connections first
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.5;
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
                // Mouse interaction
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200 && dist > 0) {
                    const force = (200 - dist) / 200;
                    p.vx += (dx / dist) * force * 0.05;
                    p.vy += (dy / dist) * force * 0.05;
                }

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Damping (less damping = more movement)
                p.vx *= 0.995;
                p.vy *= 0.995;

                // Wrap edges
                if (p.x < -50) p.x = canvas.width + 50;
                if (p.x > canvas.width + 50) p.x = -50;
                if (p.y < -50) p.y = canvas.height + 50;
                if (p.y > canvas.height + 50) p.y = -50;

                // Draw glow
                const glowSize = p.radius * 6;
                const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
                glow.addColorStop(0, `hsla(${p.hue}, 80%, 60%, 0.9)`);
                glow.addColorStop(0.5, `hsla(${p.hue}, 70%, 50%, 0.5)`);
                glow.addColorStop(1, `hsla(${p.hue}, 60%, 40%, 0)`);

                ctx.beginPath();
                ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();

                // Draw core
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, 1)`;
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
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
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
