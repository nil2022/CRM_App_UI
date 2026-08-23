import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    ArrowRight,
    Sparkles,
    Shield,
    Zap,
    Bell,
    Users,
    BarChart3,
    Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Real-time Issue Tracking",
        desc: "Track your tickets and updates instantly with full transparency.",
        icon: Clock,
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Lightning Fast Support",
        desc: "Our system ensures faster complaint resolution with direct feedback.",
        icon: Zap,
        color: "from-yellow-500 to-orange-500",
    },
    {
        title: "Secure and Reliable",
        desc: "We keep your information safe with end-to-end encryption.",
        icon: Shield,
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "User Friendly Interface",
        desc: "A seamless and modern interface designed to be intuitive for everyone.",
        icon: BarChart3,
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Notifications & Alerts",
        desc: "Get timely updates on complaint status with email & in-app notifications.",
        icon: Bell,
        color: "from-red-500 to-rose-500",
    },
    {
        title: "Scalable for Any Team",
        desc: "Perfect for individual landlords or businesses with multiple users.",
        icon: Users,
        color: "from-indigo-500 to-purple-500",
    },
];

export function Home() {
    const authStatus = useSelector((state) => state.auth.status);

    return (
        <div className="relative w-full min-h-screen bg-slate-950 text-white overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 grid-pattern opacity-20" />

                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px]"
                />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                        {/* Left content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.7,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                            className="space-y-8"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20"
                            >
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-medium text-purple-300">
                                    Trusted by 10,000+ users
                                </span>
                            </motion.div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                                Got Customer Queries?
                                <br />
                                <span className="relative inline-block mt-2">
                                    <span className="gradient-text">
                                        We Solve Them.
                                    </span>
                                    <motion.span
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{
                                            delay: 0.8,
                                            duration: 0.6,
                                        }}
                                        className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                    />
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                                Complaints Resolved, Trust Restored. Experience
                                a new era of customer relationship management
                                with our powerful, intuitive platform.
                            </p>

                            {/* CTA Buttons */}
                            {!authStatus && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <Link
                                        to="/register"
                                        className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            boxShadow:
                                                "0 4px 20px rgba(102, 126, 234, 0.4)",
                                        }}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Sparkles className="w-5 h-5" />
                                            Get Started Free
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                                            }}
                                        />
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                    >
                                        Sign In
                                    </Link>
                                </motion.div>
                            )}

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="flex gap-8 pt-4"
                            >
                                {[
                                    { value: "10K+", label: "Active Users" },
                                    { value: "99.9%", label: "Uptime" },
                                    { value: "24/7", label: "Support" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-2xl font-bold gradient-text">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right - Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{
                                duration: 0.7,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                            className="relative flex justify-center items-center"
                        >
                            {/* Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />

                            {/* Floating Image */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30" />
                                <img
                                    src="/hero-main.jpg"
                                    alt="Dashboard Preview"
                                    className="relative rounded-2xl shadow-2xl w-full max-w-lg border border-white/10"
                                />

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5,
                                    }}
                                    className="absolute -right-4 top-10 glass-card-dark p-4 rounded-xl shadow-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">
                                                Quick Resolution
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                Avg. 2hrs response
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Floating Stats */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1,
                                    }}
                                    className="absolute -left-4 bottom-10 glass-card-dark p-4 rounded-xl shadow-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">
                                                +2,500
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                Tickets resolved
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-24">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            Everything You Need to{" "}
                            <span className="gradient-text">Succeed</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
                            Powerful features designed to streamline your
                            customer support workflow
                        </p>
                    </motion.div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.1,
                                    }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="group glass-card-dark p-6 rounded-2xl cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div
                                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} p-0.5 mb-5`}
                                    >
                                        <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>

                                    {/* Hover Arrow */}
                                    <div className="mt-4 flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-sm font-medium">
                                            Learn more
                                        </span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-24">
                <div className="max-w-4xl mx-auto px-6 md:px-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative glass-card-dark p-10 md:p-16 rounded-3xl text-center overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Transform Your Support?
                            </h2>
                            <p className="text-gray-400 max-w-xl mx-auto mb-8">
                                Join thousands of businesses already using CRM
                                Pro to deliver exceptional customer experiences.
                            </p>
                            {!authStatus && (
                                <Link
                                    to="/register"
                                    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        boxShadow:
                                            "0 4px 20px rgba(102, 126, 234, 0.4)",
                                    }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start Your Free Trial
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                                        }}
                                    />
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
