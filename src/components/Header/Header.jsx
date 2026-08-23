import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BasicMenu from "../MenuDropdown";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <Box
                className="w-full flex justify-between items-center h-[70px] px-4 sm:px-6 lg:px-8"
                sx={{
                    background:
                        "linear-gradient(135deg, rgba(15, 15, 30, 0.9), rgba(25, 25, 50, 0.85))",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
                }}
            >
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                        <img
                            src="/icon-bulb.png"
                            alt="CRM Logo"
                            width={44}
                            height={44}
                            className="relative rounded-full border-2 border-white/20 shadow-lg"
                        />
                    </motion.div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-white font-bold text-lg tracking-tight">
                            CRM<span className="gradient-text">Pro</span>
                        </span>
                        <span className="text-gray-400 text-xs">
                            Customer Relations
                        </span>
                    </div>
                </Link>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {authStatus ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <BasicMenu buttonText="Menu" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2"
                        >
                            <Link
                                to="/login"
                                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 group"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    boxShadow:
                                        "0 4px 15px rgba(102, 126, 234, 0.4)",
                                }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Log in
                                </span>
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                                    }}
                                />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </Box>

            {/* Gradient Line */}
            <div
                className="h-[1px] w-full"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)",
                }}
            />
        </motion.header>
    );
}
