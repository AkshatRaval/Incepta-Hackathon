"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
    event: [
        { label: "About", href: "/about" },
        { label: "Timeline", href: "/timeline" },
        { label: "Sponsors", href: "/sponsors" },
        { label: "FAQ", href: "/faq" },
    ],
    participate: [
        { label: "Apply Now", href: "/apply" },
        { label: "Register Team", href: "/apply" },
        { label: "Mentor Signup", href: "/apply" },
        { label: "Volunteer", href: "/apply" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Code of Conduct", href: "/conduct" },
        { label: "Contact Us", href: "/contact" },
    ],
};

const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/incepta2026", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/incepta", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/incepta2026", label: "Instagram" },
    { icon: Mail, href: "mailto:hello@incepta.dev", label: "Email" },
];

export function Footer() {
    return (
        <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                            >
                                INCEPTA 2026
                            </motion.div>
                        </Link>
                        <p className="text-slate-400 text-sm mb-6 max-w-sm leading-relaxed">
                            India&apos;s most ambitious hackathon. 48 hours of innovation, $50K in prizes, and 500+ brilliant minds building the future.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm text-slate-400">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-cyan-400" />
                                <span>Mumbai, Bangalore, Delhi</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-cyan-400" />
                                <a href="mailto:hello@incepta.dev" className="hover:text-cyan-400 transition-colors">
                                    hello@incepta.dev
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-cyan-400" />
                                <span>+91 98765 43210</span>
                            </div>
                        </div>
                    </div>

                    {/* Event Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Event</h3>
                        <ul className="space-y-3">
                            {footerLinks.event.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 text-sm hover:text-cyan-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Participate Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Participate</h3>
                        <ul className="space-y-3">
                            {footerLinks.participate.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 text-sm hover:text-cyan-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 text-sm hover:text-cyan-400 transition-colors inline-block hover:translate-x-1 transform duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Links & Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-cyan-500/20 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Copyright */}
                        <div className="text-center md:text-right">
                            <p className="text-slate-500 text-sm">
                                © {new Date().getFullYear()} INCEPTA. All rights reserved.
                            </p>
                            <p className="text-slate-600 text-xs mt-1">
                                Made with <span className="text-cyan-400">❤</span> for innovators
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}