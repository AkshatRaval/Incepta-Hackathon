"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { User, LogOut, Rocket, Menu, X, Home, Info, Calendar, Trophy, HelpCircle } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/timeline", label: "Timeline", icon: Calendar },
    { href: "/sponsors", label: "Sponsors", icon: Trophy },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
];

export function Navbar() {
    const pathname = usePathname();
    const { user, loading, signOut } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Hide Navbar on Login and Signup pages to prevent overlap
    if (pathname === "/login" || pathname === "/signup" || pathname === "/apply") {
        return null;
    }

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-start p-4 md:p-6 pointer-events-none">
                <motion.nav
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`
                        flex items-center justify-between pointer-events-auto
                        w-full max-w-7xl h-16 px-4 md:px-6 rounded-2xl transition-all duration-500
                        ${scrolled
                            ? "bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
                            : "bg-black/40 backdrop-blur-md border border-white/5"
                        }
                    `}
                >
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                            <span className="text-white font-black text-base md:text-lg">I</span>
                        </div>
                        <span className="text-white font-bold tracking-widest text-xs md:text-sm uppercase">
                            Incepta
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;
                            return (
                                <Link key={link.href} href={link.href} className="relative group">
                                    <div className="flex items-center gap-2 relative z-10 px-4 py-2 transition-colors">
                                        <Icon size={16} className={isActive ? "text-cyan-400" : "text-white/40 group-hover:text-white/80"} />
                                        <span className={`text-xs font-semibold tracking-wide uppercase ${isActive ? "text-white" : "text-white/40 group-hover:text-white/80"}`}>
                                            {link.label}
                                        </span>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                        {!loading && (
                            <div className="hidden sm:flex items-center gap-3">
                                {user ? (
                                    <>
                                        <Link href="/profile" className="text-xs font-bold text-white/60 hover:text-cyan-400 uppercase tracking-wider transition-colors">
                                            Profile
                                        </Link>
                                        <button onClick={() => signOut()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/30 transition-all text-xs font-bold uppercase tracking-wider">
                                            <LogOut size={14} />
                                            <span className="hidden md:inline">Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors">
                                            Login
                                        </Link>
                                        <Link href="/apply" className="group relative px-4 md:px-6 py-2 md:py-2.5 overflow-hidden rounded-xl bg-cyan-400 hover:bg-cyan-300 transition-all">
                                            <div className="flex items-center gap-2 relative z-10 text-black font-black text-xs uppercase tracking-widest">
                                                <Rocket size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                Apply
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </motion.nav>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-slate-950 via-slate-900 to-black border-l border-white/10 shadow-2xl"
                        >
                            <div className="flex flex-col h-full p-6 pt-24">
                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-2 mb-8">
                                    {navLinks.map((link, i) => {
                                        const isActive = pathname === link.href;
                                        const Icon = link.icon;
                                        return (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isActive
                                                        ? "bg-cyan-500/10 border border-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                                        }`}
                                                >
                                                    <Icon size={20} className={isActive ? "text-cyan-400" : ""} />
                                                    <span className="font-semibold">{link.label}</span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </nav>

                                {/* Auth Actions */}
                                {!loading && (
                                    <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-white/10">
                                        {user ? (
                                            <>
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                                                >
                                                    <User size={20} />
                                                    <span className="font-semibold">Profile</span>
                                                </Link>
                                                <button
                                                    onClick={() => signOut()}
                                                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                                                >
                                                    <LogOut size={20} />
                                                    <span className="font-semibold">Logout</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/login"
                                                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-semibold"
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    href="/apply"
                                                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-cyan-400 text-black hover:bg-cyan-300 transition-all font-bold"
                                                >
                                                    <Rocket size={20} />
                                                    Apply Now
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}