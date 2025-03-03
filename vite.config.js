import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/

export default defineConfig(async () => {
    return {
        server: {
            port: 3001,
        },
        preview: {
            port: 3001,
        },
        build: {
            outDir: "dist",
            emptyOutDir: true,
            // Added optimizations
            minify: "esbuild", // Faster minification with esbuild (default), can use 'terser' for smaller output
            sourcemap: false, // Disable in production for smaller builds (enable if needed for debugging)
            target: "esnext", // Target modern browsers for smaller bundles
            chunkSizeWarningLimit: 1000, // Increase limit (in kB) to reduce chunk warnings
            rollupOptions: {
                output: {
                    manualChunks: {
                        "material-ui": [
                            "@mui/material",
                            "@emotion/react",
                            "@emotion/styled",
                            "framer-motion",
                            "lucide-react",
                        ],
                        headlessui: ["@headlessui/react"],
                        "redux-toolkit": ["@reduxjs/toolkit"],
                        react: [
                            "react",
                            "react-redux",
                            "react-hot-toast",
                            "react-dom",
                            "react-cookie",
                            "react-router-dom",
                        ],
                    },
                    chunkFileNames: "assets/[name]-[hash].js",
                    entryFileNames: "assets/[name]-[hash].js",
                    assetFileNames: "assets/[name]-[hash].[ext]",
                    // Added optimization for better chunk splitting
                    compact: true, // Minify output by removing unnecessary whitespace
                },
                // Added optimization for better tree-shaking
                treeshake: {
                    preset: "recommended",
                    moduleSideEffects: false, // Assume external modules have no side effects
                },
            },
        },
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };
});
