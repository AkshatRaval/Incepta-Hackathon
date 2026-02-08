"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Clock, Zap, Shield, Globe, Brain, Code, Cpu, Sparkles, Star } from "lucide-react";
import { NeuralBackground } from "@/components/effects/neural-background";

export default function Home() {
  return (
    <>
      {/* Neural Background - Fixed Behind Everything */}
      <NeuralBackground />

      {/* Main Content */}
      <div className="relative min-h-screen">
        {/* Main Content - Flex Column Layout */}
        <div className="flex flex-col gap-y-20 relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-6 pt-32">
            <div className="max-w-6xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 mb-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-emerald-400">March 15-17, 2026</span>
                  <span className="text-white/20">•</span>
                  <span className="text-sm text-slate-400">Registration Open</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-8"
                >
                  <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">INCEPTA</span>
                  <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                    2026
                  </span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                  48 hours. 500+ hackers. <span className="text-white font-medium">$50,000</span> in prizes.
                  <br />
                  <span className="text-slate-400">India&apos;s most ambitious hackathon.</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                  <Link
                    href="/apply"
                    className="group relative px-8 py-4 text-lg font-bold text-black bg-[#00f7ff] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,247,255,0.6)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Apply Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-4 text-lg font-medium text-white bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-2xl hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                  >
                    Learn More
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-center gap-12 md:gap-20"
                >
                  {[
                    { value: "500+", label: "HACKERS" },
                    { value: "$50K", label: "PRIZES" },
                    { value: "48H", label: "NON-STOP" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="text-center group"
                    >
                      <div className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                        {stat.value}
                      </div>
                      <div className="text-[10px] md:text-xs text-slate-400 tracking-[0.2em] font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Features Section - Glass Container */}
          <section className="relative px-6 py-24">
            <div className="max-w-6xl mx-auto">
              <div className="relative bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)] p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 mb-6">
                    <Star className="w-3.5 h-3.5 text-yellow-500" />
                    WHY INCEPTA
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Everything to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Win</span>
                  </h2>
                  <p className="text-lg text-slate-300 max-w-xl mx-auto">
                    World-class resources, elite mentorship, and premium infrastructure.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Users, title: "Elite Mentors", desc: "50+ engineers from Google, Microsoft, and Meta available 24/7." },
                    { icon: Trophy, title: "$50K+ Prizes", desc: "Grand prize of $15K plus track-specific awards and sponsor prizes." },
                    { icon: Clock, title: "48 Hours", desc: "Two intense days of focused building, learning, and networking." },
                    { icon: Zap, title: "Cloud Credits", desc: "$500+ in AWS, GCP, and Azure credits for your project." },
                    { icon: Shield, title: "Premium APIs", desc: "Free access to OpenAI, Stripe, Twilio, and 20+ more." },
                    { icon: Globe, title: "Hybrid Event", desc: "Join online or at hubs in Mumbai, Bangalore, and Delhi." },
                  ].map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group p-6 rounded-2xl bg-black border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tracks Section - Glass Container */}
          <section className="relative px-6 py-24">
            <div className="max-w-6xl mx-auto">
              <div className="relative bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)] p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 mb-6">
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                    TRACKS
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Pick Your <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Battle</span>
                  </h2>
                  <p className="text-lg text-slate-300">Six tracks. Six winners. $30,000 total.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { icon: Brain, title: "AI & ML", prize: "$5,000" },
                    { icon: Globe, title: "Web3", prize: "$5,000" },
                    { icon: Shield, title: "Security", prize: "$5,000" },
                    { icon: Cpu, title: "Dev Tools", prize: "$5,000" },
                    { icon: Users, title: "Social Impact", prize: "$5,000" },
                    { icon: Sparkles, title: "Open Innovation", prize: "$5,000" },
                  ].map((track, i) => (
                    <motion.div
                      key={track.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex items-center justify-between p-6 rounded-2xl bg-black border border-cyan-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                          <track.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-white">{track.title}</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        {track.prize}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA - Glass Container */}
          <section className="relative px-6 py-24 pb-32">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-slate-950/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_0_20px_rgba(0,255,255,0.1)] p-16 md:p-24 text-center overflow-hidden">
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 rounded-3xl" />

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Ready to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Build</span>?
                  </h2>
                  <p className="text-lg text-slate-300 mb-10 max-w-lg mx-auto">
                    Registration closes March 1st. Join 500+ innovators building the future.
                  </p>
                  <Link
                    href="/apply"
                    className="group inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-black bg-[#00f7ff] rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(0,247,255,0.6)] transition-all duration-300"
                  >
                    Apply Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}