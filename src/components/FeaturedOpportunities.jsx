"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- INLINE PURE SVG ICONS ---
const SvgCalendar = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const SvgMapPin = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const SvgClock = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const SvgChevronLeft = () => (
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
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const SvgChevronRight = () => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// --- MOTION DESIGN ANIMATION ATTRIBUTES ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.96, y: -8, transition: { duration: 0.12 } },
};

export default function FeaturedOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPoolSize, setTotalPoolSize] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadServerSidePaginatedData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://startupforge-server-ten.vercel.app/api/opportunities?page=${currentPage}&limit=${itemsPerPage}`,
        );
        const json = await res.json();

        if (res.ok && json.success) {
          setOpportunities(json.data);
          setTotalPages(json.pagination.totalPages);
          setTotalPoolSize(json.pagination.total);
        }
      } catch (error) {
        console.error("Pipeline breakdown fetching backend page items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServerSidePaginatedData();
  }, [currentPage]);

  const handlePageChange = (targetPage) => {
    setCurrentPage(targetPage);
    const gridHeader = document.getElementById("opportunities-grid-view");
    if (gridHeader) gridHeader.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="w-full bg-[#0b1329] py-16 flex flex-col items-center justify-center gap-2 border-t border-slate-800">
        <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          Synchronizing position rosters...
        </span>
      </div>
    );
  }

  return (
    <section
      id="opportunities-grid-view"
      className="bg-[#0b1329] py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800 scroll-mt-24 text-slate-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Transparent Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800/80 pb-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 rounded text-[10px] font-mono font-bold uppercase tracking-wider mb-2.5">
              SERVER_SIDE_ROUTING // SECURE_NODE
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight sm:text-3xl">
              Available Engineering Assignments
            </h2>
            <p className="text-slate-400 mt-1 max-w-xl text-xs font-medium">
              Filter through real-time team positions dynamically synchronized
              from the system database cluster.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-400 font-bold bg-slate-900/60 border border-slate-800 px-3 py-1 rounded-md mt-4 md:mt-0">
            TOTAL POOL: {totalPoolSize.toString().padStart(2, "0")} NODES
          </div>
        </div>

        {opportunities.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/20 border border-slate-800 rounded-xl p-8 border-dashed shadow-sm">
            <h3 className="text-md font-bold text-slate-400">
              No Open Postings Active
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Ecosystem allocations currently fully saturated.
            </p>
          </div>
        ) : (
          <>
            {/* Transparent Glassmorphism Grid Layout */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[460px]"
            >
              <AnimatePresence mode="popLayout">
                {opportunities.map((op, idx) => (
                  <motion.div
                    key={`${op._id}-${idx}`}
                    variants={cardVariants}
                    layout
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 30px -5px rgba(99, 102, 241, 0.15)",
                      borderColor: "rgba(99, 102, 241, 0.5)",
                      backgroundColor: "rgba(30, 41, 59, 0.45)",
                    }}
                    className="bg-slate-900/20 border border-slate-800/80 backdrop-blur-md rounded-xl p-5 flex flex-col justify-between transition-all relative"
                  >
                    <div>
                      {/* Brand Row */}
                      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800/60">
                        <div className="flex items-center gap-2 min-w-0">
                          {op.startupLogo && (
                            <img
                              src={op.startupLogo}
                              alt="Branding asset"
                              className="w-7 h-7 rounded bg-slate-950 border border-slate-800 object-contain p-0.5"
                            />
                          )}
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate leading-tight">
                              {op.startupName || "Parent Cluster"}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400 block leading-none mt-0.5">
                              {op.industry || "General"}
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded font-bold uppercase tracking-wider">
                          LIVE_SYS
                        </span>
                      </div>

                      <h3 className="text-base font-black text-white tracking-tight leading-snug mb-2.5">
                        {op.roleTitle}
                      </h3>

                      {/* Specification Labels */}
                      <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-300 mb-4">
                        <span className="inline-flex items-center gap-1 bg-slate-950/50 border border-slate-800 px-2 py-0.5 rounded">
                          <SvgMapPin /> {op.workType}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-slate-950/50 border border-slate-800 px-2 py-0.5 rounded">
                          <SvgClock /> {op.commitmentLevel}
                        </span>
                      </div>

                      {/* Required Skills Matrix Tags */}
                      <div className="flex flex-wrap gap-1 mb-5">
                        {op.requiredSkills?.map((skill, sIdx) => (
                          <span
                            key={`${skill}-${sIdx}`}
                            className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Node */}
                    <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-400">
                        <SvgCalendar />
                        <span>Closing Gate:</span>
                        <span className="text-slate-200 font-bold">
                          {new Date(op.deadline).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <Link
                        href={`/opportunities/${op._id}`}
                        className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-0.5"
                      >
                        Apply Node →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* --- CYBER PAGINATION FOOTER BUTTON SETS --- */}
            {totalPages > 1 && (
              <div className="mt-12 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-slate-400">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800 text-slate-200 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                  <SvgChevronLeft /> PREV
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`w-8 h-8 rounded-lg border font-bold transition-all ${
                          currentPage === number
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10"
                            : "bg-slate-900/40 border-slate-800 hover:bg-slate-800 text-slate-300"
                        }`}
                      >
                        {number.toString().padStart(2, "0")}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800 text-slate-200 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                  NEXT <SvgChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
