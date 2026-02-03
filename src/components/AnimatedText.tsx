"use client";

import { motion, Variants } from "framer-motion";

const textVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
        },
    },
};

const letterVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: -90,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 200,
        },
    },
};

interface AnimatedTextProps {
    text: string;
    className?: string;
}

export default function AnimatedText({ text, className = "" }: AnimatedTextProps) {
    return (
        <motion.span
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className={`inline-block ${className}`}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}
