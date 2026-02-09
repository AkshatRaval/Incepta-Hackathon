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

// Reusable styles
const inputStyle = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-default)",
    borderRadius: "0.75rem",
    color: "var(--text-primary)",
    fontSize: "1rem",
    outline: "none",
};

const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "0.5rem",
    display: "block",
};

const cardStyle = {
    background: "var(--bg-elevated)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid var(--border-default)",
    borderRadius: "1.5rem",
};

const btnPrimaryStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    fontWeight: 600,
    fontSize: "1rem",
    background: "var(--gradient-primary)",
    color: "#000",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
};

const btnSecondaryStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    fontWeight: 600,
    fontSize: "1rem",
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-default)",
    color: "var(--text-primary)",
    cursor: "pointer",
    transition: "all 0.3s ease",
};

function ApplyPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading } = useAuth();

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationId, setApplicationId] = useState<string | null>(null);
    const [hasExistingApp, setHasExistingApp] = useState(false);
    const [checkingExisting, setCheckingExisting] = useState(true);
    const [transactionId, setTransactionId] = useState("");
    const [paymentSubmitted, setPaymentSubmitted] = useState(false);

    // UPI Payment Details - Update these with your actual UPI ID
    const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "your-upi-id@paytm";
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

    const handlePaymentSubmit = async () => {
        if (!user || !applicationId || !transactionId.trim()) return;
        setIsSubmitting(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch("/api/payment/submit-upi", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ applicationId, transactionId: transactionId.trim() }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Failed to submit payment");
            setPaymentSubmitted(true);
        } catch (error) {
            console.error("Error submitting payment:", error);
            alert(error instanceof Error ? error.message : "Failed to submit payment");
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyUpiId = () => {
        navigator.clipboard.writeText(UPI_ID);
        alert("UPI ID copied to clipboard!");
    };

    if (loading || checkingExisting) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} />
            </div>
        );
    }

    if (!user) {
        return (
            <>
                <NeuralBackground />
                <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
                        <div style={{ ...cardStyle, padding: "2.5rem", textAlign: "center" }}>
                            <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                style={{ background: "var(--bg-elevated)" }}
                            >
                                <Lock className="w-10 h-10" style={{ color: "var(--text-muted)" }} />
                            </div>
                            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Sign In Required</h2>
                            <p className="mb-8" style={{ color: "var(--text-muted)" }}>Please sign in to register for INCEPTA 2026</p>
                            <Link href="/login" style={btnPrimaryStyle}>
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
                        <div style={{ ...cardStyle, padding: "2.5rem", textAlign: "center" }}>
                            <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                style={{ background: "rgba(34,197,94,0.15)" }}
                            >
                                <Check className="w-10 h-10" style={{ color: "var(--accent)" }} />
                            </div>
                            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Already Applied!</h2>
                            <p className="mb-8" style={{ color: "var(--text-muted)" }}>You have already submitted an application for INCEPTA 2026.</p>
                            <Link href="/profile" style={btnPrimaryStyle}>
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
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                        <span
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
                            style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "var(--accent)" }}
                        >
                            <FileText className="w-4 h-4" />
                            <span>Application Form</span>
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                            Register for <span className="gradient-text">INCEPTA 2026</span>
                        </h1>
                        <p style={{ color: "var(--text-muted)" }}>Complete your application in a few steps</p>
                    </motion.div>

                    {/* Progress Steps */}
                    <div className="flex justify-center mb-10 overflow-x-auto">
                        <div className="flex items-center gap-1">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <button
                                        onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                                        disabled={step.id > currentStep}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                                        style={{
                                            background: step.id === currentStep
                                                ? "var(--accent)"
                                                : step.id < currentStep
                                                    ? "rgba(34,197,94,0.2)"
                                                    : "var(--bg-elevated)",
                                            color: step.id === currentStep
                                                ? "#fff"
                                                : step.id < currentStep
                                                    ? "var(--accent)"
                                                    : "var(--text-muted)",
                                        }}
                                    >
                                        {step.id < currentStep ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                                        <span className="hidden sm:inline">{step.title}</span>
                                    </button>
                                    {index < steps.length - 1 && (
                                        <div
                                            className="w-6 h-0.5"
                                            style={{ background: step.id < currentStep ? "var(--accent)" : "var(--border-subtle)" }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ ...cardStyle, padding: "1.5rem" }} className="md:p-10">
                            <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                                {steps[currentStep - 1]?.title || "Payment"}
                            </h2>

                            <AnimatePresence mode="wait">
                                {/* Step 1: Personal */}
                                {currentStep === 1 && (
                                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label style={labelStyle}>First Name *</label>
                                                <input {...register("firstName")} placeholder="John" style={inputStyle} />
                                                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Last Name *</label>
                                                <input {...register("lastName")} placeholder="Doe" style={inputStyle} />
                                                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label style={labelStyle}>Email *</label>
                                                <input {...register("email")} type="email" placeholder="john@example.com" style={{ ...inputStyle, opacity: user?.email ? 0.6 : 1 }} disabled={!!user?.email} />
                                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Phone *</label>
                                                <input {...register("phone")} placeholder="+91 9876543210" style={inputStyle} />
                                                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label style={labelStyle}>Date of Birth *</label>
                                                <input {...register("dateOfBirth")} type="date" style={inputStyle} />
                                                {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth.message}</p>}
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Gender *</label>
                                                <select {...register("gender")} style={inputStyle}>
                                                    <option value="">Select gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="non-binary">Non-binary</option>
                                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                                </select>
                                                {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label style={labelStyle}>Country *</label>
                                                <input {...register("country")} placeholder="India" style={inputStyle} />
                                                {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
                                            </div>
                                            <div>
                                                <label style={labelStyle}>City *</label>
                                                <input {...register("city")} placeholder="Mumbai" style={inputStyle} />
                                                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Education */}
                                {currentStep === 2 && (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div>
                                            <label style={labelStyle}>Education Level *</label>
                                            <select {...register("educationLevel")} style={inputStyle}>
                                                <option value="">Select level</option>
                                                <option value="high-school">High School</option>
                                                <option value="undergraduate">Undergraduate</option>
                                                <option value="graduate">Graduate</option>
                                                <option value="phd">PhD</option>
                                                <option value="working-professional">Working Professional</option>
                                            </select>
                                            {errors.educationLevel && <p className="text-red-400 text-xs mt-1">{errors.educationLevel.message}</p>}
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Institution Name *</label>
                                            <input {...register("institution")} placeholder="IIT Mumbai" style={inputStyle} />
                                            {errors.institution && <p className="text-red-400 text-xs mt-1">{errors.institution.message}</p>}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label style={labelStyle}>Field of Study *</label>
                                                <input {...register("fieldOfStudy")} placeholder="Computer Science" style={inputStyle} />
                                                {errors.fieldOfStudy && <p className="text-red-400 text-xs mt-1">{errors.fieldOfStudy.message}</p>}
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Graduation Year *</label>
                                                <select {...register("graduationYear")} style={inputStyle}>
                                                    <option value="">Select year</option>
                                                    {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                                {errors.graduationYear && <p className="text-red-400 text-xs mt-1">{errors.graduationYear.message}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Coding Experience *</label>
                                            <select {...register("experienceLevel")} style={inputStyle}>
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
                                        <div>
                                            <label style={labelStyle}>Primary Role *</label>
                                            <select {...register("primarySkill")} style={inputStyle}>
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
                                        <div>
                                            <label style={labelStyle}>Programming Languages *</label>
                                            <input {...register("programmingLanguages")} placeholder="Python, JavaScript, Java" style={inputStyle} />
                                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Comma separated</p>
                                            {errors.programmingLanguages && <p className="text-red-400 text-xs mt-1">{errors.programmingLanguages.message}</p>}
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Frameworks & Tools</label>
                                            <input {...register("frameworks")} placeholder="React, Node.js, TensorFlow" style={inputStyle} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label style={labelStyle}>GitHub URL</label>
                                                <input {...register("github")} placeholder="github.com/you" style={inputStyle} />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>LinkedIn URL</label>
                                                <input {...register("linkedin")} placeholder="linkedin.com/in/you" style={inputStyle} />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Portfolio URL</label>
                                                <input {...register("portfolio")} placeholder="yoursite.com" style={inputStyle} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Team */}
                                {currentStep === 4 && (
                                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div>
                                            <label style={labelStyle}>Team Preference *</label>
                                            <select {...register("teamPreference")} style={inputStyle}>
                                                <option value="">Select preference</option>
                                                <option value="solo">Solo (Individual participation)</option>
                                                <option value="have-team">I have a team</option>
                                                <option value="looking-for-team">Looking for teammates</option>
                                            </select>
                                            {errors.teamPreference && <p className="text-red-400 text-xs mt-1">{errors.teamPreference.message}</p>}
                                        </div>
                                        {teamPreference === "have-team" && (
                                            <div>
                                                <label style={labelStyle}>Team Name</label>
                                                <input {...register("teamName")} placeholder="Team Awesome" style={inputStyle} />
                                            </div>
                                        )}
                                        {teamPreference === "looking-for-team" && (
                                            <div className="p-4 rounded-xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                                                <p className="font-medium mb-1" style={{ color: "var(--accent)" }}>Looking for teammates!</p>
                                                <p className="text-sm" style={{ color: "var(--text-muted)" }}>You&apos;ll be added to our team formation channel on Discord.</p>
                                            </div>
                                        )}
                                        <div className="p-5 rounded-xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
                                            <h4 className="font-medium mb-3" style={{ color: "var(--text-primary)" }}>Team Guidelines</h4>
                                            <ul className="text-sm space-y-1" style={{ color: "var(--text-muted)" }}>
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
                                        <div>
                                            <label style={labelStyle}>Why do you want to participate? *</label>
                                            <textarea {...register("motivation")} placeholder="Tell us what excites you..." style={{ ...inputStyle, height: "8rem", resize: "none" }} />
                                            {errors.motivation && <p className="text-red-400 text-xs mt-1">{errors.motivation.message}</p>}
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Project Idea (optional)</label>
                                            <textarea {...register("projectIdea")} placeholder="Briefly describe your idea..." style={{ ...inputStyle, height: "6rem", resize: "none" }} />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label style={labelStyle}>Previous Hackathons</label>
                                                <input {...register("previousHackathons")} placeholder="HackMIT, ETHGlobal..." style={inputStyle} />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>How did you hear about us? *</label>
                                                <select {...register("hearAboutUs")} style={inputStyle}>
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
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label style={labelStyle}>T-Shirt Size *</label>
                                                <select {...register("tShirtSize")} style={inputStyle}>
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
                                            <div>
                                                <label style={labelStyle}>Dietary Restrictions</label>
                                                <input {...register("dietaryRestrictions")} placeholder="Vegetarian, Vegan..." style={inputStyle} />
                                            </div>
                                        </div>
                                        <div className="h-px my-6" style={{ background: "var(--border-subtle)" }} />
                                        <div className="space-y-4">
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input type="checkbox" {...register("agreeCodeOfConduct")} className="mt-1 w-4 h-4 rounded accent-emerald-500" />
                                                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                                    I agree to the <Link href="/conduct" style={{ color: "var(--accent)" }}>Code of Conduct</Link>
                                                </span>
                                            </label>
                                            {errors.agreeCodeOfConduct && <p className="text-red-400 text-xs">{errors.agreeCodeOfConduct.message}</p>}
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input type="checkbox" {...register("agreeTerms")} className="mt-1 w-4 h-4 rounded accent-emerald-500" />
                                                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                                    I agree to the <Link href="/terms" style={{ color: "var(--accent)" }}>Terms</Link> and <Link href="/privacy" style={{ color: "var(--accent)" }}>Privacy Policy</Link>
                                                </span>
                                            </label>
                                            {errors.agreeTerms && <p className="text-red-400 text-xs">{errors.agreeTerms.message}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 6: Payment */}
                                {currentStep === 6 && (
                                    <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="py-4">
                                        {paymentSubmitted ? (
                                            // Payment submitted - show confirmation
                                            <div className="text-center py-8">
                                                <div
                                                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                                    style={{ background: "rgba(34,197,94,0.15)" }}
                                                >
                                                    <Check className="w-10 h-10" style={{ color: "var(--accent)" }} />
                                                </div>
                                                <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Payment Submitted!</h3>
                                                <p className="mb-4" style={{ color: "var(--text-muted)" }}>Your transaction ID: <strong style={{ color: "var(--accent)" }}>{transactionId}</strong></p>
                                                <p className="mb-8" style={{ color: "var(--text-muted)" }}>We&apos;ll verify your payment within 24 hours and send you a confirmation email.</p>
                                                <Link href="/profile" style={{ ...btnPrimaryStyle, padding: "1rem 2rem" }}>
                                                    View Your Profile <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        ) : (
                                            // Payment form
                                            <>
                                                <div className="text-center mb-6">
                                                    <div
                                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                                        style={{ background: "rgba(34,197,94,0.15)" }}
                                                    >
                                                        <Check className="w-8 h-8" style={{ color: "var(--accent)" }} />
                                                    </div>
                                                    <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Application Submitted!</h3>
                                                    <p style={{ color: "var(--text-muted)" }}>Complete payment to confirm your spot</p>
                                                </div>

                                                {/* Amount Card */}
                                                <div className="rounded-xl p-5 mb-6 max-w-md mx-auto" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
                                                    <div className="flex justify-between mb-2">
                                                        <span style={{ color: "var(--text-muted)" }}>Registration Fee</span>
                                                        <span className="font-semibold" style={{ color: "var(--text-primary)" }}>₹60</span>
                                                    </div>
                                                    <div className="flex justify-between pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                                                        <span className="font-bold" style={{ color: "var(--text-primary)" }}>Total</span>
                                                        <span className="font-bold text-xl" style={{ color: "var(--accent)" }}>₹60</span>
                                                    </div>
                                                </div>

                                                {/* UPI Payment Instructions */}
                                                <div className="rounded-xl p-5 mb-6 max-w-md mx-auto" style={{ background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                                                    <h4 className="font-semibold mb-4 text-center" style={{ color: "var(--text-primary)" }}>Pay via UPI</h4>

                                                    <div className="space-y-4">
                                                        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                                            <p className="mb-2"><strong>Step 1:</strong> Open any UPI app (GPay, PhonePe, Paytm, etc.)</p>
                                                            <p className="mb-2"><strong>Step 2:</strong> Send ₹60 to the UPI ID below</p>
                                                            <p><strong>Step 3:</strong> Enter your Transaction ID below</p>
                                                        </div>

                                                        <div className="rounded-lg p-3 flex items-center justify-between" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}>
                                                            <span className="font-mono font-semibold" style={{ color: "var(--accent)" }}>{UPI_ID}</span>
                                                            <button
                                                                type="button"
                                                                onClick={copyUpiId}
                                                                className="text-sm px-3 py-1 rounded-lg"
                                                                style={{ background: "var(--accent)", color: "#000", fontWeight: 600 }}
                                                            >
                                                                Copy
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Transaction ID Input */}
                                                <div className="max-w-md mx-auto mb-6">
                                                    <label style={labelStyle}>UPI Transaction ID / Reference Number *</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g., 401234567890"
                                                        value={transactionId}
                                                        onChange={(e) => setTransactionId(e.target.value)}
                                                        style={inputStyle}
                                                    />
                                                    <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Find this in your UPI app payment history</p>
                                                </div>

                                                <div className="text-center">
                                                    <button
                                                        type="button"
                                                        onClick={handlePaymentSubmit}
                                                        disabled={isSubmitting || !transactionId.trim()}
                                                        style={{ ...btnPrimaryStyle, padding: "1rem 2rem", fontSize: "1.125rem", opacity: (isSubmitting || !transactionId.trim()) ? 0.6 : 1 }}
                                                    >
                                                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Submit Payment <ArrowRight className="w-4 h-4" /></>}
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation */}
                            {currentStep < 6 && (
                                <div className="flex justify-between mt-8 pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        disabled={currentStep === 1}
                                        style={{ ...btnSecondaryStyle, opacity: currentStep === 1 ? 0.4 : 1 }}
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                    {currentStep < 5 ? (
                                        <button type="button" onClick={nextStep} style={btnPrimaryStyle}>
                                            Next <ChevronRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button type="submit" disabled={isSubmitting} style={{ ...btnPrimaryStyle, opacity: isSubmitting ? 0.6 : 1 }}>
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} /></div>}>
            <ApplyPageContent />
        </Suspense>
    );
}
