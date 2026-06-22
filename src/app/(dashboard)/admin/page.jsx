"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import Link from "next/link"; // Added for seamless homepage routing

// --- INLINE DESIGN SYSTEM CARD GLYPHS ---
const SvgHome = () => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const SvgUsersCard = () => (
  <svg
    width="20"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="text-purple-600"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const SvgStartupsCard = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="text-violet-600"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2s8 3 8 7c0 6-8 11-8 11S4 15 4 9c0-4 8-7 8-7z" />
  </svg>
);
const SvgOppsCard = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="text-emerald-600"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const SvgRevenueCard = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    className="text-amber-600"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export default function AdminOverviewTab() {
  const { data: session } = useSession();
  const user = session?.user;

  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalStartups: 0,
    totalOpportunities: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverviewTelemetry = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/overview", {
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setMetrics(json.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch analytical monitoring frames.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchOverviewTelemetry();
  }, [user]);

  // --- DYNAMIC SVG PIE CHART MATHEMATICS LAYERS ---
  const { totalUsers, totalStartups, totalOpportunities } = metrics;
  const grandTotal = totalUsers + totalStartups + totalOpportunities || 1;

  // Percentage allocations for visual pie segments
  const pctUsers = totalUsers / grandTotal;
  const pctStartups = totalStartups / grandTotal;
  const pctOpps = totalOpportunities / grandTotal;

  // Compute circumferences for stacked SVG vector overlays (Radius = 50)
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.159

  const dashUsers = circumference * pctUsers;
  const dashStartups = circumference * pctStartups;
  const dashOpps = circumference * pctOpps;

  const offsetUsers = 0;
  const offsetStartups = -dashUsers;
  const offsetOpps = -(dashUsers + dashStartups);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono text-xs text-slate-400 font-bold gap-2">
        <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <span>Syncing Registry Summaries...</span>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Tab Header Meta Context Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Admin Dashboard <span className="text-base select-none">🛡️</span>
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">
            Platform overview and management.
          </p>
        </div>

        {/* Navigation Trigger Button Context Anchor Node */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 h-10 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all uppercase tracking-wide shrink-0 self-start sm:self-auto"
        >
          <SvgHome /> Go to Homepage
        </Link>
      </div>

      {/* Grid Row 1: The 4 Scoring Overview Counters Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card A: Total Users */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100/60 flex items-center justify-center shrink-0">
            <SvgUsersCard />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {metrics.totalUsers.toLocaleString()}
            </div>
            <span className="text-xs font-semibold text-slate-400 block mt-1.5">
              Total Users
            </span>
          </div>
        </div>

        {/* Card B: Total Startups */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100/60 flex items-center justify-center shrink-0">
            <SvgStartupsCard />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {metrics.totalStartups.toLocaleString()}
            </div>
            <span className="text-xs font-semibold text-slate-400 block mt-1.5">
              Total Startups
            </span>
          </div>
        </div>

        {/* Card C: Opportunities */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100/60 flex items-center justify-center shrink-0">
            <SvgOppsCard />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {metrics.totalOpportunities.toLocaleString()}
            </div>
            <span className="text-xs font-semibold text-slate-400 block mt-1.5">
              Opportunities
            </span>
          </div>
        </div>

        {/* Card D: Total Revenue */}
        <div className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100/60 flex items-center justify-center shrink-0">
            <SvgRevenueCard />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              $
              {metrics.totalRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <span className="text-xs font-semibold text-slate-400 block mt-1.5">
              Total Revenue
            </span>
          </div>
        </div>
      </div>

      {/* Grid Row 2: Analytical Platform Distribution Chart Window */}
      <div className="bg-white border border-slate-200/70 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Platform Distribution
          </h2>
          <div className="h-px bg-slate-100 mt-3 w-full" />
        </div>

        {/* Embedded Vector Drawing Sector Viewport */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 140 140"
              className="transform -rotate-90"
            >
              {/* Segment 1: Users Segment (Indigo Color Base) */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke="#4f46e5"
                strokeWidth="22"
                strokeDasharray={`${dashUsers} ${circumference}`}
                strokeDashoffset={offsetUsers}
                className="transition-all duration-500"
              />

              {/* Segment 2: Startups Segment (Purple Color Base) */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke="#9333ea"
                strokeWidth="22"
                strokeDasharray={`${dashStartups} ${circumference}`}
                strokeDashoffset={offsetStartups}
                className="transition-all duration-500"
              />

              {/* Segment 3: Opportunities Segment (Emerald Color Base) */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                stroke="#10b981"
                strokeWidth="22"
                strokeDasharray={`${dashOpps} ${circumference}`}
                strokeDashoffset={offsetOpps}
                className="transition-all duration-500"
              />
            </svg>

            {/* Center Absolute Total Label Badge */}
            <div className="absolute text-center bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-inner border border-slate-50">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                Total
              </span>
              <span className="text-xl font-black text-slate-900 mt-0.5">
                {(
                  totalUsers +
                  totalStartups +
                  totalOpportunities
                ).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Interactive Descriptive Chart Legend List */}
          <div className="space-y-4 w-full max-w-xs font-semibold text-xs text-slate-500">
            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 border rounded-xl px-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />
                <span>Users:</span>
              </div>
              <span className="text-slate-900 font-bold">
                {metrics.totalUsers}
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 border rounded-xl px-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9333ea]" />
                <span>Startups:</span>
              </div>
              <span className="text-slate-900 font-bold">
                {metrics.totalStartups}
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 border rounded-xl px-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span>Opportunities:</span>
              </div>
              <span className="text-slate-900 font-bold">
                {metrics.totalOpportunities}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
