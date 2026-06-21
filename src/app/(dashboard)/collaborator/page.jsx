"use client";

import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const statsData = [
  {
    title: "Applied Roles",
    value: "8",
    change: "+2 this week",
    icon: SvgList,
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Under Review",
    value: "3",
    change: "Waiting for reply",
    icon: SvgClock,
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    title: "Accepted By",
    value: "2",
    change: "Ready to join!",
    icon: SvgCheck,
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    title: "Match Rate",
    value: "25%",
    change: "+5% vs last month",
    icon: SvgTrending,
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
  },
];

const recentActivity = [
  {
    id: 1,
    startup: "TechNova",
    role: "Frontend Dev",
    status: "Pending",
    time: "2 hours ago",
  },
  {
    id: 2,
    startup: "HealthBridge",
    role: "UI Designer",
    status: "Accepted",
    time: "1 day ago",
  },
  {
    id: 3,
    startup: "FinEdge",
    role: "Data Analyst",
    status: "Rejected",
    time: "3 days ago",
  },
];

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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8 pt-30 px-4 sm:px-6 lg:px-8 pb-12"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome back, Jane! <span className="animate-pulse">✨</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Track your applications and discover new startup roles.
          </p>
        </div>
        <Link href="/opportunities">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-200"
          >
            <SvgSend /> Explore Opportunities
          </motion.button>
        </Link>
      </motion.div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Recent Activity
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Your latest job applications
              </p>
            </div>
            <Link
              href="/collaborator/my-applications"
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <SvgArrowRight />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {app.role}
                  </p>
                  <p className="text-xs text-gray-500">
                    at {app.startup} • {app.time}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyles(app.status)}`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden h-fit"
        >
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
          <h3 className="font-bold mb-2 relative z-10">Pro Tip 💡</h3>
          <p className="text-sm text-blue-200 mb-6 relative z-10">
            Startups love candidates who attach a portfolio link. Make sure
            yours is up to date!
          </p>
          <button
            onClick={() => toast.info("Redirecting to profile...")}
            className="w-full py-2.5 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl text-sm font-medium transition-all relative z-10"
          >
            Update Profile
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CollaboratorOverview;
