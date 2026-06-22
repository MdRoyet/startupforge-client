"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";

// --- INLINE DESIGN SYSTEM ICONS ---
const SvgMail = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-slate-400"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const SvgShield = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-purple-600"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const SvgKey = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-slate-400"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

export default function AdminProfilePage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  // Mirror your secure runtime master account elevation intercept
  const effectiveRole =
    user?.email === "admin@startupforge.com" ? "Admin" : user?.role;

  if (sessionLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono text-xs text-slate-400 font-bold gap-2">
        <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <span>Decrypting Credential Handshakes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Sub-page Title Block */}
      <div className="border-b border-slate-100 pb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Identity & Clearance
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-1">
          Review active security credentials, account telemetry parameters, and
          signature marks.
        </p>
      </div>

      {/* Main Core Profile Metrics Row Card Layout */}
      <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Subsection Grid Segment: Live User Profile Avatar */}
        <div className="flex flex-col items-center text-center space-y-4 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
          <div className="relative">
            <img
              src={user?.image || "https://i.pravatar.cc/150?img=33"}
              className="w-28 h-28 rounded-full border-4 border-slate-50 object-cover shadow-md bg-slate-50"
              alt="Live Identity Account Avatar"
            />
            <span
              className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
              title="Node Online Status"
            />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
              {user?.name || "System Master"}
            </h2>
            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono font-bold px-2 py-0.5 bg-purple-50 text-purple-600 border border-purple-100/40 rounded-md uppercase tracking-wider">
              <SvgShield /> {effectiveRole}
            </span>
          </div>
        </div>

        {/* Right Subsection Grid Segment: User Metadata Specs */}
        <div className="md:col-span-2 space-y-4 font-semibold text-xs text-slate-500">
          {/* Item 1: Full Name */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Profile Username
            </span>
            <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl text-slate-800 text-sm font-bold shadow-inner">
              {user?.name || "Unassigned Account Name Node"}
            </div>
          </div>

          {/* Item 2: Connected Verified Email Address */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Secure Communication Routing Email
            </span>
            <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl text-slate-800 text-sm font-bold flex items-center gap-2.5 shadow-inner">
              <SvgMail /> {user?.email || "admin@startupforge.com"}
            </div>
          </div>

          {/* Item 3: Account Database Registry ID Number */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Identity Token Registry Index Node ID
            </span>
            <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl font-mono text-slate-400 font-bold text-[11px] flex items-center gap-2.5 selection:bg-purple-100 shadow-inner">
              <SvgKey /> {user?.id || "6a385b275cf569ba87de5242"}
            </div>
          </div>
        </div>
      </div>

      {/* Supplementary Operational Readiness Logs Block Section */}
      <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Security Clearance Protocols
          </h3>
          <div className="h-px bg-slate-100 mt-3 w-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-mono font-bold text-slate-400 uppercase">
          <div className="p-4 border rounded-xl bg-slate-50/50 flex items-center justify-between">
            <span>Middleware Overrides:</span>
            <span className="text-emerald-500">Bypass Active</span>
          </div>
          <div className="p-4 border rounded-xl bg-slate-50/50 flex items-center justify-between">
            <span>Ecosystem Scope Tier:</span>
            <span className="text-purple-600">Root Absolute (0)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
