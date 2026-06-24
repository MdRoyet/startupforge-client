"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

// --- INLINE DESIGN SYSTEM GLYPHS ---
const SvgSend = () => (
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const SvgArrowRight = () => (
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
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const SvgCheck = () => (
  <svg
    width="24"
    height="24"
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
const SvgList = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const SvgClock = () => (
  <svg
    width="24"
    height="24"
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
const SvgTrending = () => (
  <svg
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
const SvgSparkles = () => (
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
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
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

const CollaboratorOverview = () => {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  const [metrics, setMetrics] = useState({
    totalApplied: 0,
    totalAccepted: 0,
    totalPending: 0,
    plan: "Free", // Default layout tier fallback parameters
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  const firstName = user?.name ? user.name.split(" ")[0] : "User";

  // --- SYNC LIVE ANALYTICS DATA STREAMS ---
  useEffect(() => {
    const fetchDashboardTelemetry = async () => {
      try {
        const [metricsRes, applicationsRes] = await Promise.all([
          fetch(
            "https://startupforge-server-ten.vercel.app/api/collaborator/overview",
            {
              credentials: "include",
            },
          ),
          fetch("https://startupforge-server-ten.vercel.app/api/applications", {
            credentials: "include",
          }),
        ]);

        const mJson = await metricsRes.json();
        const aJson = await applicationsRes.json();

        if (mJson.success) setMetrics(mJson.data);
        if (aJson.success) {
          setRecentActivity(aJson.data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to compile dashboard metrics registries.");
      } finally {
        setPageLoading(false);
      }
    };

    if (user) {
      fetchDashboardTelemetry();
    } else if (!sessionLoading && !user) {
      setPageLoading(false);
    }
  }, [user, sessionLoading]);

  // --- DYNAMIC PLAN CEILING RESOLUTION LOGIC ---
  const isProPlan = metrics.plan === "Pro";
  const applicationLimit = isProPlan ? 100 : 3;
  const usagePercentage = Math.min(
    Math.round((metrics.totalApplied / applicationLimit) * 100),
    100,
  );

  // Compute platform validation score allocation metrics mapping layout
  const matchRate =
    metrics.totalApplied > 0
      ? Math.round((metrics.totalAccepted / metrics.totalApplied) * 100)
      : 0;

  // Construct contextually reactive state models deck array
  const statsData = [
    {
      title: "Applied Roles",
      value: metrics.totalApplied.toString(),
      change: "+2 this week",
      icon: SvgList,
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Under Review",
      value: metrics.totalPending.toString(),
      change: "Waiting for reply",
      icon: SvgClock,
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      title: "Accepted By",
      value: metrics.totalAccepted.toString(),
      change: "Ready to join!",
      icon: SvgCheck,
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "Match Rate",
      value: `${matchRate > 0 ? matchRate : 25}%`,
      change: "+5% vs last month",
      icon: SvgTrending,
      bgLight: "bg-violet-50",
      textColor: "text-violet-600",
    },
  ];

  // --- STRIPE DESK CHECKOUT ENGINE DISPATCH TRACE ---
  const handleUpgradeToPro = async () => {
    if (!user?.email) {
      toast.error(
        "Authentication Context Error: Active user email parameter is missing.",
      );
      return;
    }

    setUpgrading(true);
    try {
      const res = await fetch(
        "https://startupforge-server-ten.vercel.app/api/checkout",
        {
          method: "POST",

          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: "collaborator",
            email: user?.email, // 👈 PASSING LOGGED-IN EMAIL TO NEXT.JS API
          }),
        },
      );
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Fulfillment token parsing failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.message || "Failed to initialize stripe billing portal window.",
      );
    } finally {
      setUpgrading(false);
    }
  };

  if (sessionLoading || pageLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-xs font-mono font-bold text-slate-400 gap-2">
        <span className="loading loading-spinner loading-md text-emerald-600"></span>
        <span>Assembling Workspace Parameters...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-sm font-mono font-bold text-slate-400 tracking-widest uppercase">
        Access Denied // Authentication Credentials Missing
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8 pt-30 px-4 sm:px-6 lg:px-8 pb-12"
    >
      {/* Top Welcoming Callout Banner Block */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">
            Welcome back, {firstName}!{" "}
            <span className="animate-pulse select-none">✨</span>
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Track your applications and discover new startup roles.
          </p>
        </div>
        <Link href="/opportunities">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-200 uppercase tracking-tight"
          >
            <SvgSend /> Explore Opportunities
          </motion.button>
        </Link>
      </motion.div>

      {/* Dynamic Performance Counters Deck Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${stat.bgLight} group-hover:scale-110 transition-transform duration-300 ${stat.textColor}`}
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

      {/* Grid Split Lower Panel Area Section Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Subsection Grid Segment: Recent Applications Audit Logs Stream */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">
                Recent Activity
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Your latest job applications updates status
              </p>
            </div>
            <Link
              href="/collaborator/my-applications"
              className="text-sm font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <SvgArrowRight />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {recentActivity.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                No recent workspace activity streams recorded.
              </div>
            ) : (
              recentActivity.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="min-w-0 pr-4">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {app.roleTitle}
                    </p>
                    <p className="text-xs font-medium text-gray-400 mt-0.5 truncate">
                      at {app.startupName || "Startup Partner"} • Applied on{" "}
                      {new Date(app.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 tracking-wide uppercase ${getStatusStyles(app.status)}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Right Subsection Grid Segment: Upgraded Application Usage Allocation Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden h-fit flex flex-col justify-between space-y-6"
        >
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <SvgSparkles />
              <span>Ecosystem Plan Thresholds</span>
            </div>

            <div>
              <h3 className="font-black text-lg text-white">
                {isProPlan ? "Forge Premium Account" : "Standard Free Account"}
              </h3>
              <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">
                {isProPlan
                  ? "Absolute system scale clearance unlocked. Enjoy priority dispatch options on all submitted co-founder requests."
                  : "Upgrade your profile status parameters to instantly unlock an application quota expansion up to 100 openings."}
              </p>
            </div>

            {/* Dynamic Usage Meter Progress Bar Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] font-bold font-mono mb-1.5">
                <span className="text-blue-200">APPLICATION_USAGE</span>
                <span className="text-white">
                  {metrics.totalApplied} / {applicationLimit} Roles
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${usagePercentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full"
                />
              </div>
            </div>
          </div>

          {!isProPlan && (
            <button
              onClick={handleUpgradeToPro}
              disabled={upgrading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-500 text-slate-950 text-xs font-black rounded-xl transition-all relative z-10 uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center min-h-[44px]"
            >
              {upgrading ? (
                <span className="loading loading-spinner loading-xs text-slate-950"></span>
              ) : (
                "Upgrade to Pro Status"
              )}
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CollaboratorOverview;
