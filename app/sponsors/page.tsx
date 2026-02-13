"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Building2, Users, ArrowRight, Mail, Loader2, Heart } from "lucide-react";
import { NeuralBackground } from "@/components/effects/neural-background";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Sponsor {
    id: string;
    name: string;
    tagline?: string;
    tier: 'title' | 'gold' | 'community' | 'silver' | 'partner';
    logo?: string;
    website?: string;
}

export default function SponsorsPage() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSponsors = async () => {
            if (!db) {
                setLoading(false);
                return;
            }
            try {
                const querySnapshot = await getDocs(collection(db, "sponsors"));
                const fetchedSponsors: Sponsor[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedSponsors.push({ id: doc.id, ...doc.data() } as Sponsor);
                });
                setSponsors(fetchedSponsors);
            } catch (error) {
                console.error("Error fetching sponsors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSponsors();
    }, []);

    const titleSponsors = sponsors.filter(s => s.tier === 'title');
    const goldSponsors = sponsors.filter(s => s.tier === 'gold');
    const communityPartners = sponsors.filter(s => s.tier === 'community' || s.tier === 'partner');

    // Group others if needed, or just handle these main tiers

    if (loading) {
        return (
            <>
                <NeuralBackground />
                <div className="min-h-screen flex items-center justify-center relative z-10">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                        <p className="text-slate-400 font-mono">Loading Partners...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <NeuralBackground />
            <main className="relative z-10 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-16">
                            <div className="badge badge-amber mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                <Trophy className="w-4 h-4" />
                                <span>Our Partners</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black mb-6 text-white">
                                {sponsors.length > 0 ? (
                                    <>Powered by <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Industry Leaders</span></>
                                ) : (
                                    <>Become a <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Partner</span></>
                                )}
                            </h1>
                            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                                {sponsors.length > 0
                                    ? "INCEPTA 2026 is made possible by our incredible sponsors and community partners."
                                    : "Join us in empowering the next generation of engineers. Help us build the future of tech."
                                }
                            </p>
                        </div>

                        {/* EMPTY STATE - SHOW "SPONSOR US" HERO */}
                        {sponsors.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-16 text-center">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

                                    <div className="inline-flex p-4 rounded-full bg-emerald-500/10 mb-8 ring-1 ring-emerald-500/30">
                                        <Heart className="w-8 h-8 text-emerald-400 fill-emerald-500/20" />
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">We are looking for Sponsors!</h2>
                                    <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                                        Support **INCEPTA 2026** and get your brand in front of 200+ top-tier developers and innovators.
                                        We have tailored packages for hiring, branding, and community engagement.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <Link
                                            href="mailto:sponsors@incepta.dev"
                                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black text-lg rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
                                        >
                                            <Mail className="w-5 h-5" />
                                            Contact Us
                                        </Link>
                                    </div>

                                    <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                                        {[
                                            { label: "Reach", value: "1000+" },
                                            { label: "Hackers", value: "200+" },
                                            { label: "Projects", value: "50+" },
                                            { label: "Media", value: "Partnered" },
                                        ].map((stat, i) => (
                                            <div key={i}>
                                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}


                        {/* DYNAMIC CONTENT IF SPONSORS EXIST */}

                        {/* Title Sponsor */}
                        {titleSponsors.length > 0 && (
                            <div className="mb-16">
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <Star className="w-6 h-6 text-amber-500" />
                                    <span className="text-lg font-bold uppercase tracking-wider text-amber-500">Title Sponsor</span>
                                    <Star className="w-6 h-6 text-amber-500" />
                                </div>
                                {titleSponsors.map(sponsor => (
                                    <motion.div
                                        key={sponsor.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="relative group max-w-3xl mx-auto"
                                    >
                                        <div className="absolute -inset-1 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
                                        <div className="relative rounded-3xl p-6 md:p-12 text-center transition-all bg-slate-900/90 backdrop-blur-xl border border-amber-500/30">
                                            <div className="w-32 h-32 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/20 shadow-[0_0_40px_rgba(251,191,36,0.2)]">
                                                {sponsor.logo ? (
                                                    <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full p-4" />
                                                ) : (
                                                    <Building2 className="w-12 h-12 text-amber-400" />
                                                )}
                                            </div>
                                            <h2 className="text-3xl font-black mb-2 text-white">{sponsor.name}</h2>
                                            <span className="text-amber-400 text-sm uppercase tracking-widest">{sponsor.tagline || "Title Partner"}</span>
                                            {sponsor.website && (
                                                <div className="mt-6">
                                                    <Link href={sponsor.website} className="text-sm text-slate-400 hover:text-white transition-colors underline decoration-slate-600 hover:decoration-white">Visit Website</Link>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Gold Partners */}
                        {goldSponsors.length > 0 && (
                            <div className="mb-16">
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <Building2 className="w-5 h-5 text-cyan-400" />
                                    <span className="text-sm font-bold uppercase tracking-wider text-cyan-400">Gold Partners</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {goldSponsors.map((sponsor, i) => (
                                        <motion.div
                                            key={sponsor.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ y: -4 }}
                                        >
                                            <div className="rounded-2xl p-8 text-center h-full transition-all bg-white/5 border border-white/10 hover:border-cyan-500/30 backdrop-blur-md">
                                                <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-cyan-500/10 border border-cyan-500/20">
                                                    {sponsor.logo ? (
                                                        <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full p-2" />
                                                    ) : (
                                                        <Building2 className="w-8 h-8 text-cyan-400" />
                                                    )}
                                                </div>
                                                <h3 className="font-bold mb-1 text-white">{sponsor.name}</h3>
                                                <span className="text-sm text-slate-400">{sponsor.tagline || "Gold Partner"}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Community Partners */}
                        {communityPartners.length > 0 && (
                            <div className="mb-16">
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <Users className="w-5 h-5 text-emerald-400" />
                                    <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">Community Partners</span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {communityPartners.map((partner, i) => (
                                        <motion.div
                                            key={partner.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-4 px-6 py-4 rounded-xl transition-all bg-white/5 border border-white/10 hover:border-emerald-500/30 backdrop-blur-md"
                                        >
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-500/10 border border-emerald-500/20">
                                                {partner.logo ? (
                                                    <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full p-1" />
                                                ) : (
                                                    <Users className="w-5 h-5 text-emerald-400" />
                                                )}
                                            </div>
                                            <span className="font-medium text-white">{partner.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Floating CTA if valid sponsors exist (so we still encourage more) */}
                        {sponsors.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center rounded-3xl p-6 md:p-12 bg-white/5 border border-white/10 backdrop-blur-md mt-20"
                            >
                                <h2 className="text-3xl font-black mb-4 text-white">Become a Sponsor</h2>
                                <p className="mb-8 max-w-xl mx-auto text-slate-400">
                                    Partner with INCEPTA 2026 and connect with 200+ talented engineers building the future.
                                </p>
                                <Link
                                    href="mailto:sponsors@incepta.dev"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:scale-105"
                                >
                                    <Mail className="w-5 h-5" />
                                    Contact Us
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        )}

                    </motion.div>
                </div>
            </main>
        </>
    );
}
