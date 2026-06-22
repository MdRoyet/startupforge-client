"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

// --- INLINE DESIGN SYSTEM SVGS ---
const SvgReceipt = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z" />
    <path d="M6 8h12M6 12h12M6 16h10" />
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

export default function AdminTransactionsLedger() {
  const { data: session } = useSession();
  const user = session?.user;

  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFinancialLedger = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/transactions",
          {
            credentials: "include",
          },
        );
        const json = await res.json();
        if (res.ok && json.success) {
          setTransactions(json.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to recover ledger transactional audit streams.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchFinancialLedger();
  }, [user]);

  // Live client-side lookup filtering mapping array matching strategy
  const filteredTransactions = transactions.filter((t) => {
    const query = searchQuery.toLowerCase();
    return (
      t.userName?.toLowerCase().includes(query) ||
      t.userEmail?.toLowerCase().includes(query) ||
      t._id?.toLowerCase().includes(query) ||
      t.status?.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-mono text-xs text-slate-400 font-bold gap-2">
        <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <span>Extracting Account Ledger Statements...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* View Context Page Title Block Header Segment */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Transactions
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">
            Audit platform payment processing pipelines, capture capital
            volumes, and review payment statuses.
          </p>
        </div>

        {/* Dynamic Real-time Text Filter Search Bar Container */}
        <div className="relative max-w-sm w-full shrink-0">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <SvgSearch />
          </span>
          <input
            type="text"
            placeholder="Search user name, email, node reference ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full pl-10 bg-white border-slate-200/80 text-sm text-slate-800 font-medium rounded-xl shadow-sm focus:border-purple-400 transition-all h-10"
          />
        </div>
      </div>

      {/* Main Ledger Table Board Interface Housing Structure */}
      <div className="bg-white border border-slate-200/70 rounded-2xl shadow-sm overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-16 text-slate-400 font-medium text-sm font-mono uppercase tracking-wider">
            No transaction records matched your active filtering queries.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-left border-collapse text-slate-700 text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-50/50">
                  <th className="py-4 pl-6">Target User Profile</th>
                  <th className="py-4">Ledger Reference Node ID</th>
                  <th className="py-4">Capital Amount Value</th>
                  <th className="py-4">Timestamp Settled</th>
                  <th className="py-4 text-right pr-6">Payment Status check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((trans) => {
                  const isSucceeded = [
                    "Succeeded",
                    "succeeded",
                    "Paid",
                    "paid",
                  ].includes(trans.status);
                  return (
                    <tr
                      key={trans._id}
                      className="hover:bg-slate-50/40 transition-colors"
                    >
                      {/* Column 1: Financial Operator Profile Identification Blocks */}
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                            <SvgReceipt />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 text-sm truncate leading-tight">
                              {trans.userName || "Ecosystem Operator"}
                            </div>
                            <div className="text-slate-400 text-xs mt-0.5 tracking-tight font-medium truncate">
                              {trans.userEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: System Tracking Core Reference String Token */}
                      <td className="py-4 font-mono text-slate-400 font-bold text-[11px] select-all">
                        {trans._id}
                      </td>

                      {/* Column 3: Value metrics formatting indicators */}
                      <td className="py-4 text-slate-900 font-black text-sm tracking-tight">
                        $
                        {trans.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      {/* Column 4: Timeline Conversion Data Parsers */}
                      <td className="py-4 font-medium text-slate-500 tracking-tight">
                        {new Date(trans.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Column 5: Ledger Gateway Verification Flag Badges Status */}
                      <td className="py-4 text-right pr-6">
                        <span
                          className={`inline-flex items-center gap-1.5 font-bold text-[10px] px-2.5 py-0.5 rounded-md border uppercase tracking-wider ${
                            isSucceeded
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-rose-50 text-rose-600 border-rose-100"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${isSucceeded ? "bg-emerald-500" : "bg-rose-500"}`}
                          />
                          {isSucceeded ? "Completed" : trans.status || "Failed"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
