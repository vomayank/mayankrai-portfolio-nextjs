"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "Golang", icon: "🔵", angle: 0 },
    { name: "Node.js", icon: "💚", angle: 45 },
    { name: "AI/LLM", icon: "🤖", angle: 90 },
    { name: "AWS", icon: "☁️", angle: 135 },
    { name: "Kafka", icon: "⚡", angle: 180 },
    { name: "Docker", icon: "🐳", angle: 225 },
    { name: "Python", icon: "🐍", angle: 270 },
    { name: "Redis", icon: "🔴", angle: 315 },
];

export default function FloatingSkills() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {skills.map((skill, i) => (
                <motion.div
                    key={skill.name}
                    className="absolute left-1/2 top-1/2 pointer-events-auto"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: [0, 360],
                    }}
                    transition={{
                        opacity: { delay: 0.5 + i * 0.1, duration: 0.5 },
                        scale: { delay: 0.5 + i * 0.1, duration: 0.5, type: "spring" },
                        rotate: {
                            duration: 30 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0
                        },
                    }}
                    style={{
                        transformOrigin: "center center",
                    }}
                >
                    <motion.div
                        className="absolute"
                        style={{
                            x: Math.cos((skill.angle * Math.PI) / 180) * 220 - 40,
                            y: Math.sin((skill.angle * Math.PI) / 180) * 220 - 20,
                        }}
                        whileHover={{ scale: 1.3 }}
                        animate={{
                            y: [
                                Math.sin((skill.angle * Math.PI) / 180) * 220 - 20,
                                Math.sin((skill.angle * Math.PI) / 180) * 220 - 30,
                                Math.sin((skill.angle * Math.PI) / 180) * 220 - 20,
                            ],
                        }}
                        transition={{
                            y: {
                                duration: 2 + i * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                    >
                        <div className="px-3 py-2 bg-[#0d1117]/90 backdrop-blur-sm border border-cyan-500/30 rounded-full flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-default hover:border-cyan-400 hover:shadow-cyan-400/40 transition-all">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="text-xs font-mono text-cyan-400 whitespace-nowrap">{skill.name}</span>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}
