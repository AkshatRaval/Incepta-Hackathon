"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    hue: number;
}

export function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const mousePositionRef = useRef({ x: 0, y: 0 });

    // Initialize particles
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Create particles when dimensions change
    useEffect(() => {
        if (dimensions.width === 0) return;

        const particleCount = Math.floor((dimensions.width * dimensions.height) / 15000);
        particlesRef.current = Array.from({ length: Math.min(particleCount, 100) }, () => ({
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            hue: Math.random() > 0.5 ? 160 : 45, // Emerald or Gold
        }));
    }, [dimensions]);

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            mousePositionRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connecting lines
            const mousePos = mousePositionRef.current;

            particlesRef.current.forEach((particle, i) => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Mouse interaction - particles are attracted to cursor
                const dx = mousePos.x - particle.x;
                const dy = mousePos.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    particle.x += dx * force * 0.01;
                    particle.y += dy * force * 0.01;
                }

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${particle.hue}, 70%, 50%, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                particlesRef.current.slice(i + 1).forEach((otherParticle) => {
                    const dx2 = particle.x - otherParticle.x;
                    const dy2 = particle.y - otherParticle.y;
                    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (distance2 < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `hsla(160, 70%, 50%, ${(1 - distance2 / 120) * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [dimensions]);

    return (
        <>
            {/* Grid Background */}
            <div className="fixed inset-0 grid-bg pointer-events-none" />

            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0"
                style={{ opacity: 0.6 }}
            />

            {/* Mouse Glow */}
            <motion.div
                className="fixed pointer-events-none z-0"
                style={{
                    x: smoothMouseX,
                    y: smoothMouseY,
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(245, 158, 11, 0.05) 40%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Secondary Glow - delayed */}
            <motion.div
                className="fixed pointer-events-none z-0"
                style={{
                    x: useSpring(mouseX, { stiffness: 30, damping: 25 }),
                    y: useSpring(mouseY, { stiffness: 30, damping: 25 }),
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                }}
            />

            {/* Ambient Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div
                    className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-20"
                    style={{
                        background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
                        animation: "float 20s ease-in-out infinite",
                    }}
                />
                <div
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-15"
                    style={{
                        background: "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
                        animation: "float 25s ease-in-out infinite reverse",
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-10"
                    style={{
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
                        animation: "float 30s ease-in-out infinite",
                    }}
                />
            </div>

            {/* Noise Overlay */}
            <div className="noise-overlay" />
        </>
    );
}
