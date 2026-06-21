"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

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

// --- Mock Data ---
const recentApplications = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Frontend Developer",
    status: "Pending",
    time: "2 hours ago",
    avatar: "sarah",
  },
  {
    id: 2,
    name: "David Cho",
    role: "UI/UX Designer",
    status: "Accepted",
    time: "1 day ago",
    avatar: "david",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Backend Engineer",
    status: "Rejected",
    time: "3 days ago",
    avatar: "emily",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    role: "Growth Marketer",
    status: "Pending",
    time: "5 hours ago",
    avatar: "marcus",
  },
];

const statsData = [
  {
    title: "Total Opportunities",
    value: "12",
    change: "+3 this month",
    icon: SvgList,
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Total Applications",
    value: "48",
    change: "+12 this week",
    icon: SvgUsers,
    bgLight: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    title: "Accepted Members",
    value: "5",
    change: "2 pending review",
    icon: SvgCheck,
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    title: "Success Rate",
    value: "24%",
    change: "+5% vs last month",
    icon: SvgTrending,
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
];

// --- Main Component ---
const FounderOverview = () => {
  const [syncing, setSyncing] = useState(false);

  const handleSyncData = () => {
    setSyncing(true);
    toast.info("Syncing dashboard data...", { icon: "🔄" });
    setTimeout(() => {
      setSyncing(false);
      toast.success("Dashboard synced successfully!", { icon: "✅" });
    }, 1500);
  };

  const handleQuickAction = (action) =>
    toast(`Navigating to ${action}...`, { autoClose: 1500 });

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
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome back, Alex! <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Here&apos;s what&apos;s happening with your startup today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncData}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all disabled:opacity-60"
          >
            <span
              className={`w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full ${syncing ? "animate-spin" : ""}`}
            />
            Sync Data
          </button>

          <button
            onClick={() => handleQuickAction("Add Opportunity")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-200"
          >
            <SvgPlus /> New Opportunity
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
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
                  className={`p-3 rounded-xl ${stat.bgLight} group-hover:scale-110 transition-transform duration-300 text-${stat.textColor}`}
                >
                  <Icon />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <SvgArrowUp /> {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications Table */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Recent Applications
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Latest candidates who applied to your roles
              </p>
            </div>
            <button
              onClick={() => handleQuickAction("Applications")}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <SvgArrowRight />
            </button>
          </div>

          <div className="divide-y divide-gray-50">
            {recentApplications.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: app.id * 0.1 }}
                className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`https://i.pravatar.cc/150?u=${app.avatar}`}
                    alt={app.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {app.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Applied for: {app.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {app.time}
                  </span>
                  <div
                    className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyles(app.status)}`}
                  >
                    {getStatusIcon(app.status)} {app.status}
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <SvgDots />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions & Info Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                {
                  label: "Edit Startup Profile",
                  desc: "Update your company info",
                  color: "from-blue-500 to-cyan-400",
                },
                {
                  label: "Post a New Role",
                  desc: "Find your next co-founder",
                  color: "from-violet-500 to-purple-400",
                },
                {
                  label: "Manage Team",
                  desc: "View accepted members",
                  color: "from-rose-500 to-pink-400",
                },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => toast.info(`Opening: ${action.label}`)}
                  className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-8 rounded-full bg-gradient-to-b ${action.color} opacity-70 group-hover:opacity-100 transition-opacity`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {action.label}
                      </p>
                      <p className="text-xs text-gray-500">{action.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
            <h3 className="font-bold mb-2 relative z-10">Profile Completion</h3>
            <p className="text-sm text-blue-200 mb-4 relative z-10">
              Complete your profile to attract better talent.
            </p>

            <div className="relative z-10">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-blue-200">Progress</span>
                <span className="text-white">75%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-400 to-indigo-400 h-2.5 rounded-full shadow-lg shadow-blue-500/50"
                />
              </div>
            </div>

            <button
              onClick={() => toast.warning("Feature coming soon!")}
              className="mt-5 w-full py-2.5 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl text-sm font-medium transition-all relative z-10"
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
