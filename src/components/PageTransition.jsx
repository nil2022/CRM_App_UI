import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

const fadeIn = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

const slideInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

// Page Transition Wrapper
export const PageTransition = ({ children, className = "" }) => (
    <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger Container for lists/grids
export const StaggerContainer = ({ children, className = "" }) => (
    <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className={className}
    >
        {children}
    </motion.div>
);

// Fade In Up Animation
export const FadeInUp = ({ children, delay = 0, className = "" }) => (
    <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay }}
        className={className}
    >
        {children}
    </motion.div>
);

// Fade In Animation
export const FadeIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay }}
        className={className}
    >
        {children}
    </motion.div>
);

// Scale In Animation
export const ScaleIn = ({ children, delay = 0, className = "" }) => (
    <motion.div
        variants={scaleIn}
        initial="initial"
        animate="animate"
        transition={{ delay }}
        className={className}
    >
        {children}
    </motion.div>
);

// Slide In Left Animation
export const SlideInLeft = ({ children, delay = 0, className = "" }) => (
    <motion.div
        variants={slideInLeft}
        initial="initial"
        animate="animate"
        transition={{ delay }}
        className={className}
    >
        {children}
    </motion.div>
);

// Slide In Right Animation
export const SlideInRight = ({ children, delay = 0, className = "" }) => (
    <motion.div
        variants={slideInRight}
        initial="initial"
        animate="animate"
        transition={{ delay }}
        className={className}
    >
        {children}
    </motion.div>
);

// Hover Scale Animation Wrapper
export const HoverScale = ({ children, scale = 1.02, className = "" }) => (
    <motion.div
        whileHover={{ scale }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={className}
    >
        {children}
    </motion.div>
);

// Float Animation Wrapper
export const Float = ({ children, className = "" }) => (
    <motion.div
        animate={{
            y: [0, -10, 0],
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className={className}
    >
        {children}
    </motion.div>
);

// Pulse Glow Animation Wrapper
export const PulseGlow = ({ children, className = "" }) => (
    <motion.div
        animate={{
            boxShadow: [
                "0 0 20px rgba(139, 92, 246, 0.3)",
                "0 0 40px rgba(139, 92, 246, 0.5)",
                "0 0 20px rgba(139, 92, 246, 0.3)",
            ],
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export default PageTransition;
