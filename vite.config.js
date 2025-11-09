// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => {
    return {
        // If your app is served from the project root on Vercel, use '/'
        // If you need relative assets (e.g. opening index.html locally), use './'
        base: "/",

        server: {
            port: 3001,
        },

        preview: {
            port: 3001,
        },

        build: {
            outDir: "dist",
            emptyOutDir: true,
            // Keep modern minifier; change to 'terser' only if you need better compressions
            minify: "esbuild",
            // Enable while debugging production-only issues; set to false for final prod
            sourcemap: true,
            // Slightly safer target to avoid SyntaxErrors in older runtimes
            target: "es2017",
            // Default chunking/rollup behavior (no manualChunks)
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    chunkFileNames: "assets/[name]-[hash].js",
                    entryFileNames: "assets/[name]-[hash].js",
                    assetFileNames: "assets/[name]-[hash].[ext]",
                    compact: true,
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
