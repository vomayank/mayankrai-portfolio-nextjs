"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import NeuralBackground from "@/components/NeuralBackground";
import TypeWriter from "@/components/TypeWriter";
import AnimatedCounter from "@/components/AnimatedCounter";
import TiltCard from "@/components/TiltCard";
import ChatBot from "@/components/ChatBot";
import SnakeGame from "@/components/SnakeGame";
import { FaLinkedin, FaGithub, FaYoutube, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Prayog.io · Full-time · Hybrid",
    date: "Jul 2025 - Present",
    points: [
      "Built AI-driven CRM and sales automation platforms, reducing manual sales operations by 40%",
      "Designed agent-based backend systems for workflow automation",
      "Engineered scalable backend services using Node.js (NestJS) and Golang (Gin)",
      "Built event-driven pipelines processing 100K+ events/day using Kafka, Redis, and AWS SQS",
      "Deployed and operated production infrastructure on AWS (S3, Lambda)",
    ],
    tags: ["NestJS", "Golang", "Gin", "Kafka", "AWS"],
  },
  {
    title: "Senior Software Developer",
    company: "Shree Maruti",
    date: "Dec 2023 - Present",
    points: [
      "Engineered unified microservices platform with one-click deployment across AWS and GCP",
      "Implemented distributed tracing using OpenTelemetry and Grafana observability stack",
      "Reduced API latency by 30% through async processing, caching, and query optimization",
      "Managed cloud infrastructure: Lambda, SQS, S3, EC2, Route53, CloudFront, RDS",
    ],
    tags: ["Microservices", "AWS", "GCP", "OpenTelemetry"],
  },
  {
    title: "Senior Software Developer",
    company: "Delcaper Technologies",
    date: "Apr 2023 - Nov 2023",
    points: [
      "Built scalable REST APIs using NestJS and MongoDB for enterprise clients",
      "Improved backend delivery speed by 25% through modular architecture",
      "Implemented AWS S3, Lambda, SQS, and Redis for distributed processing",
    ],
    tags: ["NestJS", "MongoDB", "AWS Lambda"],
  },
  {
    title: "Software Developer",
    company: "Government & Enterprise Platforms",
    date: "2017 - 2023",
    points: [
      "Delivered backend systems serving 1M+ users nationwide",
      "Built RESTful APIs for large-scale government and enterprise platforms",
      "Worked with Node.js, Express, React, SQL and NoSQL databases",
    ],
    tags: ["Node.js", "Express", "PostgreSQL"],
  },
];

const skills = [
  { category: "Languages & Frameworks", items: ["Golang", "Node.js", "TypeScript", "Python", "NestJS", "Gin", "FastAPI", "Express.js"], icon: "⚡" },
  { category: "Cloud & Infrastructure", items: ["AWS (S3, Lambda, SQS)", "GCP", "Docker", "CI/CD", "CloudFront", "Route53"], icon: "☁️" },
  { category: "Data & Messaging", items: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "Event-Driven", "Vector DB"], icon: "🗄️" },
  { category: "AI & Automation", items: ["LLM Integration", "RAG Systems", "Agent Architecture", "Workflow Automation", "OpenTelemetry", "Grafana"], icon: "🤖" },
];

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "100K+", label: "Daily Transactions" },
  { value: "40%", label: "Ops Reduction" },
  { value: "1M+", label: "Users Supported" },
];

