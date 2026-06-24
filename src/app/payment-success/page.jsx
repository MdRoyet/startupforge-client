"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const SvgVerifyBadge = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10b981"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verificationState, setVerificationState] = useState("verifying"); // verifying | complete | error
  const [role, setRole] = useState("collaborator");

  useEffect(() => {
    if (!sessionId) {
      setVerificationState("error");
      return;
    }

    const verifyTransactionPipeline = async () => {
      try {
        const response = await fetch(
          "https://startupforge-server-ten.vercel.app/api/checkout/success",
          {
            method: "POST",
            credentials: "include",

            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          },
        );
        const json = await response.json();

        if (response.ok && json.success) {
          // 🎯 Capture precisely normalized roles parsed from Stripe metadata ledger payloads
          if (json.role) {
            setRole(json.role.toLowerCase().trim());
          }
          setVerificationState("complete");
        } else {
          throw new Error(json.error || "Fulfillment processing rejected.");
        }
      } catch (err) {
        console.error("Fulfillment engine error mapping pass:", err);
        setVerificationState("error");
      }
    };

    verifyTransactionPipeline();
  }, [sessionId]);

  // Dynamic path routing resolution mapping rules
  const isFounder = role === "founder";
  const targetDashboardPath = isFounder ? "/founder" : "/collaborator";
  const targetButtonLabel = isFounder
    ? "Enter Founder Workspace"
    : "Enter Pro Workspace";

  // State Handler: Verifying Transaction
  if (verificationState === "verifying") {
    return (
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
          Securing Stripe Ledger Verification tokens...
        </p>
      </div>
    );
  }

  // State Handler: Error or Network Fault Fallback
  if (verificationState === "error") {
    return (
      <div className="text-center space-y-4 max-w-md">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-xl font-black text-slate-800">
          Verification Intercept Failed
        </h2>
        <p className="text-sm font-medium text-slate-400 leading-relaxed">
          We encountered a network timeout validating your checkout reference
          token. If you received an invoice receipt, your profile will update
          automatically.
        </p>
        <a
          href={targetDashboardPath}
          className="inline-block px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-transform active:scale-[0.99]"
        >
          Return to Dashboard
        </a>
      </div>
    );
  }

  // State Handler: Successful Payment Fulfillment View
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 max-w-md bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-100/50"
    >
      <div className="flex justify-center">
        <SvgVerifyBadge />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Payment Fulfilled Successfully!
        </h2>
        <p className="text-sm font-medium text-slate-400 leading-relaxed">
          Your account has been elevated to Pro Tier premium access bounds.
          Global transaction receipts have been committed cleanly to storage
          arrays.
        </p>
      </div>
      <div className="pt-2">
        {/* 🚀 Native HTML anchor forces a hard reload, completely clearing out Next.js router cache */}
        <a
          href={targetDashboardPath}
          className="block w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-xl uppercase tracking-wider text-center shadow-md shadow-emerald-700/10 hover:scale-[1.01] transition-transform"
        >
          {targetButtonLabel}
        </a>
      </div>
    </motion.div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/60 px-4">
      <Suspense
        fallback={
          <div className="font-mono text-xs font-bold text-slate-400 uppercase animate-pulse">
            Initializing framework routing context...
          </div>
        }
      >
        <SuccessPageContent />
      </Suspense>
    </div>
  );
}
