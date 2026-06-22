"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- NATIVE INDUSTRIAL SVG ASSETS ---
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
const SvgMapPin = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
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
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function StartupProfilePortfolioPage({ params }) {
  // Unwrap Next.js dynamic path parameters safely
  const resolvedParams = use(params);
  const targetId = resolvedParams.id;

  const [companyProfile, setCompanyProfile] = useState(null);
  const [associatedRoles, setAssociatedRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const parseTargetEcosystemData = async () => {
      try {
        // --- CRITICAL FIX: Append the startupId query parameter straight to the URL string ---
        const [startupsRes, oppsRes] = await Promise.all([
          fetch("http://localhost:5000/api/startups"),
          fetch(
            `http://localhost:5000/api/opportunities?startupId=${targetId}`,
          ), // Backend filters this securely
        ]);

        const startupsJson = await startupsRes.json();
        const oppsJson = await oppsRes.json();

        if (startupsJson.success) {
          const match = startupsJson.data.find((item) => item._id === targetId);
          setCompanyProfile(match || null);
        }

        if (oppsJson.success) {
          // No client-side filtering lag needed anymore; the backend returns the exact matches!
          setAssociatedRoles(oppsJson.data);
        }
      } catch (err) {
        console.error("Relational lookup fault:", err);
      } finally {
        setIsLoading(false);
      }
    };
    parseTargetEcosystemData();
  }, [targetId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-2 font-mono">
        <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Syncing Corporate Umbrella Nodes...
        </span>
      </div>
    );
  }

  if (!companyProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h2 className="text-xl font-black text-slate-900">
          Ecosystem Node Missing
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          The requested startup identity configuration parameter cannot be
          verified.
        </p>
        <Link
          href="/startups"
          className="btn btn-sm btn-outline border-slate-300 font-bold rounded-lg text-slate-700"
        >
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation Action Bar */}
        <div>
          <Link
            href="/startups"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
          >
            <SvgArrowLeft /> Back to Directory
          </Link>
        </div>

        {/* Corporate Profile Details Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-5">
            <img
              src={companyProfile.logo}
              alt="Corporate signature logo mark"
              className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-1.5 object-contain flex-shrink-0 shadow-sm"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
                {companyProfile.startupName}
              </h1>
              <div className="flex flex-wrap gap-2 items-center text-xs font-bold mt-2.5">
                <span className="text-blue-600 bg-blue-50/60 border border-blue-100 px-2 py-0.5 rounded">
                  {companyProfile.industry}
                </span>
                <span className="text-slate-400 font-medium">//</span>
                <span className="text-slate-500 bg-slate-100 border px-2 py-0.5 rounded font-mono uppercase text-[10px]">
                  {companyProfile.fundingStage}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right text-xs font-semibold text-slate-400">
            Contact:{" "}
            <span className="text-slate-700 font-bold block mt-0.5">
              {companyProfile.founderEmail}
            </span>
          </div>
        </div>

        {/* Profile Description Roadmap Body */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            System_Statement_Blueprint //
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            {companyProfile.description ||
              "This operating organization has not synchronized a dynamic vision text blueprint strategy statement container to this cluster ledger index point."}
          </p>
        </div>

        {/* Nested Targeted Opportunities Header */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Open Assignments Under This Umbrella
            </h2>
          </div>

          {associatedRoles.length === 0 ? (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-xl border-dashed p-6">
              <h4 className="text-sm font-bold text-slate-600">
                No Active Roles Found
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                This company is currently fully staffed. Check back later for
                resource adjustments.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {associatedRoles.map((op, idx) => (
                <div
                  key={`${op._id}-${idx}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between transition-all hover:border-slate-400 hover:shadow-sm"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                        {op.roleTitle}
                      </h3>
                      <span className="text-[10px] font-mono bg-slate-50 border border-slate-200 text-slate-500 font-bold px-2 py-0.5 rounded uppercase">
                        {op.industry || "General"}
                      </span>
                    </div>

                    <div className="flex gap-2 text-[10px] font-bold text-slate-400 mb-4">
                      <span className="inline-flex items-center gap-1 bg-slate-50 border px-2 py-0.5 rounded text-slate-600">
                        <SvgMapPin /> {op.workType}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-50 border px-2 py-0.5 rounded text-slate-600">
                        <SvgClock /> {op.commitmentLevel}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {op.requiredSkills?.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100/40"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-400 font-semibold">
                      Closing:{" "}
                      {new Date(op.deadline).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <Link
                      href={`/opportunities/${op._id}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Apply Assignment →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
