"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// --- INLINE DESIGN SYSTEM SVGS ---
const SvgSearch = () => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const SvgFilter = () => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const SvgGrid = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="opps-browse-grid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x="100%"
      >
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#opps-browse-grid)" />
  </svg>
);
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
const SvgBriefcase = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 130, damping: 18 },
  },
};

function OpportunitiesContent() {
  const searchParams = useSearchParams();
  const startupFilterId = searchParams.get("startup");

  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- SEARCH & FILTER STATE ---
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPoolSize, setTotalPoolSize] = useState(0);
  const itemsPerPage = 9;

  // Debounce the search input by 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setCurrentPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [workTypeFilter, industryFilter]);

  useEffect(() => {
    const fetchEcosystemOpportunities = async () => {
      setIsLoading(true);
      try {
        let targetUrl = `https://startupforge-server-ten.vercel.app/api/opportunities?page=${currentPage}&limit=${itemsPerPage}`;

        if (startupFilterId) targetUrl += `&startupId=${startupFilterId}`;
        if (debouncedSearch)
          targetUrl += `&search=${encodeURIComponent(debouncedSearch)}`;
        if (workTypeFilter)
          targetUrl += `&workType=${encodeURIComponent(workTypeFilter)}`;
        if (industryFilter)
          targetUrl += `&industry=${encodeURIComponent(industryFilter)}`;

        const res = await fetch(targetUrl);
        const json = await res.json();

        if (res.ok && json.success) {
          setOpportunities(json.data);

          if (json.pagination) {
            setTotalPages(json.pagination.totalPages);
            setTotalPoolSize(json.pagination.total);
          } else {
            setTotalPages(1);
            setTotalPoolSize(json.data.length);
          }
        }
      } catch (error) {
        console.error("Critical directory interface sync exception:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEcosystemOpportunities();
  }, [
    currentPage,
    startupFilterId,
    debouncedSearch,
    workTypeFilter,
    industryFilter,
  ]);

  const handlePageNavigation = (targetPage) => {
    setCurrentPage(targetPage);
    const viewHeader = document.getElementById("directory-anchor");
    if (viewHeader) viewHeader.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="directory-anchor" className="max-w-7xl mx-auto scroll-mt-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded text-[10px] font-mono font-bold uppercase tracking-wider mb-2.5">
            Ecosystem_Resource_Pool // ACTIVE
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            {startupFilterId && opportunities.length > 0
              ? `Open Roles at ${opportunities[0].startupName}`
              : "Explore All Active Opportunities"}
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Acquire priority matching routing fields inside fully vetted,
            engineered, and scaling startup frameworks.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400 font-bold bg-slate-100 border px-3 py-1.5 rounded-lg shrink-0">
          POOL CAPACITY: {totalPoolSize.toString().padStart(2, "0")} UNITS
        </div>
      </div>

      {/* --- SEARCH & FILTER BAR --- */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <SvgSearch />
          </span>
          <input
            type="text"
            placeholder="Search by Role Title or Required Skills..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium rounded-xl outline-none focus:border-slate-400 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3 sm:w-auto w-full">
          <div className="relative flex-1 sm:w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SvgMapPin />
            </span>
            <select
              value={workTypeFilter}
              onChange={(e) => setWorkTypeFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium rounded-xl outline-none focus:border-slate-400 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="">All Work Types</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <SvgFilter />
            </div>
          </div>

          <div className="relative flex-1 sm:w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SvgBriefcase />
            </span>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium rounded-xl outline-none focus:border-slate-400 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="">All Industries</option>
              <option value="SaaS & Software">SaaS & Software</option>
              <option value="Artificial Intelligence">
                AI / Machine Learning
              </option>
              <option value="Fintech">Fintech</option>
              <option value="Healthcare & BioTech">Healthcare & BioTech</option>
              <option value="E-Commerce">E-Commerce</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <SvgFilter />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[500px]">
          {Array.from({ length: itemsPerPage }).map((_, skeletonIdx) => (
            <div
              key={skeletonIdx}
              className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 animate-pulse"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 bg-slate-100 rounded" />
                <div className="space-y-1 flex-1">
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-2 bg-slate-50 rounded w-1/4" />
                </div>
              </div>
              <div className="h-4 bg-slate-100 rounded w-2/3" />
              <div className="h-3 bg-slate-50 rounded w-1/2" />
              <div className="h-8 bg-slate-100 rounded w-full pt-2" />
            </div>
          ))}
        </div>
      ) : opportunities.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8 border-dashed shadow-sm">
          <div className="p-3 bg-slate-50 text-slate-400 rounded-xl inline-block mb-3 border">
            <SvgBriefcase />
          </div>
          <h3 className="text-md font-bold text-slate-800">
            No Target Deployments Found
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 max-w-xs mx-auto">
            This search query mapping cluster returned empty results inside
            active database fields.
          </p>
          {(startupFilterId ||
            debouncedSearch ||
            workTypeFilter ||
            industryFilter) && (
            <button
              onClick={() => {
                setSearchInput("");
                setWorkTypeFilter("");
                setIndustryFilter("");
                // Note: startupFilterId is in the URL, so clearing it requires a Link/Router push to /opportunities
              }}
              className="btn btn-sm bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg mt-4 px-4 border-none text-xs"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {opportunities.map((op, idx) => (
                <motion.div
                  key={`${op._id}-${idx}`}
                  variants={cardVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 12px 30px -8px rgba(148, 163, 184, 0.22)",
                    borderColor: "rgba(15, 23, 42, 0.25)",
                  }}
                  className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between h-64 transition-all relative"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {op.startupLogo && (
                          <img
                            src={op.startupLogo}
                            alt={`${op.startupName} signature mark`}
                            className="w-8 h-8 rounded bg-slate-50 border border-slate-100 object-contain p-0.5 flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-slate-900 truncate leading-tight">
                            {op.startupName || "Independent Block"}
                          </h4>
                          <span className="text-[10px] font-mono font-bold text-slate-400 block leading-none mt-0.5">
                            {op.industry || "General"}
                          </span>
                        </div>
                      </div>
                      {startupFilterId && (
                        <span className="text-[8px] font-mono px-1.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-600 rounded font-bold uppercase tracking-wider">
                          Targeted
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug mb-2.5 pr-4 line-clamp-1">
                      {op.roleTitle}
                    </h3>

                    <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-500 mb-4">
                      <span className="inline-flex items-center gap-1 bg-slate-50 border px-2 py-0.5 rounded text-slate-600">
                        <SvgMapPin /> {op.workType}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-50 border px-2 py-0.5 rounded text-slate-600">
                        <SvgClock /> {op.commitmentLevel}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4 line-clamp-1">
                      {op.requiredSkills?.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200/40"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-400">
                      <SvgCalendar />
                      <span>Closing:</span>
                      <span className="text-slate-700 font-bold">
                        {new Date(op.deadline).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <Link
                      href={`/opportunities/${op._id}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-0.5 font-black"
                    >
                      Apply Role →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* --- PAGINATION INTERFACE --- */}
          {totalPages > 1 && (
            <div className="mt-12 pt-5 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
              <button
                onClick={() => handlePageNavigation(currentPage - 1)}
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
                      onClick={() => handlePageNavigation(number)}
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
                onClick={() => handlePageNavigation(currentPage + 1)}
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
  );
}

export default function PublicOpportunitiesDirectoryPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8">
      <SvgGrid />
      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-mono text-xs text-slate-400 font-bold gap-2">
            <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            <span>Mounting Application System Sub-nodes...</span>
          </div>
        }
      >
        <OpportunitiesContent />
      </Suspense>
    </div>
  );
}
