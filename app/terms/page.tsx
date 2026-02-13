"use client";

import { motion } from "framer-motion";
import { NeuralBackground } from "@/components/effects/neural-background";
import { FileText, CheckCircle2, AlertTriangle, Scale, Lock, Users, Laptop } from "lucide-react";

export default function TermsPage() {
    return (
        <>
            <NeuralBackground />
            <div className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="badge badge-cyan mb-6 flex items-center gap-2 justify-center w-fit mx-auto px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                            <FileText className="w-4 h-4" />
                            <span>Legal Agreement</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                            Terms & <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Conditions</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Please read these terms carefully. By registering for INCEPTA 2026, you agree to be bound by these conditions.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        <Section title="1. Eligibility & Registration" icon={Users}>
                            <p>Participation involves the following strict eligibility criteria:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Student Status:</strong> You must be a currently enrolled undergraduate or postgraduate student at a recognized university or college. Recent graduates (within 1 year) may participate with prior approval.</li>
                                <li><strong>Team Size:</strong> Teams must consist of minimum 2 and maximum 4 members. Solo participation is allowed but discouraged due to the workload.</li>
                                <li><strong>Age:</strong> Participants must be at least 18 years of age.</li>
                                <li><strong>Registration Data:</strong> You verify that all information provided during registration (including but not limited to Name, College ID, Email) is accurate and truthful. Providing false information will lead to immediate disqualification.</li>
                            </ul>
                        </Section>

                        <Section title="2. Intellectual Property Rights" icon={Laptop}>
                            <p>We believe that creators should own their creations. Here is our IP policy:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Ownership:</strong> You and your team retain full ownership of all software, code, designs, and assets created during the hackathon. INCEPTA claim no IP rights over your project.</li>
                                <li><strong>License to Showcase:</strong> By submitting a project, you grant INCEPTA 2026 a non-exclusive, royalty-free license to use your project's name, screenshots, and description for marketing, promotional, and portfolio purposes (e.g., "Previous Winners" showcase).</li>
                                <li><strong>Open Source:</strong> While not mandatory, we encourage teams to open-source their projects. If you use open-source libraries, you must adhere to their respective licenses.</li>
                            </ul>
                        </Section>

                        <Section title="3. Code of Conduct & Behaviour" icon={Scale}>
                            <p>All participants must adhere to our <a href="/conduct" className="text-cyan-400 hover:underline">Code of Conduct</a>. Zero tolerance applies to:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Harassment:</strong> Any form of harassment towards other hackers, volunteers, sponsors, or staff.</li>
                                <li><strong>Cheating:</strong> Submitting pre-existing projects, plagiarizing code, or sabotaging other teams.</li>
                                <li><strong>Illegal Activity:</strong> Building malware, phishing tools, or any project that violates local or specific laws.</li>
                            </ul>
                            <p className="mt-2 text-red-400">Violation of these rules will result in immediate expulsion from the event without refund.</p>
                        </Section>

                        <Section title="4. Submission & Judging" icon={CheckCircle2}>
                            <p>To be eligible for prizes, teams must submit their projects before the deadline. Submissions must include:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>A working GitHub repository link.</li>
                                <li>A demo video (2-3 minutes).</li>
                                <li>A deployed link (if applicable).</li>
                            </ul>
                            <p className="mt-2"><strong>Judging decisions are final.</strong> Judges evaluate based on Innovation, Technical Complexity, UI/UX, and Practicality. No appeals will be entertained regarding the judging outcome.</p>
                        </Section>

                        <Section title="5. Liability & Disclaimers" icon={AlertTriangle}>
                            <p>INCEPTA 2026 is provided "as is".</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Personal Property:</strong> Organizers are not responsible for theft or damage to laptops, phones, or other personal equipment brought to the venue.</li>
                                <li><strong>Health & Safety:</strong> Participants are responsible for their own health. Organizers will provide first aid, but are not liable for any injuries sustained during the event.</li>
                                <li><strong>Platform Downtime:</strong> We are not liable for potential outages of third-party platforms (GitHub, Vercel, etc.) that may affect your ability to work.</li>
                            </ul>
                        </Section>

                        <Section title="6. Privacy Policy" icon={Lock}>
                            <p>We respect your data privacy.</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Data Collection:</strong> We collect your name, email, phone number, and resume to facilitate the event. Data is shared with recruiting sponsors only if explicit consent is provided during registration.</li>
                                <li><strong>No Spam:</strong> We will never sell your data to third-party ad networks.</li>
                                <li><strong>Photography:</strong> By attending, you consent to being photographed and filmed for event promotional material. If you wish to opt-out, please inform us at the registration desk.</li>
                            </ul>
                        </Section>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center text-slate-500 text-sm border-t border-white/10 pt-8"
                    >
                        <p>Last updated: February 13, 2026</p>
                        <p className="mt-2">Questions? Contact <a href="mailto:legal@incepta.dev" className="text-cyan-400 hover:underline">legal@incepta.dev</a></p>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md hover:border-cyan-500/30 transition-colors"
        >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Icon className="w-5 h-5" />
                </div>
                {title}
            </h2>
            <div className="text-slate-400 leading-relaxed pl-12 sm:pl-14">
                {children}
            </div>
        </motion.div>
    );
}
