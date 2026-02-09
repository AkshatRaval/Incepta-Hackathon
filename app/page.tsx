"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Trophy,
  Zap,
  Shield,
  Brain,
  MessageCircle,
  Wifi,
  Target,
  Shuffle,
  Box,
  Code,
  Timer,
  Award,
  Calendar,
  HelpCircle,
  Rocket,
} from "lucide-react";
import { NeuralBackground } from "@/components/effects/neural-background";
import { FloatingTimeline } from "@/components/effects/FloatingTimeline";

export default function Home() {
  return (
    <>
      <NeuralBackground />
      <div className="relative min-h-screen flex flex-col gap-32 pb-32 overflow-hidden selection:bg-emerald-500/30">

        {/* --- Hero Section --- */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center flex flex-col items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium tracking-wide">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  March 5th – 14th, 2026
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-center"
              >
                <div className="text-white drop-shadow-2xl">INCEPTA</div>
                <div className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent pb-4">
                  2026
                </div>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed px-4"
              >
                <span className="text-white font-medium">9 Days.</span> <span className="text-cyan-400 font-medium">3 Rounds.</span> <span className="text-emerald-400 font-bold">1 Champion.</span>
                <br />
                <span className="text-slate-500">The ultimate test of engineering persistence and real-time adaptability.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-6 mb-20 w-full sm:w-auto"
              >
                <Link
                  href="/apply"
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-lg rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] w-full sm:w-auto text-center"
                >
                  Register for ₹60
                </Link>
                <Link
                  href="#roadmap"
                  className="px-8 py-4 text-white font-medium text-lg rounded-xl border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm transition-all hover:bg-cyan-500/10 hover:border-cyan-500/50 w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  View Roadmap <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center gap-8 text-center"
              >
                {[
                  { value: "9", label: "Days" },
                  { value: "100-200", label: "Teams" },
                  { value: "4", label: "Members/Team" },
                  { value: "₹60", label: "Entry Fee" },
                ].map((stat, i) => (
                  <div key={i} className="px-6">
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Why Incepta Section --- */}
        <section className="relative px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
                Why <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">INCEPTA</span>?
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                This isn't your average hackathon. It's an engineering gauntlet.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shuffle,
                  title: "Real-time Adaptation",
                  desc: "Unlike static hackathons, we throw 'twists' at you mid-build. Adapt or get eliminated.",
                  accent: "from-emerald-500 to-cyan-500"
                },
                {
                  icon: Box,
                  title: "Mystery Mechanics",
                  desc: "You don't know your exact problem until the 'Mystery Box' opens. First-come, first-serve.",
                  accent: "from-cyan-500 to-blue-500"
                },
                {
                  icon: Shield,
                  title: "Technical Defense",
                  desc: "It's not just about a pretty UI—you must defend your code and architecture in a live debate.",
                  accent: "from-blue-500 to-purple-500"
                },
                {
                  icon: Timer,
                  title: "The Twist Round",
                  desc: "Every 30 minutes, new feature requirements drop. Can you handle the pressure?",
                  accent: "from-purple-500 to-pink-500"
                },
                {
                  icon: Target,
                  title: "High-Intent Only",
                  desc: "₹60 entry ensures committed participants. No ghost teams, no half-efforts.",
                  accent: "from-pink-500 to-red-500"
                },
                {
                  icon: Award,
                  title: "Prestige & Recognition",
                  desc: "Champion trophies, tech swag, and direct connections to industry veterans.",
                  accent: "from-red-500 to-orange-500"
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] hover:border-emerald-500/30 transition-all hover:bg-white/[0.05]"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.accent} mb-6`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Floating Timeline with Hover Cards --- */}
        <FloatingTimeline />

        {/* --- Prizes & Perks Section --- */}
        <section className="relative px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
                Prizes & <span className="text-emerald-400">Perks</span>
              </h2>
              <p className="text-slate-400 text-lg">Because excellence deserves recognition</p>
            </div>

            {/* Top 3 Prizes */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  place: "🥇 Winner",
                  prize: "Trophy + ₹1500",
                  sub: "Tech swag worth ₹1500/member",
                  gradient: "from-amber-500/20 to-yellow-500/10",
                  border: "border-amber-500/30"
                },
                {
                  place: "🥈 Runner-up",
                  prize: "Trophy + ₹1500",
                  sub: "Tech swag worth ₹1500/member",
                  gradient: "from-slate-400/20 to-slate-500/10",
                  border: "border-slate-400/30"
                },
                {
                  place: "🥉 2nd Runner-up",
                  prize: "Trophy + ₹1500",
                  sub: "Tech swag worth ₹1500/member",
                  gradient: "from-orange-600/20 to-amber-600/10",
                  border: "border-orange-500/30"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-3xl bg-gradient-to-br ${item.gradient} border ${item.border} text-center hover:scale-105 transition-transform`}
                >
                  <div className="text-3xl mb-4">{item.place}</div>
                  <div className="text-2xl font-bold text-white mb-2">{item.prize}</div>
                  <p className="text-slate-400 text-sm">{item.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Ecosystem Access */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-[2rem] p-10 border border-emerald-500/20">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Ecosystem Access</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Brain, title: "1:1 Mentorship", desc: "Sessions with industry veterans" },
                  { icon: Users, title: "Networking", desc: "Connect with partner communities" },
                  { icon: Rocket, title: "Career Boost", desc: "Direct connections to recruiters" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="inline-flex p-4 rounded-2xl bg-emerald-500/20 mb-4">
                      <item.icon className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* For All Participants */}
            <div className="mt-12 p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] text-center">
              <h3 className="text-xl font-bold text-white mb-4">For All Participants</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: Award, text: "Official Certificates" },
                  { icon: Code, text: "Developer Workshops" },
                  { icon: Wifi, text: "Community Access" },
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <perk.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="font-medium">{perk.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section className="relative px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-white mb-4">
                <HelpCircle className="inline w-10 h-10 text-cyan-400 mr-2 -mt-1" />
                FAQ
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "Why is there a ₹60 fee?",
                  a: "To ensure a high-quality, committed pool of hackers. The fee filters out casual signups and guarantees serious participants who will see it through all 9 days."
                },
                {
                  q: "What if I don't have a team?",
                  a: "No worries! We facilitate 'Spin-the-Wheel' team forming during Orientation (Day 0) to ensure every solo participant gets a balanced squad with complementary skills."
                },
                {
                  q: "What is the team size?",
                  a: "Teams must have exactly 4 members. No more, no less. This ensures fair competition and balanced workload distribution."
                },
                {
                  q: "What are the problem statement themes?",
                  a: "Themes include Healthcare, Education, FinTech, and more. But here's the twist—you pick your theme during 'The Mystery Box' on a first-come, first-serve basis!"
                },
                {
                  q: "How does The Twist Round work?",
                  a: "During the 12-hour Round 2, new feature requirements are released every 30 minutes. Your team must adapt on-the-fly while maintaining code quality. 50% of teams are eliminated here."
                },
                {
                  q: "What is Technical Defense?",
                  a: "In the Grand Finale, you don't just demo—you defend. Judges will question your architecture, code decisions, and technical trade-offs in a live debate format."
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-emerald-500/20 transition-all"
                >
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-cyan-400" /> {faq.q}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="relative px-4 sm:px-6 pb-20">
          <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/20 p-12 md:p-24 text-center overflow-hidden relative shadow-2xl">
            {/* Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 font-mono">March 5th – 14th, 2026</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
              READY TO <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">COMPETE?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              100-200 teams. 9 intense days. Only the most adaptable engineers will survive. Are you one of them?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/apply"
                className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black text-xl rounded-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
              >
                Register for ₹60 <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
            <p className="text-slate-600 text-sm mt-6">
              Paid entry ensures high-intent, committed participants only.
            </p>
          </div>
        </section>

      </div>
    </>
  );
}