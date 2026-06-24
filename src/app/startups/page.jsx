"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- NATIVE INDUSTRIAL SVG ASSETS ---
const SvgGrid = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="browse-grid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x="100%"
      >
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#browse-grid)" />
  </svg>
);
const SvgLayer = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);
const SvgBriefcase = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const containerSchema = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const cardSchema = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

export default function BrowseStartupsPage() {
  const [startups, setStartups] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const compilePublicDirectory = async () => {
      try {
        // --- FIX: Append ?limit=1000 to pull all opportunities for badge counting ---
        const [startupsRes, oppsRes] = await Promise.all([
          fetch("https://startupforge-server-ten.vercel.app/api/startups"),
          fetch(
            "https://startupforge-server-ten.vercel.app/api/opportunities?limit=1000",
          ),
        ]);
        const startupsJson = await startupsRes.json();
        const oppsJson = await oppsRes.json();

        if (startupsJson.success) {
          const cleanStartups = startupsJson.data.filter(
            (item, idx, self) =>
              self.findIndex((t) => t._id === item._id) === idx,
          );
          setStartups(cleanStartups);
        }
        if (oppsJson.success) {
          setOpportunities(oppsJson.data);
        }
      } catch (err) {
        console.error("Directory aggregation anomaly:", err);
      } finally {
        setIsLoading(false);
      }
    };
    compilePublicDirectory();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-2 font-mono">
        <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
          Compiling Index Fields...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8 text-slate-800">
      <SvgGrid />

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-6 mb-12">
          <span className="text-[10px] font-mono font-bold uppercase text-blue-600 tracking-widest bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
            Ecosystem Node Directory
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-3">
            Discover Active Startups
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Inspect verified enterprise footprints and their open deployment
            roles.
          </p>
        </div>

        {/* Startups Grid Layout */}
        <motion.div
          variants={containerSchema}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {startups.map((company, index) => {
            const openAssignmentsCount = opportunities.filter(
              (o) => o.startupId === company._id,
            ).length;

            return (
              <Link
                key={`${company._id}-${index}`}
                href={`/startups/${company._id}`}
              >
                <motion.div
                  variants={cardSchema}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 12px 25px -5px rgba(148,163,184,0.18)",
                    borderColor: "rgba(15,23,42,0.3)",
                  }}
                  className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between h-64 cursor-pointer transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={company.logo}
                        alt="Identity signature"
                        className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 p-1 object-contain"
                      />
                      <div className="min-w-0">
                        <h3 className="text-lg font-black text-slate-900 leading-tight truncate">
                          {company.startupName}
                        </h3>
                        <span className="text-xs text-blue-600 font-bold tracking-tight">
                          {company.industry}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {company.description ||
                        "No corporate blueprint attached yet."}
                    </p>
                  </div>

                  {/* Operational Metrics Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <SvgLayer />
                      <span className="text-slate-600">
                        {company.fundingStage}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100/60 px-2.5 py-1 rounded-md">
                      <SvgBriefcase />
                      <span>{openAssignmentsCount} Roles Active</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
