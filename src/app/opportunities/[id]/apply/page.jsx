"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

// --- NATIVE SYSTEM SVGS ---
const SvgGrid = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="apply-grid"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x="100%"
      >
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#apply-grid)" />
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
const SvgLock = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const SvgPaperPlane = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function ApplyToOpportunityPage({ params }) {
  const resolvedParams = use(params);
  const opportunityId = resolvedParams.id;
  const router = useRouter();

  // 1. Fetch Session Authentication Status
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  // 2. Local State Variables
  const [opportunity, setOpportunity] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    applicantEmail: "",
    portfolioLink: "",
    motivationMessage: "",
  });

  // 3. Sync User Email on Component Mount
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, applicantEmail: user.email }));
    }
  }, [user]);

  // 4. Fetch Opportunity Requirements Context
  useEffect(() => {
    const fetchTargetOpportunity = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/opportunities/${opportunityId}`,
        );
        const json = await res.json();
        if (res.ok && json.success) {
          setOpportunity(json.data);
        } else {
          toast.error(
            json.error || "Target specification asset data unverified.",
          );
        }
      } catch (err) {
        console.error("Opportunity resolution pipeline error:", err);
      } finally {
        setPageLoading(false);
      }
    };
    fetchTargetOpportunity();
  }, [opportunityId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (
      !formData.applicantEmail ||
      !formData.portfolioLink ||
      !formData.motivationMessage
    ) {
      toast.error(
        "Please supply information data parameters for all tracking metrics fields.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <-- CRITICAL FIX: Forces browser cookies to pass the CORS barrier
        body: JSON.stringify({
          opportunityId,
          ...formData,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Application pipeline processing failure.",
        );
      }

      toast.success(
        "Application packet successfully committed to founder directory arrays! 🚀",
      );
      router.push("/collaborator/my-applications");
    } catch (error) {
      toast.error(
        error.message || "Error finalizing data transmission workflows.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDERING ROUTE RETAINERS ---
  if (pageLoading || sessionLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-mono text-xs text-slate-400 gap-2">
        <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
        <span>Syncing Registry Fields...</span>
      </div>
    );
  }

  // Guard Clause A: Unauthenticated State Link Verification
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <div className="max-w-md bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-4">
          <div className="p-3 bg-amber-50 text-amber-600 border border-amber-200 rounded-xl inline-block">
            <SvgLock />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Session Credentials Missing
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            You must establish a dynamic account link structure before deploying
            application packets to founders.
          </p>
          <Link
            href={`/login?redirect=/opportunities/${opportunityId}/apply`}
            className="btn btn-sm bg-slate-900 hover:bg-slate-800 text-white w-full border-none rounded-lg font-bold"
          >
            Authenticate Session
          </Link>
        </div>
      </div>
    );
  }

  // Guard Clause B: Role Barrier Guard (Lock out Founders from submission mechanics)
  if (user.role !== "Collaborator") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <div className="max-w-md bg-white border border-red-200 rounded-xl p-8 shadow-sm space-y-4">
          <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl inline-block">
            <SvgLock />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Privilege Group Insufficient
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            System security parameters limit application deployment routines
            strictly to **Collaborators**. Your role is indexed as **{user.role}
            **.
          </p>
          <Link
            href="/opportunities"
            className="btn btn-sm btn-outline border-slate-200 text-slate-700 w-full rounded-lg font-bold"
          >
            Return to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-32 px-4 sm:px-6 lg:px-8 text-slate-800 relative overflow-hidden">
      <SvgGrid />

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation row anchor layout */}
        <div>
          <Link
            href={`/opportunities`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
          >
            <SvgArrowLeft /> Back to Pool Index
          </Link>
        </div>

        {/* Dynamic Assignment Title Meta Context Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-4">
          {opportunity?.startupLogo && (
            <img
              src={opportunity.startupLogo}
              alt="Corporate logo"
              className="w-12 h-12 rounded-lg bg-slate-50 border p-1 object-contain flex-shrink-0"
            />
          )}
          <div>
            <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block tracking-wider">
              DEPLOYMENT_DESTINATION //
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
              {opportunity?.roleTitle || "Target Role Position"}
            </h2>
            <p className="text-xs font-bold text-blue-600 mt-1 uppercase tracking-wide">
              {opportunity?.startupName || "Parent Enterprise Umbrella"}
            </p>
          </div>
        </div>

        {/* Core Submission Matrix Data Input Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm"
        >
          <form onSubmit={handleFormSubmission} className="space-y-6">
            {/* Field A: System Identification Tracking Reference (Disabled View Element) */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-mono font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                  Opportunity Identification Registry Node ID //
                </span>
              </label>
              <input
                type="text"
                readOnly
                value={opportunityId}
                className="input input-bordered w-full bg-slate-50 border-slate-200 text-slate-400 text-xs font-mono select-none"
              />
            </div>

            {/* Field B: Applicant Email Address validation array matrix value */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-slate-700 text-sm">
                  Verified Contact Routing Email{" "}
                  <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="email"
                name="applicantEmail"
                value={formData.applicantEmail}
                onChange={handleInputChange}
                required
                placeholder="developer@forge.com"
                disabled={isSubmitting}
                className="input input-bordered w-full bg-slate-50 border-slate-200 text-slate-900 font-semibold"
              />
              <span className="label-text-alt text-[10px] text-slate-400 font-medium mt-1.5 block">
                This communication layer anchors tracking update emails sent to
                your active user directory.
              </span>
            </div>

            {/* Field C: Portfolio External Validation Hyperlink reference asset endpoint */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-slate-700 text-sm">
                  Digital Portfolio / GitHub Matrix Link{" "}
                  <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="url"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleInputChange}
                required
                placeholder="https://github.com/identity-signature"
                disabled={isSubmitting}
                className="input input-bordered w-full bg-slate-50 border-slate-200 text-slate-900 font-medium"
              />
            </div>

            {/* Field D: Motivation Cover Text Strategy Document String Message block item layout */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-slate-700 text-sm">
                  Statement of Capability & Operational Motivation{" "}
                  <span className="text-error">*</span>
                </span>
              </label>
              <textarea
                name="motivationMessage"
                value={formData.motivationMessage}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Draft a highly concise brief describing execution compatibility, resource assets deployment timelines, and background matching configurations relevant to this open startup structure assignment node..."
                disabled={isSubmitting}
                className="textarea textarea-bordered w-full bg-slate-50 border-slate-200 text-slate-900 font-medium text-sm leading-relaxed focus:bg-white resize-none"
              />
            </div>

            {/* Form Footer Action Row Controls Panel */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/50 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                STATUS_ENTRY: PENDING
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn bg-slate-950 hover:bg-slate-800 text-white border-none font-bold px-6 rounded-xl flex items-center gap-2 shadow-sm text-xs"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <>
                    <SvgPaperPlane /> Commit Packet Data
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
