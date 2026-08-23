import { ArrowRight, User, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import authService from "../server/auth";
import { Backdrop, CircularProgress } from "@mui/material";
import CustomizedSnackbars from "./SnackbarComponent";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const cookieOptions = {
    path: "/",
    httpOnly: false,
    secure: true,
    sameSite: "lax",
};

export default function Signin() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [error, setError] = useState("");
    const [, setCookie, removeCookie] = useCookies([
        "accessToken",
        "refreshToken",
    ]);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const login = async (data) => {
        setError("");
        setSuccessMsg("");
        try {
            setOpen(true);
            const userSession = await authService.login(data);
            dispatch(authLogin(userSession.data?.user));
            if (userSession) {
                toast(userSession?.message, {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });

                localStorage.setItem(
                    "accessToken",
                    userSession.data?.accessToken || null
                );
                localStorage.setItem(
                    "refreshToken",
                    userSession.data?.refreshToken || null
                );
                localStorage.setItem("userStatus", JSON.stringify(true));
                setCookie(
                    "accessToken",
                    userSession.data?.accessToken || null,
                    cookieOptions
                );
                setCookie(
                    "refreshToken",
                    userSession.data?.refreshToken || null,
                    cookieOptions
                );
                await authService.getCurrentUser(
                    userSession.data?.accessToken || null
                );
                setOpen(false);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 500);
            }
        } catch (err) {
            setOpen(false);
            setError(err.response?.data?.message || err.message);
            console.log(
                "Login error ::",
                err.response?.data?.message || err.message
            );
        }
    };

    useEffect(() => {
        if (!authStatus) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("allUsers");
            localStorage.removeItem("userStatus");
            removeCookie("accessToken", cookieOptions);
            removeCookie("refreshToken", cookieOptions);
        }
    }, []);

    return (
        <>
            <section className="relative min-h-screen overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 grid-pattern opacity-30" />

                    {/* Gradient Orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]"
                    />
                </div>

                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                {successMsg && (
                    <CustomizedSnackbars
                        severity="success"
                        message={successMsg}
                        setOpenSnackbar={true}
                    />
                )}
                {error && (
                    <CustomizedSnackbars
                        severity="error"
                        message={error}
                        setOpenSnackbar={true}
                    />
                )}

                <div className="relative flex items-center justify-center min-h-screen py-12 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="w-full max-w-md mt-16"
                    >
                        {/* Main Card */}
                        <div className="glass-card-dark p-8 sm:p-10 shadow-2xl shadow-purple-500/10">
                            {/* Logo */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                }}
                                className="mb-6 flex justify-center"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
                                    <img
                                        src="/login.png"
                                        className="relative rounded-full border-2 border-white/20"
                                        width={70}
                                        alt="login_Page_image"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-center mb-8"
                            >
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    Welcome Back
                                </h2>
                                <p className="text-gray-400">
                                    Sign in to access your dashboard
                                </p>
                            </motion.div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit(login)}
                                className="space-y-5"
                            >
                                {/* Username Input */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Username
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            autoComplete="userId"
                                            placeholder="Enter your username"
                                            {...register("userId", {
                                                required: true,
                                                minLength: 3,
                                            })}
                                            className="input-premium input-with-icon"
                                        />
                                    </div>
                                </motion.div>

                                {/* Password Input */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                        </div>
                                        <input
                                            type={
                                                passwordVisible
                                                    ? "text"
                                                    : "password"
                                            }
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            {...register("password", {
                                                required: true,
                                            })}
                                            className="input-premium input-with-icon pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-400 transition-colors"
                                        >
                                            {passwordVisible ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="pt-2"
                                >
                                    <button
                                        type="submit"
                                        className="group relative w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white overflow-hidden transition-all duration-300"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                            boxShadow:
                                                "0 4px 20px rgba(102, 126, 234, 0.4)",
                                        }}
                                    >
                                        <span className="relative z-10 flex items-center gap-2 text-lg">
                                            <Sparkles className="w-5 h-5" />
                                            Sign In
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                                            }}
                                        />
                                    </button>
                                </motion.div>
                            </form>

                            {/* Register Link */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-8 text-center"
                            >
                                <p className="text-gray-400">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                                    >
                                        Register Now
                                    </Link>
                                </p>
                            </motion.div>
                        </div>

                        {/* Bottom Glow */}
                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </section>
        </>
    );
}
