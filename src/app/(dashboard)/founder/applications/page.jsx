"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

// --- INLINE ADMIN ACCENT SVGS ---
const SvgGrid = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="admin-grid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x="100%"
      >
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#admin-grid)" />
  </svg>
);
const SvgMail = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const SvgLink = () => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const SvgCheck = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const SvgCross = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const SvgFolder = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

export default function FounderApplicationsDashboard() {
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Pending");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchFounderApplications = async () => {
      try {
        const res = await fetch(
          "https://startupforge-server-ten.vercel.app/api/applications",
          {
            method: "GET",
            credentials: "include",
          },
        );
        const json = await res.json();
        if (res.ok && json.success) {
          setApplications(json.data);
        }
      } catch (err) {
        console.error("Dashboard transmission fault:", err);
        toast.error("Failed to load submission rosters.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchFounderApplications();
  }, [user]);

  const handleUpdateStatus = async (appId, targetStatus) => {
    setProcessingId(appId);
    try {
      const res = await fetch(
        `https://startupforge-server-ten.vercel.app/api/applications/${appId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: targetStatus }),
        },
      );

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to update record state.");
      }

      toast.success(`Application bundle marked as ${targetStatus}!`);

      setApplications((prev) =>
        prev.map((item) =>
          item._id === appId ? { ...item, status: targetStatus } : item,
        ),
      );
    } catch (err) {
      toast.error(err.message || "State change rejection fault.");
    } finally {
      setProcessingId(null);
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (activeTab === "All") return true;
    return app.status === activeTab;
  });

  if (sessionLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-mono text-xs text-slate-400 gap-2">
        <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
        <span>Synchronizing Inbound Talent Nodes...</span>
      </div>
    );
  }

  if (!user || user.role !== "Founder") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <h2 className="text-xl font-black text-slate-900">Access Restricted</h2>
        <p className="text-xs text-slate-400 mt-1">
          This workspace dashboard panel matrix belongs strictly to verified
          Founders.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4 sm:px-6 lg:px-8 text-slate-800 relative overflow-hidden select-none">
      <SvgGrid />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Dashboard Title Block */}
        <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded tracking-wider">
              Console // Talent Pipeline
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2.5">
              Candidate Applications
            </h1>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Review, analyze capability parameters, and adjust entry routing
              logs across your startups.
            </p>
          </div>
          <div className="text-[11px] font-mono font-bold px-3 py-1 bg-slate-100 border text-slate-400 rounded-md shadow-sm shrink-0">
            TOTAL INBOUND: {applications.length.toString().padStart(2, "0")}{" "}
            UNITS
          </div>
        </div>

        {/* Structural Navigation Filters Row */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200/60 pb-1">
          {["Pending", "Accepted", "Rejected", "All"].map((tab) => {
            const count =
              tab === "All"
                ? applications.length
                : applications.filter((a) => a.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold tracking-tight rounded-t-xl border transition-all -mb-[5px] ${
                  activeTab === tab
                    ? "bg-white border-slate-200 border-b-white text-slate-900 shadow-sm font-black"
                    : "bg-transparent border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}{" "}
                <span
                  className={`ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded-md ${activeTab === tab ? "bg-slate-900 text-white" : "bg-slate-200/60 text-slate-500"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Grid Layer */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredApplications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white border border-slate-200 rounded-2xl border-dashed p-8"
              >
                <div className="p-3 bg-slate-50 border rounded-xl inline-block text-slate-400 mb-2">
                  <SvgFolder />
                </div>
                <h3 className="text-sm font-bold text-slate-700">
                  No applications in this sector
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  No data records currently match your selected sorting query.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((app, idx) => (
                  <motion.div
                    key={app._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                      delay: idx * 0.02,
                    }}
                    className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6 relative group hover:border-slate-300 transition-colors"
                  >
                    <div className="space-y-3.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-base font-black text-slate-900 tracking-tight truncate leading-none">
                          {app.applicantName}
                        </h3>
                        <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/60 px-2 py-0.5 rounded uppercase tracking-wide">
                          Target: {app.roleTitle}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500">
                        <a
                          href={`mailto:${app.applicantEmail}`}
                          className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                        >
                          <SvgMail /> {app.applicantEmail}
                        </a>
                        <a
                          href={app.portfolioLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 hover:underline"
                        >
                          <SvgLink /> View Digital Portfolio
                        </a>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl text-xs font-medium text-slate-600 leading-relaxed max-w-3xl">
                        <div className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1.5">
                          // Statement_of_intent :
                        </div>
                        "{app.motivationMessage}"
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-between md:justify-center items-end md:items-center gap-3 shrink-0 min-w-[140px] pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                      {app.status === "Pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(app._id, "Accepted")
                            }
                            disabled={processingId === app._id}
                            className="w-full h-9 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg border-none flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/10 transition-colors disabled:opacity-50"
                          >
                            <SvgCheck /> Accept Node
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(app._id, "Rejected")
                            }
                            disabled={processingId === app._id}
                            className="w-full h-9 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-600 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                          >
                            <SvgCross /> Reject Candidate
                          </button>
                        </>
                      ) : (
                        <div
                          className={`text-[10px] font-mono font-black border uppercase px-3 py-1.5 rounded-md tracking-wider ${
                            app.status === "Accepted"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                              : "bg-rose-50 text-rose-600 border-rose-200"
                          }`}
                        >
                          STATE // {app.status}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
