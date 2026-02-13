"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
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
    AlertCircle,
    Info,
    MessageSquare // Added for Discord step icon
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/firebase"; // Ensure this import exists or use API

const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Please select your gender"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),

    // Discord Fields
    discord: z.string().min(1, "Discord username is required"),
    discordId: z.string().min(1, "Discord User ID is required"),
    discordAvailability: z.string().min(1, "Please select your availability"),
    timezone: z.string().min(1, "Timezone is required"),

    educationLevel: z.string().min(1, "Education level is required"),
    institution: z.string().min(2, "Institution name is required"),
    fieldOfStudy: z.string().min(2, "Field of study is required"),
    graduationYear: z.string().min(1, "Graduation year is required"),
    experienceLevel: z.string().min(1, "Experience level is required"),
    primarySkill: z.string().min(1, "Primary skill is required"),
    programmingLanguages: z.string().min(1, "At least one language is required"),
    frameworks: z.string().optional(),
    github: z.string().url("Invalid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
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

// Updated Steps Array - 7 Steps
const steps = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Discord", icon: MessageSquare }, // New Step
    { id: 3, title: "Education", icon: GraduationCap },
    { id: 4, title: "Skills", icon: Code },
    { id: 5, title: "Team", icon: Users },
    { id: 6, title: "Motivation", icon: Heart },
    { id: 7, title: "Payment", icon: CreditCard },
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
    const [transactionId, setTransactionId] = useState("");
    const [paymentSubmitted, setPaymentSubmitted] = useState(false);
    const [checkError, setCheckError] = useState(false);
    const [showManualPayment, setShowManualPayment] = useState(false);

    // Payment Link
    const PAYMENT_LINK = process.env.NEXT_PUBLIC_PAYMENT_LINK || "https://razorpay.me/@akshatraval";

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
        getValues,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            agreeCodeOfConduct: false,
            agreeTerms: false,
            lookingForTeammates: false,
            gender: "",
            educationLevel: "",
            graduationYear: "",
            experienceLevel: "",
            primarySkill: "",
            teamPreference: "",
            hearAboutUs: "",
            tShirtSize: "",
            discordAvailability: "",
            timezone: "",
        },
    });

    const teamPreference = watch("teamPreference");

    useEffect(() => {
        let isMounted = true;
        const checkExisting = async () => {
            if (!user) {
                if (isMounted) setCheckingExisting(false);
                return;
            }
            try {
                // Using a longer timeout and handling abort to avoid "Timeout" crashes
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

                const token = await user.getIdToken();
                const res = await fetch("/api/applications/me", {
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const data = await res.json();
                    if (data.application && isMounted) {
                        setHasExistingApp(true);
                        setApplicationId(data.application.id);
                    }
                }
                // Any other result (404 etc) just means no app, which is fine
            } catch (error: any) {
                console.warn("Check existing app failed or timed out:", error);
                if (error.name === 'AbortError') {
                    // Just proceed, assume no app for now to let user try. 
                    // Or show a retry button if it's critical. 
                    // For now, we fail open but log it.
                }
                if (isMounted) setCheckError(true);
            } finally {
                if (isMounted) setCheckingExisting(false);
            }
        };

        if (!loading) {
            checkExisting();
        }
        return () => { isMounted = false; };
    }, [user, loading]);

    useEffect(() => {
        if (user?.email) setValue("email", user.email);
        if (user?.displayName) {
            const names = user.displayName.split(" ");
            setValue("firstName", names[0] || "");
            setValue("lastName", names.slice(1).join(" ") || "");
        }
    }, [user, setValue]);

    useEffect(() => {
        if (searchParams.get("cancelled") === "true") setCurrentStep(7);

        // Handle Instamojo Redirect
        const paymentId = searchParams.get("payment_id");
        const paymentStatus = searchParams.get("payment_status");

        if (paymentId && (paymentStatus === "Credit" || paymentStatus === "credit")) {
            setTransactionId(paymentId);
            setPaymentSubmitted(true);
            setCurrentStep(7);
            // Optionally: Auto-trigger verification handling here if needed
        }
    }, [searchParams]);

    const handlePaymentInitiation = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/payment/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    purpose: "INCEPTA Hackathon Registration",
                    amount: 60,
                    buyer_name: `${getValues("firstName")} ${getValues("lastName")}`,
                    email: getValues("email"),
                    phone: getValues("phone"),
                    redirect_url: `${window.location.origin}/apply`
                })
            });
            const data = await res.json();
            if (data.success && data.longurl) {
                window.location.href = data.longurl;
            } else {
                alert("Payment initiation failed: " + (data.error || "Unknown error"));
                setIsSubmitting(false);
            }
        } catch (e) {
            console.error(e);
            alert("Network error starting payment.");
            setIsSubmitting(false);
        }
    };

    const validateStep = async (step: number) => {
        const fieldsToValidate: Record<number, (keyof FormData)[]> = {
            1: ["firstName", "lastName", "email", "phone", "dateOfBirth", "gender", "country", "city"],
            2: ["discord", "discordId", "discordAvailability", "timezone"], // New Discord Step validation
            3: ["educationLevel", "institution", "fieldOfStudy", "graduationYear", "experienceLevel"],
            4: ["primarySkill", "programmingLanguages", "github", "linkedin", "portfolio"],
            5: ["teamPreference"],
            6: ["motivation", "hearAboutUs", "tShirtSize", "agreeCodeOfConduct", "agreeTerms"],
        };
        const fields = fieldsToValidate[step];
        if (fields) return trigger(fields);
        return true;
    };

    const nextStep = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid && currentStep < 7) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
            setCurrentStep(7);

            // Try sending confirmation email, but don't block UI if it fails
            fetch("/api/email/send-confirmation", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ applicationId: result.applicationId, applicantName: data.firstName, applicantEmail: data.email }),
            }).catch(e => console.error("Email send failed", e));

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

    if (loading || checkingExisting) {
        return (
            <>
                <NeuralBackground />
                <div className="min-h-screen flex items-center justify-center relative z-10">
                    <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                </div>
            </>
        );
    }

    if (!user) {
        return (
            <>
                <NeuralBackground />
                <Link
                    href="/"
                    className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-slate-400 hover:text-white backdrop-blur-md"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Back to Home
                </Link>
                <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
                        <div className="p-8 md:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 text-center shadow-2xl">
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20">
                                <Lock className="w-10 h-10 text-cyan-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3 text-white">Authentication Required</h2>
                            <p className="mb-8 text-slate-400">Please sign in to access the application portal for INCEPTA 2026.</p>
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center w-full py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                            >
                                Sign In <ArrowRight className="w-5 h-5 ml-2" />
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
                <Link
                    href="/"
                    className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-slate-400 hover:text-white backdrop-blur-md"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Back to Home
                </Link>
                <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
                        <div className="p-8 md:p-12 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 text-center shadow-2xl">
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-emerald-500/20 border border-emerald-500/20">
                                <Check className="w-10 h-10 text-emerald-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-3 text-white">Application Received!</h2>
                            <p className="mb-8 text-slate-400">You have already submitted your application. Track your status on your profile.</p>
                            <Link
                                href="/profile"
                                className="inline-flex items-center justify-center w-full py-4 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
                            >
                                Go to Profile <ArrowRight className="w-5 h-5 ml-2" />
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
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-slate-400 hover:text-white backdrop-blur-md"
            >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Home
            </Link>

            <div className="relative z-10 min-h-screen py-24 px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight">
                            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Gauntlet</span> Awaits
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Complete your registration profile. Precision matters.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Progress (Desktop) */}
                        <div className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-24 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
                                <div className="space-y-1">
                                    {steps.map((step, index) => {
                                        const isActive = step.id === currentStep;
                                        const isCompleted = step.id < currentStep;
                                        const Icon = step.icon;
                                        return (
                                            <div
                                                key={step.id}
                                                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                                                    isCompleted ? "text-emerald-400" : "text-slate-500"
                                                    }`}
                                            >
                                                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${isActive ? "bg-cyan-500/20" :
                                                    isCompleted ? "bg-emerald-500/20" : "bg-white/5"
                                                    }`}>
                                                    {isCompleted ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                                                </div>
                                                <span className="font-semibold text-sm">{step.title}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Progress Bar */}
                        <div className="lg:hidden mb-6 overflow-x-auto pb-4 scrollbar-hide">
                            <div className="flex items-center gap-2 min-w-max">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-bold whitespace-nowrap ${step.id === currentStep ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" :
                                            step.id < currentStep ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                                                "bg-white/5 border-white/10 text-slate-500"
                                            }`}
                                    >
                                        <span>{step.id}. {step.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Form */}
                        <div className="flex-1">
                            <div className="p-6 md:p-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 relative overflow-hidden">
                                {/* Decorative Gradient */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                <h2 className="text-2xl font-bold text-white mb-6 relative flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-sm">{currentStep}</span>
                                    {steps[currentStep - 1]?.title}
                                </h2>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentStep}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6 relative z-10"
                                        >

                                            {/* STEP 1: PERSONAL */}
                                            {currentStep === 1 && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label tooltip="Your legal first name.">First Name</Label>
                                                        <Input {...register("firstName")} placeholder="Eg. Sarah" error={errors.firstName?.message} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="Your legal last name.">Last Name</Label>
                                                        <Input {...register("lastName")} placeholder="Eg. Connor" error={errors.lastName?.message} />
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label tooltip="We will send your acceptance letter here.">Email Address</Label>
                                                        <Input {...register("email")} disabled={!!user?.email} className={user?.email ? "opacity-60 cursor-not-allowed" : ""} error={errors.email?.message} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="For emergency contact during the event.">Phone Number</Label>
                                                        <Input {...register("phone")} placeholder="+91 98765 43210" error={errors.phone?.message} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="To verify age eligibility for prizes.">Date of Birth</Label>
                                                        <Input type="date" {...register("dateOfBirth")} error={errors.dateOfBirth?.message} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="Helps us ensure diversity.">Gender</Label>
                                                        <SelectController name="gender" control={control} error={errors.gender?.message} placeholder="Select Gender">
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                            <SelectItem value="non-binary">Non-binary</SelectItem>
                                                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                                        </SelectController>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="Country of residence.">Country</Label>
                                                        <Input {...register("country")} placeholder="India" error={errors.country?.message} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="City of residence.">City</Label>
                                                        <Input {...register("city")} placeholder="New Delhi" error={errors.city?.message} />
                                                    </div>
                                                </div>
                                            )}

                                            {/* STEP 2: DISCORD (NEW STEP) */}
                                            {currentStep === 2 && (
                                                <div className="space-y-8">
                                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20">
                                                        <div className="w-12 h-12 rounded-lg bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2] shrink-0">
                                                            <svg className="w-8 h-8 fill-current" viewBox="0 0 127.14 96.36">
                                                                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.05,105.05,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.24-18.87-3.03-43.43-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.06-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white mb-1">Join the Community</h3>
                                                            <p className="text-slate-400 text-sm">Communication happens on Discord. Please verify your details carefully.</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <Label tooltip="Your Discord username (e.g., 'akshat'). Join our server first!">Discord Username</Label>
                                                            <Input {...register("discord")} placeholder="username" error={errors.discord?.message} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label tooltip="Settings > Advanced > Developer Mode (ON) > Right Click Profile > Copy User ID.">Discord User ID</Label>
                                                            <Input {...register("discordId")} placeholder="e.g. 739384..." error={errors.discordId?.message} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label tooltip="When are you usually active for team syncs?">Active Hours</Label>
                                                            <SelectController name="discordAvailability" control={control} error={errors.discordAvailability?.message} placeholder="Select Availability">
                                                                <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                                                                <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                                                                <SelectItem value="evening">Evening (6PM - 12AM)</SelectItem>
                                                                <SelectItem value="late-night">Late Night (12AM - 6AM)</SelectItem>
                                                            </SelectController>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label tooltip="Required for calculating meeting times.">Timezone</Label>
                                                            <SelectController name="timezone" control={control} error={errors.timezone?.message} placeholder="Select Timezone">
                                                                <SelectItem value="IST">IST (Indian Standard Time)</SelectItem>
                                                                <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                                                                <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                                                                <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                                                                <SelectItem value="CET">CET (Central European Time)</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectController>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* STEP 3: EDUCATION */}
                                            {currentStep === 3 && (
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <Label tooltip="Your highest level of education.">Current Education Level</Label>
                                                        <SelectController name="educationLevel" control={control} error={errors.educationLevel?.message} placeholder="Select Level">
                                                            <SelectItem value="high-school">High School</SelectItem>
                                                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                                                            <SelectItem value="graduate">Graduate</SelectItem>
                                                            <SelectItem value="phd">PhD</SelectItem>
                                                            <SelectItem value="working-professional">Working Professional</SelectItem>
                                                        </SelectController>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="Name of your school or university.">Institution / College Name</Label>
                                                        <Input {...register("institution")} placeholder="Eg. IIT Bombay" error={errors.institution?.message} />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <Label tooltip="Your major or specialization.">Field of Study</Label>
                                                            <Input {...register("fieldOfStudy")} placeholder="Eg. Computer Science" error={errors.fieldOfStudy?.message} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label tooltip="Expected or actual year of graduation.">Graduation Year</Label>
                                                            <SelectController name="graduationYear" control={control} error={errors.graduationYear?.message} placeholder="Select Year">
                                                                {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
                                                                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                                                ))}
                                                            </SelectController>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="Years of programming experience.">Coding Experience</Label>
                                                        <SelectController name="experienceLevel" control={control} error={errors.experienceLevel?.message} placeholder="Select Experience">
                                                            <SelectItem value="beginner">Beginner (&lt; 1 year)</SelectItem>
                                                            <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                                                            <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                                                            <SelectItem value="expert">Expert (5+ years)</SelectItem>
                                                        </SelectController>
                                                    </div>
                                                </div>
                                            )}

                                            {/* STEP 4: SKILLS */}
                                            {currentStep === 4 && (
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <Label tooltip="Your main area of expertise.">Primary Role</Label>
                                                        <SelectController name="primarySkill" control={control} error={errors.primarySkill?.message} placeholder="What do you do best?">
                                                            <SelectItem value="frontend">Frontend Developer</SelectItem>
                                                            <SelectItem value="backend">Backend Developer</SelectItem>
                                                            <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                                                            <SelectItem value="mobile">Mobile Developer</SelectItem>
                                                            <SelectItem value="ml-ai">ML/AI Engineer</SelectItem>
                                                            <SelectItem value="data">Data Scientist</SelectItem>
                                                            <SelectItem value="devops">DevOps Engineer</SelectItem>
                                                            <SelectItem value="designer">UI/UX Designer</SelectItem>
                                                            <SelectItem value="product">Product Manager</SelectItem>
                                                        </SelectController>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="Languages you are comfortable with.">Languages & Tools</Label>
                                                        <Input {...register("programmingLanguages")} placeholder="Eg. Python, JS, React (Comma separated)" error={errors.programmingLanguages?.message} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label tooltip="Link to your GitHub profile.">GitHub URL</Label>
                                                        <Input {...register("github")} placeholder="https://github.com/..." error={errors.github?.message} />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <Label tooltip="Link to your LinkedIn profile.">LinkedIn URL</Label>
                                                            <Input {...register("linkedin")} placeholder="https://linkedin.com/in/..." error={errors.linkedin?.message} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label tooltip="Link to your personal website (optional).">Portfolio URL (Optional)</Label>
                                                            <Input {...register("portfolio")} placeholder="https://..." error={errors.portfolio?.message} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* STEP 5: TEAM */}
                                            {currentStep === 5 && (
                                                <div className="space-y-6">
                                                    <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 flex gap-4">
                                                        <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                                                        <div className="text-sm">
                                                            <h4 className="font-bold text-amber-200 mb-1">Important for Teams</h4>
                                                            <p className="text-amber-100/70 leading-relaxed">Each member must submit their own individual application. You will be able to form/join teams on Discord or via the dashboard later.</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label tooltip="Do you have a team or are you looking for one?">Team Preference</Label>
                                                        <SelectController name="teamPreference" control={control} error={errors.teamPreference?.message} placeholder="Select Status">
                                                            <SelectItem value="solo">Solo Hacker</SelectItem>
                                                            <SelectItem value="have-team">I have a team</SelectItem>
                                                            <SelectItem value="looking-for-team">Looking for teammates</SelectItem>
                                                        </SelectController>
                                                    </div>

                                                    {teamPreference === "have-team" && (
                                                        <div className="space-y-2">
                                                            <Label tooltip="Your team's name if you have one.">Team Name (Tentative)</Label>
                                                            <Input {...register("teamName")} placeholder="Eg. NullPointers" />
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* STEP 6: MOTIVATION */}
                                            {currentStep === 6 && (
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <Label tooltip="Why do you want to participate in Incepta?">Why do you want to join INCEPTA?</Label>
                                                        <textarea
                                                            {...register("motivation")}
                                                            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                                            placeholder="Tell us what drives you..."
                                                        />
                                                        {errors.motivation && <p className="text-rose-400 text-xs">{errors.motivation.message}</p>}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label tooltip="Where did you find out about Incepta?">How did you hear about us?</Label>
                                                        <SelectController name="hearAboutUs" control={control} error={errors.hearAboutUs?.message} placeholder="Select Source">
                                                            <SelectItem value="social-media">Social Media</SelectItem>
                                                            <SelectItem value="friend">Friend / Referral</SelectItem>
                                                            <SelectItem value="university">University</SelectItem>
                                                            <SelectItem value="community">Tech Community</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectController>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <Label tooltip="For your swag in case we can ship it!">T-Shirt Size</Label>
                                                            <SelectController name="tShirtSize" control={control} error={errors.tShirtSize?.message} placeholder="Select Size">
                                                                <SelectItem value="xs">XS</SelectItem>
                                                                <SelectItem value="s">S</SelectItem>
                                                                <SelectItem value="m">M</SelectItem>
                                                                <SelectItem value="l">L</SelectItem>
                                                                <SelectItem value="xl">XL</SelectItem>
                                                                <SelectItem value="xxl">XXL</SelectItem>
                                                            </SelectController>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label tooltip="Any food allergies or preferences?">Dietary Restrictions</Label>
                                                            <Input {...register("dietaryRestrictions")} placeholder="Eg. Vegetarian" />
                                                        </div>
                                                    </div>

                                                    <div className="pt-4 border-t border-white/10 space-y-4">
                                                        <label className="flex items-start gap-3 cursor-pointer group">
                                                            <input type="checkbox" {...register("agreeCodeOfConduct")} className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-offset-0 focus:ring-0" />
                                                            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                                                I adhere to the <Link href="/conduct" target="_blank" className="text-cyan-400 hover:underline">Code of Conduct</Link>.
                                                            </span>
                                                        </label>
                                                        {errors.agreeCodeOfConduct && <p className="text-rose-400 text-xs">Required</p>}

                                                        <label className="flex items-start gap-3 cursor-pointer group">
                                                            <input type="checkbox" {...register("agreeTerms")} className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-offset-0 focus:ring-0" />
                                                            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                                                I agree to the <Link href="/terms" target="_blank" className="text-cyan-400 hover:underline">Terms & Conditions</Link> and Privacy Policy.
                                                            </span>
                                                        </label>
                                                        {errors.agreeTerms && <p className="text-rose-400 text-xs">Required</p>}
                                                    </div>
                                                </div>
                                            )}

                                            {/* STEP 7: PAYMENT */}
                                            {currentStep === 7 && (
                                                <div className="space-y-8">
                                                    {paymentSubmitted ? (
                                                        <div className="text-center py-10">
                                                            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                                <Check className="w-12 h-12 text-emerald-400" />
                                                            </div>
                                                            <h3 className="text-2xl font-bold text-white mb-2">Registration Complete!</h3>
                                                            <p className="text-slate-400 mb-8">We have received your application and payment details.</p>
                                                            <Link href="/profile" className="inline-block px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all">
                                                                Go to Profile
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 text-center">
                                                                <div className="text-sm text-cyan-200 uppercase tracking-widest font-bold mb-2">Registration Fee</div>
                                                                <div className="text-5xl font-black text-white mb-2">₹60</div>
                                                                <div className="text-slate-400 text-sm">Non-refundable • Secure Payment</div>
                                                            </div>

                                                            <div className="space-y-4">
                                                                <h4 className="font-bold text-white flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">1</div>
                                                                    Pay Securely
                                                                </h4>

                                                                <p className="text-sm text-slate-400">
                                                                    You will be redirected to Instamojo to complete the payment of <strong>₹60</strong>.
                                                                </p>

                                                                <button
                                                                    type="button"
                                                                    onClick={handlePaymentInitiation}
                                                                    disabled={isSubmitting}
                                                                    className="block w-full py-4 bg-[#3395ff] hover:bg-[#2884e6] text-white font-bold rounded-xl text-center transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                                >
                                                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay Now with Instamojo"}
                                                                </button>
                                                            </div>

                                                            {/* Hidden Transaction ID field for manual override if needed */}
                                                            {!paymentSubmitted && (
                                                                <div className="pt-8 mt-8 border-t border-white/5">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setShowManualPayment(!showManualPayment)}
                                                                        className="text-xs text-slate-500 hover:text-slate-300 underline"
                                                                    >
                                                                        Verify manually with Transaction ID?
                                                                    </button>

                                                                    {showManualPayment && (
                                                                        <div className="space-y-4 mt-4 animate-in fade-in slide-in-from-top-2">
                                                                            <h4 className="font-bold text-white flex items-center gap-2">
                                                                                Enter Transaction ID Manually
                                                                            </h4>
                                                                            <Input
                                                                                value={transactionId}
                                                                                onChange={(e) => setTransactionId(e.target.value)}
                                                                                placeholder="Eg. MOJO8a01N05..."
                                                                            />
                                                                            <p className="text-xs text-slate-500">
                                                                                Paste the Payment ID from your Instamojo receipt.
                                                                            </p>
                                                                            <button
                                                                                type="button"
                                                                                onClick={handlePaymentSubmit} // Calls the manual submission logic
                                                                                disabled={!transactionId || isSubmitting}
                                                                                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                                                                            >
                                                                                Verify Transaction ID
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}




                                                        </>
                                                    )}
                                                </div>
                                            )}

                                            {/* Navigation Buttons */}
                                            {!paymentSubmitted && (
                                                <div className="flex gap-4 pt-6 border-t border-white/5 mt-8">
                                                    {currentStep > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={prevStep}
                                                            className="px-6 py-3 rounded-xl font-semibold text-white bg-white/5 hover:bg-white/10 transition-all"
                                                        >
                                                            Back
                                                        </button>
                                                    )}
                                                    {currentStep < 7 ? (
                                                        <button
                                                            type="button"
                                                            onClick={nextStep}
                                                            className="flex-1 px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2"
                                                        >
                                                            Next Step <ChevronRight className="w-4 h-4" />
                                                        </button>
                                                    ) : (
                                                        !paymentSubmitted && currentStep !== 7 && (
                                                            <button type="submit">Submit</button>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                        </motion.div>
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

// Subcomponents
function Label({ children, tooltip }: { children: React.ReactNode, tooltip?: string }) {
    return (
        <label className="block text-sm font-semibold text-slate-300 mb-1.5 ml-1 flex items-center gap-2">
            {children}
            {tooltip && (
                <div className="group relative">
                    <Info className="w-3.5 h-3.5 text-slate-500 hover:text-cyan-400 transition-colors cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl text-xs text-slate-300 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                        {tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/95" />
                    </div>
                </div>
            )}
        </label>
    )
}

function Input({ className, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
    return (
        <div className="relative">
            <input
                className={`w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all ${className}`}
                {...props}
            />
            {error && <p className="text-rose-400 text-xs mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
        </div>
    )
}

// FIX: Added bg-slate-950 to SelectContent to remove transparency
function SelectController({ name, control, children, error, placeholder }: any) {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <SelectTrigger className="w-full bg-black/20 border-white/10 text-white rounded-xl h-[50px]">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-white/10 text-white">
                            {children}
                        </SelectContent>
                    </Select>
                )}
            />
            {error && <p className="text-rose-400 text-xs mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
        </div>
    )
}

export default function ApplyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
        }>
            <ApplyPageContent />
        </Suspense>
    );
}
