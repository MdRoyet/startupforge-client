"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

// --- INLINE DESIGN SYSTEM SVGS ---
const SvgLock = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const SvgUnlock = () => (
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
    <path d="M14 9V5a5 5 0 0 0-10 0v4" />
    <rect x="2" y="9" width="20" height="11" rx="2" ry="2" />
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

export default function AdminManageUsers() {
  const { data: session } = useSession();
  const user = session?.user;

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    const fetchEcosystemAccounts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setUsers(json.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to read system identity arrays.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchEcosystemAccounts();
  }, [user]);

  // Command Action execution endpoint handler mapping
  const handleToggleBlockUser = async (targetId, currentBlockState) => {
    setActionId(targetId);
    const updatedBlockState = !currentBlockState;
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${targetId}/toggle-block`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ isBlocked: updatedBlockState }),
        },
      );
      const json = await res.json();

      if (res.ok && json.success) {
        toast.success(
          updatedBlockState
            ? "Operator account access suspended."
            : "Account access restored successfully.",
        );
        // Optimistic mutation lookup matrix
        setUsers((prev) =>
          prev.map((u) =>
            u._id === targetId ? { ...u, isBlocked: updatedBlockState } : u,
          ),
        );
      } else {
        throw new Error(
          json.error || "Security token modification request rejected.",
        );
      }
    } catch (err) {
      toast.error(
        err.message ||
          "Failed to finalize restriction update execution changes.",
      );
    } finally {
      setActionId(null);
    }
  };

  // Live client-side lookup filtering query logic
  const filteredUsers = users.filter((u) => {
    const searchString = searchQuery.toLowerCase();
    return (
      u.name?.toLowerCase().includes(searchString) ||
      u.email?.toLowerCase().includes(searchString) ||
      u.role?.toLowerCase().includes(searchString)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono text-xs text-slate-400 font-bold gap-2">
        <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <span>Compiling Active Platform Identities...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* View Section Context Header Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Users
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">
            Audit active operator profiles, monitor tier clear privileges, and
            restrict workspace accesses.
          </p>
        </div>

        {/* Real-time Dynamic Filter Lookup Card */}
        <div className="relative max-w-sm w-full shrink-0">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <SvgSearch />
          </span>
          <input
            type="text"
            placeholder="Search name, email routing, role fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10 bg-white border-slate-200/80 text-sm text-slate-800 font-medium rounded-xl shadow-sm focus:border-purple-400 transition-all h-10"
          />
        </div>
      </div>

      {/* Main Administrative Manifest Grid Deck Card */}
      <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16 text-slate-400 font-medium text-sm font-mono uppercase tracking-wider">
            No matching active identity nodes discovered.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-left border-collapse text-slate-700 text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/50">
                  <th className="py-4 pl-6">
                    Operator Name / Identity Contact
                  </th>
                  <th className="py-4">System Node ID</th>
                  <th className="py-4">Role Matrix Tier</th>
                  <th className="py-4">Account Integrity</th>
                  <th className="py-4 text-right pr-6">Action Protocols</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    {/* Column 1: User Profile Context Card Elements */}
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || "https://i.pravatar.cc/150"}
                          className="w-9 h-9 rounded-full border border-slate-200 bg-slate-50 object-cover flex-shrink-0"
                          alt={`${item.name} user card signature`}
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-sm truncate leading-tight">
                            {item.name}
                          </div>
                          <div className="text-slate-400 text-xs mt-0.5 tracking-tight font-medium truncate">
                            {item.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Structural DB Identification Token */}
                    <td className="py-4 font-mono text-slate-400 font-bold text-[11px] selection:bg-purple-100">
                      {item._id}
                    </td>

                    {/* Column 3: Privilege Mapping Badges */}
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                          item.role === "Founder"
                            ? "bg-purple-50 text-purple-600 border-purple-100"
                            : "bg-blue-50 text-blue-600 border-blue-100"
                        }`}
                      >
                        {item.role || "Collaborator"}
                      </span>
                    </td>

                    {/* Column 4: System Suspension Flag States */}
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 font-bold text-[10px] px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                          item.isBlocked
                            ? "bg-rose-50 text-rose-600 border-rose-100 animate-pulse"
                            : "bg-slate-50 text-slate-500 border-slate-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${item.isBlocked ? "bg-rose-500" : "bg-slate-400"}`}
                        />
                        {item.isBlocked ? "Suspended" : "Active Node"}
                      </span>
                    </td>

                    {/* Column 5: Control Action Triggers Panels */}
                    <td className="py-4 text-right pr-6">
                      <button
                        onClick={() =>
                          handleToggleBlockUser(item._id, item.isBlocked)
                        }
                        disabled={actionId === item._id}
                        className={`btn btn-xs font-mono rounded-lg border-none px-3 font-bold text-[10px] tracking-tight uppercase transition-all inline-flex items-center gap-1 h-8 ${
                          item.isBlocked
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/10"
                            : "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100"
                        }`}
                      >
                        {actionId === item._id ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : item.isBlocked ? (
                          <>
                            <SvgUnlock /> Unblock User
                          </>
                        ) : (
                          <>
                            <SvgLock /> Block User
                          </>
                        )}
                      </button>
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