const socials = [
  { icon: FaEnvelope, href: "mailto:vomayank@gmail.com", label: "Email", value: "vomayank@gmail.com" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/vomayank", label: "LinkedIn", value: "@vomayank" },
  { icon: FaGithub, href: "https://github.com/vomayank", label: "GitHub", value: "@vomayank" },
  { icon: FaXTwitter, href: "https://x.com/vomayank", label: "Twitter / X", value: "@vomayank" },
  { icon: FaYoutube, href: "https://www.youtube.com/@vomayank", label: "YouTube", value: "@vomayank" },
];

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen">
      <NeuralBackground />

      {/* Cursor Glow Effect */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)",
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
        animate={{ x: 0, y: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full px-6 py-4 flex justify-between items-center z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-cyan-500/10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="font-mono text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          ◈ mayank.dev
        </motion.div>
        <div className="hidden md:flex gap-8">
          {["About", "Experience", "Skills", "Play", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: "#00f0ff", y: -2 }}
              className="text-gray-400 text-sm font-medium transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} id="about" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500 bg-green-500/10 text-green-400 text-sm font-mono mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Agent Status: Active
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Building<br />
              <span className="gradient-text">Intelligent Systems</span><br />
              That Scale
            </h1>

            <div className="font-mono text-xl text-gray-400 mb-6 h-8">
              <TypeWriter texts={["AI Systems Architect", "Backend Engineer", "Agent Developer", "Cloud Specialist"]} />
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              Backend Software Engineer specializing in AI-driven architectures,
              microservices, and event-driven systems. 7+ years crafting autonomous
              agents and distributed platforms processing 100K+ daily transactions.
            </p>

            <div className="flex gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,240,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg shadow-cyan-500/25"
              >
                Initialize Contact →
              </motion.a>
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.05, borderColor: "#00f0ff" }}
                className="px-8 py-3 rounded-lg border border-gray-700 text-gray-300 font-semibold transition-colors"
              >
                View Protocols
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Rotating Rings */}
            {[420, 460, 500].map((size, i) => (
              <motion.div
                key={size}
                animate={{ rotate: i === 1 ? -360 : 360 }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full border-2 border-transparent"
                style={{
                  width: size,
                  height: size,
                  borderTopColor: i === 0 ? "#00f0ff" : i === 1 ? "#b026ff" : "#0aff0a",
                }}
              />
            ))}

            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-80 h-80 rounded-full overflow-hidden glow-border"
            >
              <Image
                src="/profile.jpg"
                alt="Mayank Rai"
                fill
                className="object-cover object-top"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-[#050508]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, borderColor: "#00f0ff" }}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 text-center transition-all"
            >
              <div className="text-4xl md:text-5xl font-bold font-mono gradient-text">{stat.value}</div>
              <div className="text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Mission Log</h2>
            <p className="text-gray-400">Autonomous systems deployed across enterprise environments</p>
          </motion.div>

          <div className="relative pl-8 border-l-2 border-gradient-to-b from-cyan-500 to-purple-500">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500 shadow-[0_0_10px_#00f0ff]" />

            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10, borderColor: "#00f0ff" }}
                className="relative mb-8 p-6 rounded-2xl bg-white/[0.03] border border-white/5 transition-all"
              >
                <div className="absolute -left-[41px] top-8 w-4 h-4 rounded-full bg-[#0a0a0f] border-3 border-cyan-400 shadow-[0_0_20px_#00f0ff]" />

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-cyan-400 font-mono text-sm">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400 font-mono bg-cyan-500/10 px-3 py-1 rounded-full w-fit">
                    {exp.date}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-gray-400 pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-purple-400">
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-mono text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-500/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-[#050508]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Tech Stack</h2>
            <p className="text-gray-400">Core competencies and specialized tools</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: "#b026ff" }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 transition-all"
              >
                <h3 className="text-purple-400 font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xl">{skill.icon}</span>
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(0,240,255,0.1)", borderColor: "#00f0ff", color: "#00f0ff" }}
                      className="px-3 py-1.5 text-sm bg-white/5 rounded-lg border border-transparent transition-all cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Section */}
      <section id="play" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Interactive Zone</h2>
            <p className="text-gray-400">Chat with my AI assistant or take a break with a game!</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4 text-center text-cyan-400">💬 Ask Me Anything</h3>
              <ChatBot />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4 text-center text-purple-400">🎮 Take a Break</h3>
              <SnakeGame />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#050508]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Initialize Connection</h2>
            <p className="text-gray-400 mb-12 max-w-xl mx-auto">
              Ready to collaborate on your next AI-driven project? Let&apos;s build autonomous systems together.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: "#00f0ff", boxShadow: "0 10px 40px rgba(0,240,255,0.2)" }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 transition-all flex flex-col items-center gap-3"
              >
                <social.icon className="text-3xl text-gray-400 group-hover:text-cyan-400 transition-colors" />
                <div className="text-sm text-gray-400">{social.label}</div>
                <div className="text-cyan-400 font-mono text-sm">{social.value}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-white/5 text-gray-500 text-sm">
        © 2026 Mayank Rai. Built with Next.js, Framer Motion & distributed systems.
      </footer>
    </main>
  );
}
