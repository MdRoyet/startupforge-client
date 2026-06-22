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

  // Server-side state coordination parameters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPoolSize, setTotalPoolSize] = useState(0);
  const itemsPerPage = 6;

  // Track page transitions and query explicit index pages from the backend
  useEffect(() => {
    const loadServerSidePaginatedData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/opportunities?page=${currentPage}&limit=${itemsPerPage}`,
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
  }, [currentPage]); // <-- React triggers re-fetch on page index alterations

  const handlePageChange = (targetPage) => {
    setCurrentPage(targetPage);
    const gridHeader = document.getElementById("opportunities-grid-view");
    if (gridHeader) gridHeader.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="opportunities-grid-view"
      className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Structural Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded text-[10px] font-mono font-bold uppercase tracking-wider mb-2.5">
              SERVER_SIDE_ROUTING // STEADY
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
              Available Engineering Assignments
            </h2>
            <p className="text-slate-500 mt-1 max-w-xl text-xs font-medium">
              Filter through real-time team positions dynamically synchronized
              from the system database cluster.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-400 font-bold bg-slate-100 border px-3 py-1 rounded-md mt-4 md:mt-0">
            TOTAL POOL: {totalPoolSize.toString().padStart(2, "0")} UNITS
          </div>
        </div>

        {/* Dynamic Skeleton Loader State Block */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[460px]">
            {Array.from({ length: itemsPerPage }).map((_, placeholderIdx) => (
              <div
                key={placeholderIdx}
                className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 animate-pulse"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 bg-slate-100 rounded" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                    <div className="h-2 bg-slate-50 rounded w-1/4" />
                  </div>
                </div>
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="flex gap-2">
                  <div className="h-4 bg-slate-50 rounded w-12" />
                  <div className="h-4 bg-slate-50 rounded w-16" />
                </div>
                <div className="h-6 bg-slate-100 rounded w-full pt-2" />
              </div>
            ))}
          </div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-xl p-8 border-dashed shadow-sm">
            <h3 className="text-md font-bold text-slate-700">
              No Open Postings Active
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Ecosystem allocations currently fully saturated.
            </p>
          </div>
        ) : (
          <>
            {/* Dynamic Live Grid Rendering Row */}
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
                      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.08)",
                      borderColor: "rgba(99, 102, 241, 0.35)",
                    }}
                    className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between transition-colors relative"
                  >
                    <div>
                      {/* Startup Branding Row */}
                      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 min-w-0">
                          {op.startupLogo && (
                            <img
                              src={op.startupLogo}
                              alt="Corporate branding identity icon"
                              className="w-7 h-7 rounded bg-slate-50 border border-slate-100 object-contain p-0.5"
                            />
                          )}
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate leading-tight">
                              {op.startupName || "Parent Cluster"}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400 block leading-none mt-0.5">
                              {op.industry || "General"}
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-slate-100 border text-slate-500 rounded font-bold uppercase tracking-wider">
                          LIVE_SYS
                        </span>
                      </div>

                      <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug mb-2.5">
                        {op.roleTitle}
                      </h3>

                      {/* Attribute Badges */}
                      <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-500 mb-4">
                        <span className="inline-flex items-center gap-1 bg-slate-50 border px-2 py-0.5 rounded">
                          <SvgMapPin /> {op.workType}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-slate-50 border px-2 py-0.5 rounded">
                          <SvgClock /> {op.commitmentLevel}
                        </span>
                      </div>

                      {/* Skills Mapping Tag Footprints */}
                      <div className="flex flex-wrap gap-1 mb-5">
                        {op.requiredSkills?.map((skill, sIdx) => (
                          <span
                            key={`${skill}-${sIdx}`}
                            className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-50/60 text-indigo-600 border border-indigo-100/30 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-400">
                        <SvgCalendar />
                        <span>Closing Gate:</span>
                        <span className="text-slate-700 font-bold">
                          {new Date(op.deadline).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <Link
                        href={`/opportunities/${op._id}`}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors flex items-center gap-0.5"
                      >
                        Apply Node →
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* --- INDUSTRIAL SERVER PAGINATION FOOTER BUTTON INTERFACES --- */}
            {totalPages > 1 && (
              <div className="mt-12 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border bg-white hover:bg-slate-900 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors"
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
                            ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                            : "bg-white hover:bg-slate-100 text-slate-700"
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
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border bg-white hover:bg-slate-900 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors"
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
