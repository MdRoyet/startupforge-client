"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- Framer Motion Variants ---
const backgroundVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const floatVariants1 = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatVariants2 = {
  initial: { y: 0 },
  animate: {
    y: [15, -15, 15],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
  },
};

const floatVariants3 = {
  initial: { y: 0 },
  animate: {
    y: [-12, 12, -12],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 },
  },
};

const Banner = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* --- BACKGROUND IMAGE & OVERLAYS --- */}
      <motion.div
        className="absolute inset-0 z-0"
        initial="hidden"
        animate="visible"
        variants={backgroundVariants}
      >
        {/* High-quality Unsplash image representing a modern startup/tech team */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2850&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />

        {/* Complex Gradient Overlays for depth and text readability */}
        <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent w-full md:w-3/4" />

        {/* Animated ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] mix-blend-screen" />
      </motion.div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Column: Text & CTAs */}
        <motion.div
          className="w-full lg:w-3/5 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold text-slate-300 tracking-wide">
              The #1 Platform for Startup Builders
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6"
          >
            Forge Your Dream <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Team & Build The Future.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
          >
            StartupForge connects visionary founders with elite developers,
            designers, and marketers. Post your ideas, recruit collaborators,
            and turn ambitious concepts into reality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <Link
              href="/register"
              className="relative group w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl text-white font-bold overflow-hidden shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-500 group-hover:to-purple-500 transition-colors" />
              <span className="relative z-10 flex items-center gap-2 text-lg">
                Start Building Free
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/opportunities"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl text-white font-bold bg-slate-800/40 border border-slate-700/50 backdrop-blur-md hover:bg-slate-800/80 hover:border-slate-600 transition-all hover:scale-105 active:scale-95"
            >
              <span className="text-lg flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Browse Opportunities
              </span>
            </Link>
          </motion.div>

          {/* Social Proof / Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-8 border-t border-slate-800/60 w-full max-w-xl"
          >
            {/* Avatar Group */}
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full border-2 border-slate-950 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=32" alt="User" />
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-950 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=12" alt="User" />
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-950 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=47" alt="User" />
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-950 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=5" alt="User" />
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                +2k
              </div>
            </div>

            <div className="flex flex-col text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-400 font-medium">
                Trusted by 10,000+ Founders & Creators
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Floating Industrial Mockup Cards */}
        <div className="hidden lg:flex w-2/5 relative h-[500px] items-center justify-center">
          {/* Decorative Background Ring */}
          <div className="absolute w-[450px] h-[450px] border border-slate-700/30 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-[300px] h-[300px] border border-slate-700/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

          {/* Floating Card 1: New Opportunity */}
          <motion.div
            className="absolute top-10 right-0 w-72 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl shadow-black/50"
            variants={floatVariants1}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  New Opening
                </p>
                <p className="text-sm font-bold text-white">
                  Lead React Developer
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-3/4 rounded-full" />
              </div>
              <p className="text-xs text-slate-400 text-right">
                Equity + Salary
              </p>
            </div>
          </motion.div>

          {/* Floating Card 2: Candidate Match */}
          <motion.div
            className="absolute top-1/2 -left-12 -translate-y-1/2 w-64 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl shadow-black/50 z-20"
            variants={floatVariants2}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Top Match
              </p>
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold border border-green-500/30">
                98% Fit
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-700">
                <img src="https://i.pravatar.cc/150?img=44" alt="Candidate" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Sarah Jenkins</p>
                <p className="text-xs text-slate-400">Senior UX/UI Designer</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300">
                Figma
              </span>
              <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300">
                Prototyping
              </span>
            </div>
          </motion.div>

          {/* Floating Card 3: Startup Funding / Success */}
          <motion.div
            className="absolute bottom-12 right-10 w-72 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl shadow-black/50"
            variants={floatVariants3}
            initial="initial"
            animate="animate"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Milestone
                  </p>
                  <p className="text-sm font-bold text-white">
                    Seed Round Raised
                  </p>
                </div>
              </div>
            </div>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              $1,250,000
            </p>
            <p className="text-xs text-slate-400 mt-1">
              EcoTech Solutions Inc.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade to transition smoothly into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white dark:from-base-100 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default Banner;
