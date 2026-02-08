"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { NeuralBackground } from "@/components/effects/neural-background";
import { Mail, Phone, ArrowRight, Loader2, Github, Eye, EyeOff, ArrowLeft, Check } from "lucide-react";

type AuthMode = "login" | "register";
type AuthMethod = "email" | "phone";
type Step = "credentials" | "otp";

export default function LoginPage() {
    const router = useRouter();
    const { user, signInWithGoogle, signInWithGithub } = useAuth();

    const [mode, setMode] = useState<AuthMode>("login");
    const [method, setMethod] = useState<AuthMethod>("email");
    const [step, setStep] = useState<Step>("credentials");

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (user) {
        router.push("/profile");
        return null;
    }

    const validateCredentials = () => {
        if (method === "email") {
            if (!email || !password) {
                setError("Please fill in all fields");
                return false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError("Please enter a valid email");
                return false;
            }
        } else {
            if (!phone || !password) {
                setError("Please fill in all fields");
                return false;
            }
            if (phone.length !== 10) {
                setError("Please enter a valid 10-digit phone number");
                return false;
            }
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        if (mode === "register" && password !== confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSubmitCredentials = async () => {
        setError("");
        if (!validateCredentials()) return;

        setLoading(true);

        try {
            const identifier = method === "email" ? email : `${phone}@phone.incepta.dev`;

            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: identifier, type: mode }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to send OTP");

            setStep("otp");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const identifier = method === "email" ? email : `${phone}@phone.incepta.dev`;

            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: identifier,
                    otp,
                    password,
                    mode,
                    phone: method === "phone" ? phone : undefined,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to verify OTP");

            if (auth && data.customToken) {
                await signInWithCustomToken(auth, data.customToken);
                router.push("/profile");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to verify OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: "google" | "github") => {
        setLoading(true);
        setError("");

        try {
            if (provider === "google") {
                await signInWithGoogle();
            } else {
                await signInWithGithub();
            }
            router.push("/profile");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NeuralBackground />
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[420px]"
                >
                    <div className="card-static p-8 sm:p-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--gradient)] flex items-center justify-center mx-auto mb-5">
                                <span className="text-3xl font-bold text-white">I</span>
                            </div>
                            <h1 className="text-2xl font-bold mb-2">
                                {step === "otp" ? "Verify Your Account" : mode === "login" ? "Welcome Back" : "Create Account"}
                            </h1>
                            <p className="text-[var(--text-muted)] text-sm">
                                {step === "otp"
                                    ? `Enter the 6-digit code sent to your ${method === "email" ? "email" : "phone"}`
                                    : mode === "login"
                                        ? "Sign in to continue to INCEPTA"
                                        : "Join the hackathon of 2026"
                                }
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {step === "credentials" ? (
                            <>
                                {/* Method Toggle */}
                                <div className="flex gap-1 p-1 rounded-xl bg-[var(--bg-elevated)] mb-6">
                                    <button
                                        onClick={() => setMethod("email")}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${method === "email"
                                                ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm"
                                                : "text-[var(--text-muted)]"
                                            }`}
                                    >
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </button>
                                    <button
                                        onClick={() => setMethod("phone")}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${method === "phone"
                                                ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm"
                                                : "text-[var(--text-muted)]"
                                            }`}
                                    >
                                        <Phone className="w-4 h-4" />
                                        Phone
                                    </button>
                                </div>

                                {/* Form */}
                                <div className="space-y-5">
                                    {method === "email" ? (
                                        <div className="input-group">
                                            <label className="input-label">Email Address</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="input"
                                            />
                                        </div>
                                    ) : (
                                        <div className="input-group">
                                            <label className="input-label">Phone Number</label>
                                            <div className="flex gap-2">
                                                <div className="px-4 flex items-center rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] text-sm font-medium">
                                                    +91
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                    placeholder="9876543210"
                                                    className="input flex-1"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="input-group">
                                        <label className="input-label">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="input pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {mode === "register" && (
                                        <div className="input-group">
                                            <label className="input-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="input"
                                            />
                                        </div>
                                    )}

                                    <button
                                        onClick={handleSubmitCredentials}
                                        disabled={loading}
                                        className="btn btn-primary w-full"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                {mode === "login" ? "Continue" : "Create Account"}
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="divider-text">
                                    <span>or continue with</span>
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleSocialLogin("google")}
                                        disabled={loading}
                                        className="btn btn-secondary"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Google
                                    </button>
                                    <button
                                        onClick={() => handleSocialLogin("github")}
                                        disabled={loading}
                                        className="btn btn-secondary"
                                    >
                                        <Github className="w-5 h-5" />
                                        GitHub
                                    </button>
                                </div>

                                {/* Toggle Mode */}
                                <p className="text-center text-sm text-[var(--text-muted)] mt-8">
                                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                                    <button
                                        onClick={() => setMode(mode === "login" ? "register" : "login")}
                                        className="text-[var(--accent)] font-medium hover:underline"
                                    >
                                        {mode === "login" ? "Sign up" : "Sign in"}
                                    </button>
                                </p>
                            </>
                        ) : (
                            /* OTP Step */
                            <div className="space-y-6">
                                <div className="input-group">
                                    <label className="input-label">Verification Code</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        placeholder="123456"
                                        className="input text-center text-2xl tracking-[0.4em] font-mono"
                                        maxLength={6}
                                    />
                                    <p className="text-[var(--text-muted)] text-xs text-center mt-2">
                                        Didn&apos;t receive code?{" "}
                                        <button onClick={handleSubmitCredentials} className="text-[var(--accent)] hover:underline">
                                            Resend
                                        </button>
                                    </p>
                                </div>

                                <button
                                    onClick={handleVerifyOTP}
                                    disabled={loading || otp.length !== 6}
                                    className="btn btn-primary w-full"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Verify & Continue
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => { setStep("credentials"); setOtp(""); }}
                                    className="w-full text-center text-[var(--text-muted)] text-sm hover:text-[var(--text-primary)] flex items-center justify-center gap-2 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="text-center text-[var(--text-muted)] text-xs mt-6">
                        By continuing, you agree to our{" "}
                        <Link href="/terms" className="text-[var(--text-secondary)] hover:underline">Terms</Link> and{" "}
                        <Link href="/privacy" className="text-[var(--text-secondary)] hover:underline">Privacy Policy</Link>
                    </p>
                </motion.div>
            </div>
        </>
    );
}
