"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/lib/auth-context";
import { NeuralBackground } from "@/components/effects/neural-background";
import Link from "next/link";
import {
    User,
    GraduationCap,
    Code,
    Users,
    Heart,
    CreditCard,
    Check,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Lock,
    ArrowRight,
    FileText,
} from "lucide-react";

const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Please select your gender"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    educationLevel: z.string().min(1, "Education level is required"),
    institution: z.string().min(2, "Institution name is required"),
    fieldOfStudy: z.string().min(2, "Field of study is required"),
    graduationYear: z.string().min(1, "Graduation year is required"),
    experienceLevel: z.string().min(1, "Experience level is required"),
    primarySkill: z.string().min(1, "Primary skill is required"),
    programmingLanguages: z.string().min(1, "At least one language is required"),
    frameworks: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
    teamPreference: z.string().min(1, "Team preference is required"),
    teamName: z.string().optional(),
    lookingForTeammates: z.boolean().optional(),
    motivation: z.string().min(50, "Please write at least 50 characters"),
    projectIdea: z.string().optional(),
    previousHackathons: z.string().optional(),
    hearAboutUs: z.string().min(1, "This field is required"),
    tShirtSize: z.string().min(1, "T-shirt size is required"),
    dietaryRestrictions: z.string().optional(),
    agreeCodeOfConduct: z.boolean().refine((val) => val === true, "Required"),
    agreeTerms: z.boolean().refine((val) => val === true, "Required"),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Education", icon: GraduationCap },
    { id: 3, title: "Skills", icon: Code },
    { id: 4, title: "Team", icon: Users },
    { id: 5, title: "Motivation", icon: Heart },
    { id: 6, title: "Payment", icon: CreditCard },
];

function ApplyPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading } = useAuth();

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationId, setApplicationId] = useState<string | null>(null);
    const [hasExistingApp, setHasExistingApp] = useState(false);
    const [checkingExisting, setCheckingExisting] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            agreeCodeOfConduct: false,
            agreeTerms: false,
            lookingForTeammates: false,
        },
    });

    const teamPreference = watch("teamPreference");

    useEffect(() => {
        const checkExisting = async () => {
            if (!user) {
                setCheckingExisting(false);
                return;
            }
            try {
                const token = await user.getIdToken();
                const res = await fetch("/api/applications/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.application) {
                        setHasExistingApp(true);
                        setApplicationId(data.application.id);
                    }
                }
            } catch (error) {
                console.error("Error checking existing app:", error);
            } finally {
                setCheckingExisting(false);
            }
        };
        checkExisting();
    }, [user]);

    useEffect(() => {
        if (user?.email) setValue("email", user.email);
        if (user?.displayName) {
            const names = user.displayName.split(" ");
            setValue("firstName", names[0] || "");
            setValue("lastName", names.slice(1).join(" ") || "");
        }
    }, [user, setValue]);

    useEffect(() => {
        if (searchParams.get("cancelled") === "true") setCurrentStep(6);
    }, [searchParams]);

    const validateStep = async (step: number) => {
        const fieldsToValidate: Record<number, (keyof FormData)[]> = {
            1: ["firstName", "lastName", "email", "phone", "dateOfBirth", "gender", "country", "city"],
            2: ["educationLevel", "institution", "fieldOfStudy", "graduationYear", "experienceLevel"],
            3: ["primarySkill", "programmingLanguages"],
            4: ["teamPreference"],
            5: ["motivation", "hearAboutUs", "tShirtSize", "agreeCodeOfConduct", "agreeTerms"],
        };
        const fields = fieldsToValidate[step];
        if (fields) return trigger(fields);
        return true;
    };

    const nextStep = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid && currentStep < 6) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const onSubmit = async (data: FormData) => {
        if (!user) return;
        setIsSubmitting(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to submit application");
            setApplicationId(result.applicationId);
            setCurrentStep(6);
            await fetch("/api/email/send-confirmation", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ applicationId: result.applicationId, applicantName: data.firstName, applicantEmail: data.email }),
            });
        } catch (error) {
            console.error("Error submitting application:", error);
            alert(error instanceof Error ? error.message : "Failed to submit application");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePayment = async () => {
        if (!user || !applicationId) return;
        setIsSubmitting(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/payment/create-session", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ applicationId }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to create payment session");
            if (result.url) window.location.href = result.url;
        } catch (error) {
            console.error("Error creating payment:", error);
            alert(error instanceof Error ? error.message : "Failed to initiate payment");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || checkingExisting) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
            </div>
        );
    }

    if (!user) {
        return (
            <>
                <NeuralBackground />
                <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
                        <div className="card-static p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center mx-auto mb-6">
                                <Lock className="w-10 h-10 text-[var(--text-muted)]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">Sign In Required</h2>
                            <p className="text-[var(--text-muted)] mb-8">Please sign in to register for INCEPTA 2026</p>
                            <Link href="/login" className="btn btn-primary">
                                Sign In <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </>
        );
    }

    if (hasExistingApp) {
        return (
            <>
                <NeuralBackground />
                <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
                        <div className="card-static p-10 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-[rgba(34,197,94,0.15)] flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-[var(--accent)]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">Already Applied!</h2>
                            <p className="text-[var(--text-muted)] mb-8">You have already submitted an application for INCEPTA 2026.</p>
                            <Link href="/profile" className="btn btn-primary">
                                View Application Status <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <>
            <NeuralBackground />
            <div className="relative z-10 min-h-screen py-24 px-6">
                <div className="container max-w-3xl">
                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                        <span className="badge mb-4">
                            <FileText className="w-4 h-4" />
                            <span>Application Form</span>
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Register for <span className="text-gradient">INCEPTA 2026</span></h1>
                        <p className="text-[var(--text-muted)]">Complete your application in a few steps</p>
                    </motion.div>

                    {/* Progress Steps */}
                    <div className="flex justify-center mb-10 overflow-x-auto">
                        <div className="flex items-center gap-1">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <button
                                        onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                                        disabled={step.id > currentStep}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${step.id === currentStep
                                                ? "bg-[var(--accent)] text-white"
                                                : step.id < currentStep
                                                    ? "bg-[rgba(34,197,94,0.2)] text-[var(--accent)]"
                                                    : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                                            }`}
                                    >
                                        {step.id < currentStep ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                                        <span className="hidden sm:inline">{step.title}</span>
                                    </button>
                                    {index < steps.length - 1 && (
                                        <div className={`w-6 h-0.5 ${step.id < currentStep ? "bg-[var(--accent)]" : "bg-[var(--border-subtle)]"}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-static p-6 md:p-10">
                            <h2 className="text-xl font-bold mb-6">{steps[currentStep - 1]?.title || "Payment"}</h2>

                            <AnimatePresence mode="wait">
                                {/* Step 1: Personal */}
                                {currentStep === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div className="grid-2">
                                            <div className="input-group">
                                                <label className="input-label">First Name *</label>
                                                <input {...register("firstName")} placeholder="John" className="input" />
                                                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Last Name *</label>
                                                <input {...register("lastName")} placeholder="Doe" className="input" />
                                                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid-2">
                                            <div className="input-group">
                                                <label className="input-label">Email *</label>
                                                <input {...register("email")} type="email" placeholder="john@example.com" className="input" disabled={!!user?.email} />
                                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Phone *</label>
                                                <input {...register("phone")} placeholder="+91 9876543210" className="input" />
                                                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid-2">
                                            <div className="input-group">
                                                <label className="input-label">Date of Birth *</label>
                                                <input {...register("dateOfBirth")} type="date" className="input" />
                                                {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth.message}</p>}
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Gender *</label>
                                                <select {...register("gender")} className="input">
                                                    <option value="">Select gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="non-binary">Non-binary</option>
                                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                                </select>
                                                {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid-2">
                                            <div className="input-group">
                                                <label className="input-label">Country *</label>
                                                <input {...register("country")} placeholder="India" className="input" />
                                                {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">City *</label>
                                                <input {...register("city")} placeholder="Mumbai" className="input" />
                                                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Education */}
                                {currentStep === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div className="input-group">
                                            <label className="input-label">Education Level *</label>
                                            <select {...register("educationLevel")} className="input">
                                                <option value="">Select level</option>
                                                <option value="high-school">High School</option>
                                                <option value="undergraduate">Undergraduate</option>
                                                <option value="graduate">Graduate</option>
                                                <option value="phd">PhD</option>
                                                <option value="working-professional">Working Professional</option>
                                            </select>
                                            {errors.educationLevel && <p className="text-red-400 text-xs mt-1">{errors.educationLevel.message}</p>}
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Institution Name *</label>
                                            <input {...register("institution")} placeholder="IIT Mumbai" className="input" />
                                            {errors.institution && <p className="text-red-400 text-xs mt-1">{errors.institution.message}</p>}
                                        </div>
                                        <div className="grid-2">
                                            <div className="input-group">
                                                <label className="input-label">Field of Study *</label>
                                                <input {...register("fieldOfStudy")} placeholder="Computer Science" className="input" />
                                                {errors.fieldOfStudy && <p className="text-red-400 text-xs mt-1">{errors.fieldOfStudy.message}</p>}
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Graduation Year *</label>
                                                <select {...register("graduationYear")} className="input">
                                                    <option value="">Select year</option>
                                                    {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                                {errors.graduationYear && <p className="text-red-400 text-xs mt-1">{errors.graduationYear.message}</p>}
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Coding Experience *</label>
                                            <select {...register("experienceLevel")} className="input">
                                                <option value="">Select experience</option>
                                                <option value="beginner">Beginner (&lt; 1 year)</option>
                                                <option value="intermediate">Intermediate (1-3 years)</option>
                                                <option value="advanced">Advanced (3-5 years)</option>
                                                <option value="expert">Expert (5+ years)</option>
                                            </select>
                                            {errors.experienceLevel && <p className="text-red-400 text-xs mt-1">{errors.experienceLevel.message}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Skills */}
                                {currentStep === 3 && (
                                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div className="input-group">
                                            <label className="input-label">Primary Role *</label>
                                            <select {...register("primarySkill")} className="input">
                                                <option value="">Select role</option>
                                                <option value="frontend">Frontend Developer</option>
                                                <option value="backend">Backend Developer</option>
                                                <option value="fullstack">Full Stack Developer</option>
                                                <option value="mobile">Mobile Developer</option>
                                                <option value="ml-ai">ML/AI Engineer</option>
                                                <option value="data">Data Scientist</option>
                                                <option value="devops">DevOps Engineer</option>
                                                <option value="designer">UI/UX Designer</option>
                                                <option value="product">Product Manager</option>
                                            </select>
                                            {errors.primarySkill && <p className="text-red-400 text-xs mt-1">{errors.primarySkill.message}</p>}
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Programming Languages *</label>
                                            <input {...register("programmingLanguages")} placeholder="Python, JavaScript, Java" className="input" />
                                            <p className="text-[var(--text-muted)] text-xs mt-1">Comma separated</p>
                                            {errors.programmingLanguages && <p className="text-red-400 text-xs mt-1">{errors.programmingLanguages.message}</p>}
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Frameworks & Tools</label>
                                            <input {...register("frameworks")} placeholder="React, Node.js, TensorFlow" className="input" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="input-group">
                                                <label className="input-label">GitHub URL</label>
                                                <input {...register("github")} placeholder="github.com/you" className="input" />
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">LinkedIn URL</label>
                                                <input {...register("linkedin")} placeholder="linkedin.com/in/you" className="input" />
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Portfolio URL</label>
                                                <input {...register("portfolio")} placeholder="yoursite.com" className="input" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Team */}
                                {currentStep === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div className="input-group">
                                            <label className="input-label">Team Preference *</label>
                                            <select {...register("teamPreference")} className="input">
                                                <option value="">Select preference</option>
                                                <option value="solo">Solo (Individual participation)</option>
                                                <option value="have-team">I have a team</option>
                                                <option value="looking-for-team">Looking for teammates</option>
                                            </select>
                                            {errors.teamPreference && <p className="text-red-400 text-xs mt-1">{errors.teamPreference.message}</p>}
                                        </div>
                                        {teamPreference === "have-team" && (
                                            <div className="input-group">
                                                <label className="input-label">Team Name</label>
                                                <input {...register("teamName")} placeholder="Team Awesome" className="input" />
                                            </div>
                                        )}
                                        {teamPreference === "looking-for-team" && (
                                            <div className="p-4 rounded-xl bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)]">
                                                <p className="text-[var(--accent)] font-medium mb-1">Looking for teammates!</p>
                                                <p className="text-[var(--text-muted)] text-sm">You&apos;ll be added to our team formation channel on Discord.</p>
                                            </div>
                                        )}
                                        <div className="p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                                            <h4 className="font-medium mb-3">Team Guidelines</h4>
                                            <ul className="text-[var(--text-muted)] text-sm space-y-1">
                                                <li>• Teams can have 1-4 members</li>
                                                <li>• All team members must register individually</li>
                                                <li>• Teams can be modified until March 10, 2026</li>
                                                <li>• Solo participants are eligible for all prizes</li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 5: Motivation */}
                                {currentStep === 5 && (
                                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div className="input-group">
                                            <label className="input-label">Why do you want to participate? *</label>
                                            <textarea {...register("motivation")} placeholder="Tell us what excites you..." className="input h-32 resize-none" />
                                            {errors.motivation && <p className="text-red-400 text-xs mt-1">{errors.motivation.message}</p>}
                                        </div>
                                        <div className="input-group">
                                            <label className="input-label">Project Idea (optional)</label>
                                            <textarea {...register("projectIdea")} placeholder="Briefly describe your idea..." className="input h-24 resize-none" />
                                        </div>
                                        <div className="grid-2">
                                            <div className="input-group">
                                                <label className="input-label">Previous Hackathons</label>
                                                <input {...register("previousHackathons")} placeholder="HackMIT, ETHGlobal..." className="input" />
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">How did you hear about us? *</label>
                                                <select {...register("hearAboutUs")} className="input">
                                                    <option value="">Select option</option>
                                                    <option value="social-media">Social Media</option>
                                                    <option value="friend">Friend/Colleague</option>
                                                    <option value="university">University/College</option>
                                                    <option value="newsletter">Newsletter</option>
                                                    <option value="search">Google Search</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {errors.hearAboutUs && <p className="text-red-400 text-xs mt-1">{errors.hearAboutUs.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid-2">
                                            <div className="input-group">
                                                <label className="input-label">T-Shirt Size *</label>
                                                <select {...register("tShirtSize")} className="input">
                                                    <option value="">Select size</option>
                                                    <option value="xs">XS</option>
                                                    <option value="s">S</option>
                                                    <option value="m">M</option>
                                                    <option value="l">L</option>
                                                    <option value="xl">XL</option>
                                                    <option value="xxl">XXL</option>
                                                </select>
                                                {errors.tShirtSize && <p className="text-red-400 text-xs mt-1">{errors.tShirtSize.message}</p>}
                                            </div>
                                            <div className="input-group">
                                                <label className="input-label">Dietary Restrictions</label>
                                                <input {...register("dietaryRestrictions")} placeholder="Vegetarian, Vegan..." className="input" />
                                            </div>
                                        </div>
                                        <div className="divider" />
                                        <div className="space-y-4">
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input type="checkbox" {...register("agreeCodeOfConduct")} className="mt-1 w-4 h-4 rounded border-[var(--border-default)] accent-[var(--accent)]" />
                                                <span className="text-[var(--text-secondary)] text-sm">
                                                    I agree to the <Link href="/conduct" className="text-[var(--accent)] hover:underline">Code of Conduct</Link>
                                                </span>
                                            </label>
                                            {errors.agreeCodeOfConduct && <p className="text-red-400 text-xs">{errors.agreeCodeOfConduct.message}</p>}
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input type="checkbox" {...register("agreeTerms")} className="mt-1 w-4 h-4 rounded border-[var(--border-default)] accent-[var(--accent)]" />
                                                <span className="text-[var(--text-secondary)] text-sm">
                                                    I agree to the <Link href="/terms" className="text-[var(--accent)] hover:underline">Terms</Link> and <Link href="/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</Link>
                                                </span>
                                            </label>
                                            {errors.agreeTerms && <p className="text-red-400 text-xs">{errors.agreeTerms.message}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 6: Payment */}
                                {currentStep === 6 && (
                                    <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-8">
                                        <div className="w-20 h-20 rounded-2xl bg-[rgba(34,197,94,0.15)] flex items-center justify-center mx-auto mb-6">
                                            <Check className="w-10 h-10 text-[var(--accent)]" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
                                        <p className="text-[var(--text-muted)] mb-8">Complete your payment to confirm your spot</p>

                                        <div className="bg-[var(--bg-elevated)] rounded-xl p-6 mb-6 max-w-sm mx-auto">
                                            <div className="flex justify-between mb-3">
                                                <span className="text-[var(--text-muted)]">Registration Fee</span>
                                                <span className="font-semibold">₹499</span>
                                            </div>
                                            <div className="flex justify-between mb-4 pb-4 border-b border-[var(--border-subtle)]">
                                                <span className="text-[var(--text-muted)]">Processing Fee</span>
                                                <span className="font-semibold">₹0</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-bold">Total</span>
                                                <span className="font-bold text-[var(--accent)]">₹499</span>
                                            </div>
                                        </div>

                                        <button onClick={handlePayment} disabled={isSubmitting} className="btn btn-primary btn-lg">
                                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Pay ₹499 <ArrowRight className="w-4 h-4" /></>}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation */}
                            {currentStep < 6 && (
                                <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border-subtle)]">
                                    <button type="button" onClick={prevStep} disabled={currentStep === 1} className="btn btn-secondary">
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                    {currentStep < 5 ? (
                                        <button type="button" onClick={nextStep} className="btn btn-primary">
                                            Next <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Application <ArrowRight className="w-4 h-4" /></>}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default function ApplyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" /></div>}>
            <ApplyPageContent />
        </Suspense>
    );
}
