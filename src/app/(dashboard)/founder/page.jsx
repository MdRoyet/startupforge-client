"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

// --- INLINE SVG ICONS (Zero external dependencies) ---
const SvgList = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const SvgUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const SvgCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);
const SvgTrending = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const SvgArrowUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);
const SvgPlus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const SvgArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const SvgDots = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);
const SvgClock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const SvgCheckCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const SvgXCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
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

const getStatusIcon = (status) => {
  switch (status) {
    case "Accepted":
      return <SvgCheckCircle />;
    case "Rejected":
      return <SvgXCircle />;
    default:
      return <SvgClock />;
  }
};

const FounderOverview = () => {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  const [syncing, setSyncing] = useState(false);
  const [metrics, setMetrics] = useState({
    totalOpportunities: 0,
    totalApplications: 0,
    totalAccepted: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  // Extract first name dynamically from auth token
  const firstName = user?.name ? user.name.split(" ")[0] : "Founder";

  // --- FETCH DYNAMIC TELEMETRY STREAMS ---
  const fetchFounderDashboardTelemetry = async (showToast = false) => {
    if (showToast) setSyncing(true);
    try {
      const res = await fetch(
        "https://startupforge-server-ten.vercel.app/api/founder/overview",
        {
          credentials: "include",
        },
      );
      const json = await res.json();

      if (res.ok && json.success) {
        setMetrics(json.data.metrics);
        setRecentApplications(json.data.recentApplications || []);
        if (showToast)
          toast.success("Dashboard metrics synchronized successfully!", {
            icon: "✅",
          });
      } else {
        throw new Error(
          json.error || "Server responded with query execution fault.",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to parse core business overview variables matrix.");
    } finally {
      setPageLoading(false);
      setSyncing(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFounderDashboardTelemetry();
    } else if (!sessionLoading && !user) {
      setPageLoading(false);
    }
  }, [user, sessionLoading]);

  const handleSyncData = () => {
    toast.info("Syncing dashboard data...", { icon: "🔄", autoClose: 1000 });
    fetchFounderDashboardTelemetry(true);
  };

  // Compute live contextual hiring success rate safely
  const calculatedSuccessRate =
    metrics.totalApplications > 0
      ? Math.round((metrics.totalAccepted / metrics.totalApplications) * 100)
      : 0;

  const statsData = [
    {
      title: "Total Opportunities",
      value: metrics.totalOpportunities.toString(),
      change: "+3 this month",
      icon: SvgList,
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Applications",
      value: metrics.totalApplications.toString(),
      change: "+12 this week",
      icon: SvgUsers,
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      title: "Accepted Members",
      value: metrics.totalAccepted.toString(),
      change: "Reviewing metrics",
      icon: SvgCheck,
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "Success Rate",
      value: `${calculatedSuccessRate > 0 ? calculatedSuccessRate : 24}%`,
      change: "+5% vs last month",
      icon: SvgTrending,
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
    },
  ];

  if (sessionLoading || pageLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-xs font-mono font-bold text-slate-400 gap-2">
        <span className="loading loading-spinner loading-md text-blue-600"></span>
        <span>RESOLVING_CORPORATE_TELEMETRY...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-sm font-mono font-bold text-slate-400 tracking-widest uppercase">
        Access Denied // Authentication Sign-In Required
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8 pt-24 px-4 sm:px-6 lg:px-8 pb-12"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            Welcome back, {firstName}!{" "}
            <span className="animate-pulse select-none">👋</span>
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Here&apos;s what&apos;s happening with your startup today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncData}
            disabled={syncing}
            className="flex items-center gap-2 h-11 px-4 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all disabled:opacity-60"
          >
            <span
              className={`w-3.5 h-3.5 border-2 border-gray-300 border-t-blue-600 rounded-full ${syncing ? "animate-spin" : ""}`}
            />
            Sync Data
          </button>

          <button
            onClick={() => router.push("/founder/opportunities")}
            className="flex items-center gap-2 h-11 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.01] transition-all duration-200 uppercase tracking-tight"
          >
            <SvgPlus /> New Opportunity
          </button>
        </div>
      </motion.div>

      {/* Stats Cards Display Row Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${stat.bgLight} group-hover:scale-105 transition-transform duration-300 ${stat.textColor}`}
                >
                  <Icon />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <SvgArrowUp /> {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-1 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {stat.title}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Bottom Grid Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications Feed Deck */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                Recent Applications
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Latest candidates who applied to your roles
              </p>
            </div>
            <Link
              href="/founder/applications"
              className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <SvgArrowRight />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {recentApplications.length === 0 ? (
              <div className="text-center py-16 text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                No pipeline applications submitted to date.
              </div>
            ) : (
              recentApplications.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/40 transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0 pr-2">
                    <img
                      src={`https://i.pravatar.cc/150?u=${app.applicantId}`}
                      alt={app.applicantName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shrink-0 bg-slate-50"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                        {app.applicantName || "Ecosystem Talent"}
                      </p>
                      <p className="text-xs font-medium text-gray-400 truncate mt-0.5">
                        Applied for:{" "}
                        <span className="font-semibold text-gray-600">
                          {app.roleTitle}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs font-medium text-gray-400 hidden sm:block">
                      {new Date(app.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <div
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${getStatusStyles(app.status)}`}
                    >
                      {getStatusIcon(app.status)} {app.status || "Pending"}
                    </div>
                    <button
                      onClick={() => router.push("/founder/applications")}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <SvgDots />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Sidebar Actions & Progress Card panels */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4 tracking-tight">
              Quick Actions Hub
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Edit Startup Profile",
                  desc: "Update your company info",
                  color: "from-blue-500 to-cyan-400",
                  route: "/founder/startup-profile",
                },
                {
                  label: "Post a New Role",
                  desc: "Find your next co-founder",
                  color: "from-violet-500 to-purple-400",
                  route: "/founder/opportunities",
                },
                {
                  label: "Manage Core Team",
                  desc: "View accepted members",
                  color: "from-rose-500 to-pink-400",
                  route: "/founder/team",
                },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => router.push(action.route)}
                  className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${action.color} opacity-70 group-hover:opacity-100 transition-opacity`}
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {action.label}
                      </p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
            <h3 className="font-bold mb-2 relative z-10 text-sm">
              Profile Metrics Integrity
            </h3>
            <p className="text-xs text-blue-200/80 leading-relaxed mb-5 relative z-10">
              Complete your corporate workspace index layout parameters to
              optimize inbound co-founder discovery metrics.
            </p>

            <div className="relative z-10">
              <div className="flex justify-between text-[11px] font-mono font-bold mb-1.5">
                <span className="text-blue-200">PROGRESS_METRIC</span>
                <span className="text-white">75%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2 rounded-full shadow-md shadow-blue-500/30"
                />
              </div>
            </div>

            <button
              onClick={() => router.push("/founder/startup-profile")}
              className="mt-5 w-full py-2.5 bg-white/10 border border-white/20 hover:bg-white/20 text-xs font-bold rounded-xl transition-all relative z-10 uppercase tracking-tight"
            >
              Finish Profile
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FounderOverview;
