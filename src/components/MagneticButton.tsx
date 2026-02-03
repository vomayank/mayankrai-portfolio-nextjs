"use client";

import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

export default function MagneticButton({ children, href, className = "" }: MagneticButtonProps) {
    return (
        <motion.a
            href={href}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 0 50px rgba(0,240,255,0.5), 0 0 100px rgba(176,38,255,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className={`relative overflow-hidden group ${className}`}
        >
            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["0%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Glow pulse */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    background: "radial-gradient(circle at center, rgba(0,240,255,0.3), transparent 70%)",
                }}
            />

            {children}
        </motion.a>
    );
}
