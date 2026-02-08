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

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-start p-6 pointer-events-none">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`
                    flex items-center justify-between pointer-events-auto
                    w-full max-w-7xl h-16 px-6 rounded-2xl transition-all duration-500
                    ${scrolled 
                        ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl scale-[0.98]" 
                        : "bg-transparent"
                    }
                `}
            >
                {/* 1. Brand Group */}
                <Link href="/" className="flex items-center gap-3 group shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                        <span className="text-white font-black text-lg">I</span>
                    </div>
                    <span className="text-white font-bold tracking-widest text-sm uppercase hidden md:block">
                        Incepta
                    </span>
                </Link>

                {/* 2. Navigation Group (Centered & Spacious) */}
                <div className="hidden lg:flex items-center gap-5 rounded-full p-1 ">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link key={link.href} href={link.href} className="relative group p-4">
                                <div className="flex items-center gap-2.5 relative z-10 transition-colors p-4">
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

                {/* 3. Actions Group */}
                <div className="flex items-center gap-4 shrink-0">
                    {!loading && (
                        <div className="hidden sm:flex items-center gap-4">
                            {user ? (
                                <button onClick={() => signOut()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all text-xs font-bold uppercase tracking-tighter">
                                    <LogOut size={14} /> Log Out
                                </button>
                            ) : (
                                <>
                                    <Link href="/login" className="text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors">
                                        Login
                                    </Link>
                                    <Link href="/apply" className="group relative px-6 py-2.5 overflow-hidden rounded-xl bg-white transition-all hover:bg-cyan-400">
                                        <div className="flex items-center gap-2 relative z-10 text-black font-black text-xs uppercase tracking-widest">
                                            <Rocket size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            Apply
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                    
                    {/* Mobile Toggle */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white/70 hover:text-white transition-colors">
                        <Menu size={24} />
                    </button>
                </div>
            </motion.nav>
        </header>
    );
}