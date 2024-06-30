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
            rollupOptions: {
                output: {
                    // Provide each package installed in app as manual chunks to distribute in the bundler
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
                },
            },
        },
        plugins: [react()],
        resolve: {
            alias: {
                "@" : path.resolve(__dirname, "./src"),
            },
        },
    };
});
