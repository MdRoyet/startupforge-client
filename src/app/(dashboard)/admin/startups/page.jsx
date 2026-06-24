"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

// --- INLINE DESIGN SYSTEM SVGS ---
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
const SvgTrash = () => (
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
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
const SvgUndo = () => (
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
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <polyline points="3 3 3 8 8 8" />
  </svg>
);

export default function AdminManageStartups() {
  const { data: session } = useSession();
  const user = session?.user;

  const [startups, setStartups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    const fetchEcosystemStartups = async () => {
      try {
        const res = await fetch(
          "https://startupforge-server-ten.vercel.app/api/admin/startups",
          {
            credentials: "include",
          },
        );
        const json = await res.json();
        if (res.ok && json.success) {
          setStartups(json.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to map ecosystem startup profiles.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchEcosystemStartups();
  }, [user]);

  // Command Action: Toggle Venture Verification State
  const handleToggleStartupApproval = async (
    targetId,
    currentApprovalState,
  ) => {
    setActionId(targetId);
    const updatedApprovalState = !currentApprovalState;
    try {
      const res = await fetch(
        `https://startupforge-server-ten.vercel.app/api/admin/startups/${targetId}/approve`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ isApproved: updatedApprovalState }),
        },
      );
      const json = await res.json();

      if (res.ok && json.success) {
        toast.success(
          updatedApprovalState
            ? "Startup brand successfully approved!"
            : "Startup verification status retracted.",
        );

        // 🎯 THE MODIFICATION: Update both isApproved AND status locally
        setStartups((prev) =>
          prev.map((s) =>
            s._id === targetId
              ? {
                  ...s,
                  isApproved: updatedApprovalState,
                  status: updatedApprovalState ? "Approved" : "Pending",
                }
              : s,
          ),
        );
      } else {
        throw new Error(json.error || "Approval modification update rejected.");
      }
    } catch (err) {
      toast.error(
        err.message || "Failed to update validation parameters state.",
      );
    } finally {
      setActionId(null);
    }
  };

  // Command Action: Permanently Expunge Startup Record Node
  const handleRemoveStartup = async (targetId) => {
    if (
      !confirm(
        "Are you sure you want to completely remove this startup venture layout from the system data lists?",
      )
    )
      return;
    setActionId(targetId);
    try {
      const res = await fetch(
        `https://startupforge-server-ten.vercel.app/api/admin/startups/${targetId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const json = await res.json();

      if (res.ok && json.success) {
        toast.success(
          "Startup profile permanently deleted from platform records.",
        );
        setStartups((prev) => prev.filter((s) => s._id !== targetId));
      } else {
        throw new Error(
          json.error || "Forced cleanup cycle rejected by server database.",
        );
      }
    } catch (err) {
      toast.error(
        err.message || "Failed to process hard deletion command pipeline.",
      );
    } finally {
      setActionId(null);
    }
  };

  // Live client-side keyword list matching search query layout
  const filteredStartups = startups.filter((s) => {
    const query = searchQuery.toLowerCase();
    return (
      s.startupName?.toLowerCase().includes(query) ||
      s.industry?.toLowerCase().includes(query) ||
      s.founderEmail?.toLowerCase().includes(query) ||
      s.fundingStage?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono text-xs text-slate-400 font-bold gap-2">
        <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <span>Synchronizing Corporate Directories...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Tab Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Startups
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">
            Review active founder corporate brands, grant verified badge
            checkmarks, or drop indexing nodes.
          </p>
        </div>

        {/* Dynamic Context Filter Bar Search */}
        <div className="relative max-w-sm w-full shrink-0">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <SvgSearch />
          </span>
          <input
            type="text"
            placeholder="Search company name, sector, founder email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10 bg-white border-slate-200/80 text-sm text-slate-800 font-medium rounded-xl shadow-sm focus:border-purple-400 transition-all h-10"
          />
        </div>
      </div>

      {/* Main Administrative Venture Listing Manifest Container Grid Row */}
      <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden">
        {filteredStartups.length === 0 ? (
          <div className="text-center py-16 text-slate-400 font-medium text-sm font-mono uppercase tracking-wider">
            No startup corporate profiles matching your selected query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-left border-collapse text-slate-700 text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/50">
                  <th className="py-4 pl-6">Venture Branding & Stage</th>
                  <th className="py-4">Industry Sector</th>
                  <th className="py-4">Founder Reference Account</th>
                  <th className="py-4">Approval Gate</th>
                  <th className="py-4 text-right pr-6">
                    Ecosystem Actions Control Nodes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStartups.map((company) => (
                  <tr
                    key={company._id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    {/* Column 1: Brand details cell segment layout logo avatar elements */}
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={company.logo}
                          className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100/80 p-1.5 object-contain flex-shrink-0 shadow-sm"
                          alt={`${company.startupName} corporate registration identity vector logo mark`}
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-sm truncate leading-tight">
                            {company.startupName}
                          </div>
                          <div className="text-purple-600/90 font-mono font-bold text-[10px] mt-1 tracking-tight uppercase px-1.5 py-0.5 bg-purple-50 rounded-md border border-purple-100/30 inline-block">
                            {company.fundingStage}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Core Vertical Industry Categorization */}
                    <td className="py-4 text-slate-700 font-bold text-sm tracking-tight">
                      {company.industry}
                    </td>

                    {/* Column 3: Corporate Contact Founder Account Mail Marker Pointer */}
                    <td className="py-4 font-mono text-slate-400 text-[11px] font-bold">
                      {company.founderEmail}
                    </td>

                    {/* Column 4: Platform Status Visibility Approval Badges State */}
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 font-bold text-[10px] px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${
                          company.isApproved
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${company.isApproved ? "bg-emerald-500" : "bg-amber-400"}`}
                        />
                        {company.isApproved
                          ? "Verified Listing"
                          : "Pending Gate"}
                      </span>
                    </td>

                    {/* Column 5: Operational Action Control Multi-Layered Triggers Panel Row */}
                    <td className="py-4 text-right pr-6">
                      <div className="inline-flex items-center gap-2">
                        {/* Interactive Verification Endpoint Button Toggle */}
                        <button
                          onClick={() =>
                            handleToggleStartupApproval(
                              company._id,
                              company.isApproved,
                            )
                          }
                          disabled={actionId === company._id}
                          className={`btn btn-xs font-mono rounded-lg border-none px-3 font-bold text-[10px] tracking-tight uppercase transition-all h-8 inline-flex items-center gap-1 ${
                            company.isApproved
                              ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-100"
                              : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/10"
                          }`}
                        >
                          {actionId === company._id ? (
                            <span className="loading loading-spinner loading-xs" />
                          ) : company.isApproved ? (
                            <>
                              <SvgUndo /> Revoke Approval
                            </>
                          ) : (
                            <>
                              <SvgCheck /> Approve Startup
                            </>
                          )}
                        </button>

                        {/* Hard Delete Record Pipeline Trigger Button */}
                        <button
                          onClick={() => handleRemoveStartup(company._id)}
                          disabled={actionId === company._id}
                          className="btn btn-xs h-8 px-2.5 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200/60 hover:border-rose-100 flex items-center justify-center transition-colors"
                          title="Expunge Venture Asset Registry"
                        >
                          <SvgTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
