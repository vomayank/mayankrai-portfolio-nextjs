"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface CounterProps {
    value: string;
    duration?: number;
}

export default function AnimatedCounter({ value, duration = 2 }: CounterProps) {
    const [displayValue, setDisplayValue] = useState("0");
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        // Extract numeric part and suffix
        const numericMatch = value.match(/^([\d.]+)(.*)$/);
        if (!numericMatch) {
            setDisplayValue(value);
            return;
        }

        const targetNum = parseFloat(numericMatch[1]);
        const suffix = numericMatch[2];
        const startTime = Date.now();
        const durationMs = duration * 1000;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / durationMs, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = targetNum * eased;

            if (Number.isInteger(targetNum)) {
                setDisplayValue(Math.floor(current) + suffix);
            } else {
                setDisplayValue(current.toFixed(1) + suffix);
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
            {displayValue}
        </motion.span>
    );
}
