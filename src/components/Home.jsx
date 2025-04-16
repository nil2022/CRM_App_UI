import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";

export function Home() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen bg-zinc-900 text-white mt-10 ">
            <section className=" relative w-full min-h-screen bg-gray-800 text-white flex flex-col items-center overflow-hidden">
                {/* Gradient backgrounds */}
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-300/20 blur-[120px] rounded-full z-0" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-300/20 blur-[120px] rounded-full z-0" />

                <div className="mt-10 relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-20">
                    {/* Left content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                            Got Customer Queries?
                            <br />
                            <span className="relative inline-block">
                                We Solve Them.
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-purple-500 rounded-full" />
                            </span>
                        </h1>

                        <p className="text-gray-300 text-lg max-w-lg">
                            Complaints Resolved, Trust Restored. Your
                            Satisfaction,
                        </p>

                        {!authStatus && (
                            <Link
                                onClick={() =>
                                    setTimeout(() => navigate("/register"), 500)
                                }
                                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-black font-semibold px-6 py-3 text-md transition-all hover:bg-violet-600 hover:text-white hover:scale-105 hover:shadow-lg ring-violet-400 hover:ring-4"
                            >
                                Register Now
                                <ArrowRight size={18} />
                            </Link>
                        )}
                    </div>

                    {/* Right image */}
                    <div className="relative flex justify-center items-center">
                        {/* Radial Gradient Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle, rgba(128, 0, 128, 0.7), rgba(75, 0, 130, 0.5))] opacity-50 rounded-2xl z-0" />

                        {/* Main image with hover effect */}
                        <img
                            src="/hero-main.jpg"
                            alt="Dashboard"
                            className="rounded-2xl shadow-xl w-full max-w-lg transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl hover:rotate-2 z-10"
                        />
                    </div>
                </div>
                <div className="py-20 px-4 sm:px-6 lg:px-20 relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                        Why Choose Us?
                    </h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Real-time Issue Tracking",
                                desc: "Track your tickets and updates instantly with full transparency.",
                                icon: "📍",
                            },
                            {
                                title: "Lightning Fast Support",
                                desc: "Our system ensures faster complaint resolution with direct feedback.",
                                icon: "⚡",
                            },
                            {
                                title: "Secure and Reliable",
                                desc: "We keep your information safe with end-to-end encryption.",
                                icon: "🔐",
                            },
                            {
                                title: "User Friendly Interface",
                                desc: "A seamless and modern interface designed to be intuitive for everyone.",
                                icon: "🖥️",
                            },
                            {
                                title: "Notifications & Alerts",
                                desc: "Get timely updates on complaint status with email & in-app notifications.",
                                icon: "🔔",
                            },
                            {
                                title: "Scalable for Any Team",
                                desc: "Perfect for individual landlords or businesses with multiple users.",
                                icon: "📈",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="p-6 bg-zinc-700 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
