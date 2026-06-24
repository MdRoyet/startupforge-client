"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- INLINE PURE SVG ICONS (NO EXTERNAL LIBRARIES) ---
const SvgGridPattern = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full stroke-white/5 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="industrial-grid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x="100%"
      >
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#industrial-grid)" />
  </svg>
);

const SvgTarget = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const SvgUsers = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SvgArrowRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// --- FRAMER MOTION ANIMATION SCHEMA ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function FeaturedStartups() {
  const [startups, setStartups] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEcosystemData = async () => {
      try {
        const [startupsRes, oppsRes] = await Promise.all([
          fetch("https://startupforge-server-ten.vercel.app/api/startups"),
          fetch("https://startupforge-server-ten.vercel.app/api/opportunities"),
        ]);

        const startupsJson = await startupsRes.json();
        const oppsJson = await oppsRes.json();

        if (startupsJson.success) {
          const cleanStartups = startupsJson.data.filter(
            (item, idx, self) =>
              self.findIndex((t) => t._id === item._id) === idx,
          );
          setStartups(cleanStartups.slice(0, 6));
        }

        if (oppsJson.success) {
          setOpportunities(oppsJson.data);
        }
      } catch (error) {
        console.error("Industrial metrics compilation exception:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEcosystemData();
  }, []);

  const getTeamSizeNeeded = (startupId) => {
    const directMatches = opportunities.filter(
      (op) => op.startupId === startupId,
    ).length;
    return directMatches > 0
      ? `${directMatches} Professionals`
      : "2-3 Professionals";
  };

  const cleanFounderName = (email) => {
    if (!email) return "Lead Director";
    return email
      .split("@")[0]
      .replace(/[0-9.]/g, "")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="w-full bg-[#0B1120] py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-black uppercase tracking-widest text-slate-500">
          Compiling Network Node Clusters...
        </span>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#0B1120] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <SvgGridPattern />

      {/* Ambient Glows for Glassmorphism Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Live Ecosystem Index
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
              Featured Startup Clusters
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm font-medium">
              Verified operational profiles actively requesting core
              engineering, operations, and deployment resource expansions.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-500 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg">
            ACTIVE COHORTS:{" "}
            <span className="text-cyan-400">
              {startups.length.toString().padStart(2, "0")}
            </span>{" "}
            UNITS
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {startups.map((company, index) => (
            <motion.div
              key={`${company._id}-${index}`}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="absolute top-0 right-0 border-l border-b border-white/10 bg-white/5 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider rounded-bl-lg">
                NODE_SYS #{index + 1}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                    <img
                      src={company.logo}
                      alt={`${company.startupName} identification`}
                      className="w-10 h-10 rounded-lg object-contain flex-shrink-0"
                    />
                  </div>
                  <div className="min-w-0 pr-12">
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight truncate">
                      {company.startupName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px] uppercase tracking-wider mt-1">
                      <SvgTarget />
                      <span>{company.industry}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-slate-400 font-medium mb-6 line-clamp-2 bg-white/5 p-3 rounded-lg border border-white/5 backdrop-blur-sm">
                  {company.description ||
                    "No vision roadmap document attached to system registry parameters yet."}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs font-semibold mb-5">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                    Account Overseer
                  </span>
                  <span className="text-slate-200 font-bold truncate block tracking-tight">
                    {cleanFounderName(company.founderEmail)}
                  </span>
                </div>
                <div className="space-y-0.5 border-l border-white/10 pl-4">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block flex items-center gap-1">
                    <SvgUsers /> Need Matrix
                  </span>
                  <span className="text-emerald-400 font-black block tracking-tight">
                    {getTeamSizeNeeded(company._id)}
                  </span>
                </div>
              </div>

              <Link
                href={`/opportunities?startup=${company._id}`}
                className="relative z-10 w-full py-3 bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-cyan-600 group-hover:border-cyan-600 transition-all duration-300 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-300 group-hover:text-white tracking-wide"
              >
                Inspect Open Assignments
                <SvgArrowRight />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
