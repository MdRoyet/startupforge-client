"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- INLINE INDUSTRIAL SVGS ---
const SvgGrid = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="details-grid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x="100%"
      >
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#details-grid)" />
  </svg>
);
const SvgArrowLeft = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const SvgBriefcase = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const SvgMapPin = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const SvgClock = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
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
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function OpportunityDetailsPage({ params }) {
  // Unwrap parameters safely using Next.js runtime standards
  const resolvedParams = use(params);
  const targetId = resolvedParams.id;

  const [opportunity, setOpportunity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunitySpecifications = async () => {
      try {
        const res = await fetch(
          `https://startupforge-server-ten.vercel.app/api/opportunities/${targetId}`,
        );
        const json = await res.json();

        if (res.ok && json.success) {
          setOpportunity(json.data);
        }
      } catch (error) {
        console.error("Error connecting to data node:", error);
      } finally {
        // <-- THE CRITICAL FIX: Changed from 'final:' to 'finally:'
        setIsLoading(false);
      }
    };

    fetchOpportunitySpecifications();
  }, [targetId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-mono text-xs text-slate-400 gap-2">
        <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
        <span>Resolving Core Specifications...</span>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h2 className="text-xl font-black text-slate-900">
          Assignment Index Missing
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          The requested position node token cannot be parsed inside current
          memory registers.
        </p>
        <Link
          href="/opportunities"
          className="btn btn-sm btn-outline border-slate-200 text-slate-700 rounded-lg"
        >
          Return to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4 sm:px-6 lg:px-8 text-slate-800 relative overflow-hidden">
      <SvgGrid />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Action Bar */}
        <div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
          >
            <SvgArrowLeft /> Return to Open Feed
          </Link>
        </div>

        {/* Corporate Profile Context Summary Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            {opportunity.startupLogo && (
              <img
                src={opportunity.startupLogo}
                alt="Company branding identity avatar"
                className="w-14 h-14 rounded-xl border object-contain p-1 bg-slate-50 flex-shrink-0 shadow-sm"
              />
            )}
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                Operational Venture
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                {opportunity.startupName}
              </h2>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mt-1 inline-block">
                {opportunity.industry}
              </span>
            </div>
          </div>

          <div className="text-left md:text-right font-mono text-[11px] text-slate-400 space-y-0.5">
            <div>NODE_ID: {opportunity._id}</div>
            <div>VERIFIED_OWNER: {opportunity.founderEmail}</div>
          </div>
        </div>

        {/* Position Metrics Layout Grid Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-3.5 shadow-sm">
            <div className="p-2.5 bg-slate-50 border rounded-lg text-slate-500">
              <SvgMapPin />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Workspace Matrix
              </span>
              <span className="text-sm font-black text-slate-800">
                {opportunity.workType}
              </span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-3.5 shadow-sm">
            <div className="p-2.5 bg-slate-50 border rounded-lg text-slate-500">
              <SvgClock />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Commitment Metrics
              </span>
              <span className="text-sm font-black text-slate-800">
                {opportunity.commitmentLevel}
              </span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-3.5 shadow-sm">
            <div className="p-2.5 bg-rose-50/50 border border-rose-100 text-rose-600 rounded-lg">
              <SvgCalendar />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-rose-400 uppercase tracking-wider block">
                Closing Gate
              </span>
              <span className="text-sm font-black text-rose-600">
                {new Date(opportunity.deadline).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Requirement Parameters & Specifications Block */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase block mb-1">
              Position Assignment //
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {opportunity.roleTitle}
            </h1>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Required Capability Parameters :
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.requiredSkills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-md shadow-sm shadow-indigo-500/[0.02]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="divider pt-4"></div>

          {/* Action Call Pipeline Hook Trigger */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-400 font-medium max-w-sm leading-relaxed">
              Submitting an allocation form directly pipes your platform
              application parameters into this founder's private metrics
              evaluation dashboard.
            </p>
            <Link
              href={`/opportunities/${opportunity._id}/apply`}
              className="btn bg-slate-950 hover:bg-slate-800 text-white font-bold border-none px-8 rounded-xl shadow-md text-xs flex items-center gap-2 h-12 shrink-0"
            >
              <SvgBriefcase /> Initialize Application Node
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
