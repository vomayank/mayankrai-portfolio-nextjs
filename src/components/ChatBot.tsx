"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    typing?: boolean;
}

const botResponses: Record<string, string> = {
    "hi": "Hey there! I'm Mayank's AI assistant. Ask me about his skills, experience, or projects!",
    "hello": "Hello! Great to meet you. I can tell you about Mayank's work with AI systems, microservices, or his tech stack.",
    "skills": "Mayank specializes in: Golang, Node.js/NestJS, Python, AWS, Kafka, Redis, PostgreSQL, MongoDB, and AI/LLM integrations. He's built systems processing 100K+ events daily!",
    "experience": "7+ years of experience! Currently at Prayog.io building AI-driven CRM platforms. Previously at Shree Maruti, Delcaper Technologies, and delivered government platforms serving 1M+ users.",
    "projects": "Key projects include: AI-powered sales automation (40% ops reduction), unified microservices platform with one-click deployment, event-driven pipelines with Kafka, and RAG-based agent systems.",
    "contact": "You can reach Mayank at: vomayank@gmail.com, LinkedIn: /in/vomayank, GitHub: @vomayank, or Twitter/X: @vomayank",
    "tech": "Tech stack: Golang (Gin), Node.js (NestJS), Python (FastAPI), AWS (Lambda, SQS, S3), Kafka, Redis, PostgreSQL, MongoDB, Docker, OpenTelemetry, and LLM/RAG systems.",
    "ai": "Mayank builds AI agent systems, LLM integrations, RAG pipelines, and workflow automation. He's passionate about autonomous systems that reduce manual operations.",
    "hire": "Mayank is open to exciting opportunities! He's especially interested in AI/ML engineering, distributed systems, and backend architecture roles. Check out the contact section!",
    "coffee": "☕ Mayank runs on chai and code! Fun fact: He believes the best debugging happens after midnight.",
    "fun": "When not coding, you'll find Mayank exploring new AI tools, contributing to open source, or thinking about how to automate everything!",
};

const defaultResponses = [
    "Interesting question! Mayank works on distributed systems, AI agents, and cloud infrastructure. Want to know more about any specific area?",
    "I'd love to help! Try asking about skills, experience, projects, or how to contact Mayank.",
    "That's a great topic! Mayank's expertise spans backend engineering, AI systems, and DevOps. What interests you most?",
];

export default function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 0, text: "Hey! I'm Mayank's AI assistant. Ask me anything about his skills, experience, or projects! 🚀", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = (userMessage: string): string => {
        const lowered = userMessage.toLowerCase();

        for (const [key, response] of Object.entries(botResponses)) {
            if (lowered.includes(key)) {
                return response;
            }
        }

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            isBot: false,
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate typing delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        const botMessage: Message = {
            id: Date.now() + 1,
            text: getBotResponse(input),
            isBot: true,
        };

        setIsTyping(false);
        setMessages(prev => [...prev, botMessage]);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-[#0d1117] rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl shadow-cyan-500/10">
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-white/5 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-sm text-gray-300">mayank-ai-assistant</span>
                    <span className="ml-auto text-xs text-gray-500">Online</span>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.isBot
                                            ? "bg-white/5 text-gray-200 rounded-tl-sm"
                                            : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-tr-sm"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.span
                                            key={i}
                                            className="w-2 h-2 bg-cyan-400 rounded-full"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about skills, experience, projects..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25"
                        >
                            Send
                        </motion.button>
                    </div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {["Skills", "Experience", "Projects", "Contact"].map((suggestion) => (
                            <button
                                key={suggestion}
                                type="button"
                                onClick={() => setInput(suggestion.toLowerCase())}
                                className="px-3 py-1 text-xs bg-white/5 text-gray-400 rounded-full hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
}
