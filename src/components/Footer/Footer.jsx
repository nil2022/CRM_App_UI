import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <Box
            component="footer"
            className="w-full py-6 px-4 sm:px-10 bg-gray-800  text-white"
        >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left Section */}
                <div className="text-center sm:text-left text-sm">
                    © 2024{" "}
                    <span className="font-semibold text-white">CRM</span>. All
                    rights reserved.
                </div>

                {/* Right Section */}
                <div className="flex flex-wrap justify-center sm:justify-end gap-3 text-sm">
                    <FooterLink to="#">Privacy Policy</FooterLink>
                    <FooterLink to="#">Terms & Conditions</FooterLink>
                    <FooterLink to="#">Contact Us</FooterLink>
                </div>
            </div>
        </Box>
    );
}

// Separate FooterLink for better styling
function FooterLink({ to, children }) {
    return (
        <Link
            to={to}
            className="px-3 py-1 hover:text-white hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out rounded-md hover:bg-white/10"
        >
            {children}
        </Link>
    );
}
