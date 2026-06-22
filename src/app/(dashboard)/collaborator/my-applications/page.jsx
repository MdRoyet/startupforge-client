"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";

// --- INLINE VECTOR UTILITIES ---
const SvgFilter = () => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const SvgEmptyBox = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const getStatusStyles = (status) => {
  switch (status) {
    case "Accepted":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Rejected":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-amber-100 text-amber-700 border-amber-200";
  }
};

const MyApplications = () => {
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [pageLoading, setPageLoading] = useState(true);

  // --- FETCH DYNAMIC SUBMISSIONS TRACKING STREAM ---
  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/applications", {
          credentials: "include",
        });
        const json = await res.json();

        if (res.ok && json.success) {
          setApplications(json.data);
        } else {
          throw new Error(
            json.error || "Failed to download applications registry ledger.",
          );
        }
      } catch (err) {
        console.error(err);
        toast.error(
          err.message || "Failed to pull submissions history streams.",
        );
      } finally {
        setPageLoading(false);
      }
    };

    if (user) {
      fetchMyApplications();
    } else if (!sessionLoading && !user) {
      setPageLoading(false);
    }
  }, [user, sessionLoading]);

  // Client side sorting filter logic execution
  const filteredApps =
    filter === "All"
      ? applications
      : applications.filter((app) => app.status === filter);

  if (sessionLoading || pageLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-xs font-mono font-bold text-slate-400 gap-2">
        <span className="loading loading-spinner loading-md text-emerald-600"></span>
        <span>CONNECTING_PIPELINE_REGISTRIES...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-sm font-mono font-bold text-slate-400 uppercase tracking-widest">
        Access Denied // Authentication Credentials Required
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto px-4"
    >
      {/* Title & Filter Control Node Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            My Applications
          </h1>
          <p className="text-gray-500 mt-1">
            Track the status of your startup applications.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1.5 shadow-sm self-start md:self-auto">
          <div className="flex items-center gap-1 text-gray-500 px-2">
            <SvgFilter />
          </div>
          {["All", "Pending", "Accepted", "Rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                filter === f
                  ? "bg-gray-800 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Stream Display Container */}
      {filteredApps.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="text-gray-300 mb-4">
            <SvgEmptyBox />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            No applications found
          </h3>
          <p className="text-gray-500 mt-1 text-sm">
            Try changing the filter or apply to new opportunities.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <motion.div
              key={app._id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Fallback image strategy handles undefined logos safely */}
                <img
                  src={
                    app.startupLogo ||
                    `https://i.pravatar.cc/150?u=${app.opportunityId}`
                  }
                  alt={app.startupName || "Startup Umbrella"}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-100 shrink-0 bg-slate-50 p-0.5"
                />
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-gray-800 truncate">
                    {app.roleTitle}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5 font-medium truncate">
                    {app.startupName || "Startup Partner"} • Applied on{" "}
                    {new Date(app.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  {/* Gracefully processes tech requirement tags arrays if available */}
                  {app.requiredSkills && app.requiredSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {app.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-gray-50 text-gray-600 border border-gray-200/50 px-2 py-0.5 rounded-md font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                <span
                  className={`text-xs font-bold px-4 py-1.5 rounded-full border tracking-wide uppercase ${getStatusStyles(
                    app.status,
                  )}`}
                >
                  {app.status || "Pending"}
                </span>

                {app.status === "Accepted" && (
                  <button
                    onClick={() =>
                      toast.success(
                        "Secure direct messaging link routing coming soon!",
                      )
                    }
                    className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-sm font-bold text-xs px-4 rounded-xl h-9"
                  >
                    Contact
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyApplications;
