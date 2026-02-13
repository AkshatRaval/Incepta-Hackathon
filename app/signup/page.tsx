"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { NeuralBackground } from "@/components/effects/neural-background";
import { ArrowRight, Loader2, Eye, EyeOff, Sparkles, Zap, Check } from "lucide-react";

const benefits = [
    "9 days of intense building",
    "Real-time mentorship",
    "Industry workshops",
    "₹1500 swag (Top 3)",
];

export default function SignupPage() {
    const router = useRouter();
    const { user, signInWithGoogle, signUpWithEmail } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            router.push("/profile");
        }
    }, [user, router]);

    if (user) return null;

    const validateForm = () => {
        if (!name.trim()) {
            setError("Please enter your name");
            return false;
        }

        if (!email) {
            setError("Please enter your email");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email");
            return false;
        }

        if (!password) {
            setError("Please enter a password");
            return false;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        return true;
    };

    const handleSignup = async () => {
        setError("");
        if (!validateForm()) return;

        setLoading(true);

        try {
            await signUpWithEmail(email, password, name);
            router.push("/apply");
        } catch (err: unknown) {
            if (err instanceof Error) {
                // Firebase error handling
                if (err.message.includes("email-already-in-use")) {
                    setError("An account with this email already exists");
                } else if (err.message.includes("weak-password")) {
                    setError("Password is too weak");
                } else {
                    setError(err.message);
                }
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            await signInWithGoogle();
            router.push("/apply");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to sign up with Google");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NeuralBackground />
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-slate-400 hover:text-white backdrop-blur-md"
            >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Home
            </Link>
            <div className="relative z-10 min-h-screen flex">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
                    <div className="max-w-md">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ background: "var(--gradient-primary)" }}
                                >
                                    <Zap className="w-6 h-6 text-black" />
                                </div>
                                <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>INCEPTA</span>
                            </div>

                            <h1 className="text-5xl font-black leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
                                Join the<br />
                                <span className="gradient-text">Engineering</span><br />
                                Gauntlet.
                            </h1>

                            <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
                                Register now and prove yourself among 200+ talented engineers.
                            </p>

                            {/* Benefits */}
                            <div className="space-y-3">
                                {benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ background: "rgba(52, 211, 153, 0.15)", border: "1px solid rgba(52, 211, 153, 0.3)" }}
                                        >
                                            <Check className="w-3 h-3" style={{ color: "var(--accent)" }} />
                                        </div>
                                        <span style={{ color: "var(--text-secondary)" }}>{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Price Tag */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-10 inline-flex items-center gap-4 px-6 py-4 rounded-2xl"
                                style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
                            >
                                <div className="text-3xl font-black" style={{ color: "var(--accent)" }}>₹60</div>
                                <div>
                                    <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Entry Fee Only</div>
                                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>March 5–14, 2026</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md"
                    >
                        <div
                            className="rounded-3xl p-8 lg:p-10"
                            style={{
                                background: "var(--bg-card)",
                                backdropFilter: "blur(8px)",
                                WebkitBackdropFilter: "blur(8px)",
                                border: "1px solid var(--border-default)",
                            }}
                        >
                            {/* Mobile Logo */}
                            <div className="lg:hidden text-center mb-8">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                                    style={{ background: "var(--gradient-primary)" }}
                                >
                                    <Sparkles className="w-7 h-7 text-black" />
                                </div>
                                <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>INCEPTA 2026</h1>
                            </div>

                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                                    Create Account
                                </h2>
                                <p style={{ color: "var(--text-muted)" }} className="text-sm">
                                    Sign up to register for INCEPTA 2026
                                </p>
                            </div>

                            {/* Error */}
                            {error && (
                                <div
                                    className="mb-6 p-4 rounded-xl text-sm"
                                    style={{
                                        background: "rgba(244, 63, 94, 0.1)",
                                        border: "1px solid rgba(244, 63, 94, 0.3)",
                                        color: "var(--rose)"
                                    }}
                                >
                                    {error}
                                </div>
                            )}

                            {/* Google Login */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-medium flex items-center justify-center gap-3 transition-all hover:scale-[1.02] mb-6"
                                style={{
                                    background: "var(--bg-elevated)",
                                    border: "1px solid var(--border-default)",
                                    color: "var(--text-primary)",
                                }}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-1 h-px" style={{ background: "var(--border-default)" }} />
                                <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>or with email</span>
                                <div className="flex-1 h-px" style={{ background: "var(--border-default)" }} />
                            </div>

                            {/* Form */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Display Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                                        style={{
                                            background: "var(--bg-elevated)",
                                            border: "1px solid var(--border-default)",
                                            color: "var(--text-primary)",
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                                        style={{
                                            background: "var(--bg-elevated)",
                                            border: "1px solid var(--border-default)",
                                            color: "var(--text-primary)",
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Min 6 characters"
                                            className="w-full px-4 py-3 pr-12 rounded-xl outline-none transition-all"
                                            style={{
                                                background: "var(--bg-elevated)",
                                                border: "1px solid var(--border-default)",
                                                color: "var(--text-primary)",
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSignup}
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] mt-6"
                                style={{
                                    background: "var(--gradient-primary)",
                                    color: "#000",
                                    opacity: loading ? 0.7 : 1,
                                }}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                            </button>

                            {/* Sign In Link */}
                            <p className="text-center mt-6 text-sm" style={{ color: "var(--text-muted)" }}>
                                Already have an account?{" "}
                                <Link href="/login" className="font-semibold transition-colors" style={{ color: "var(--accent)" }}>
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}