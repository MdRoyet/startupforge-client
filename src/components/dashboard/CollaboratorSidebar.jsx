"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// --- INLINE SVG ICONS ---
const SvgLogo = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const SvgGrid = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);
const SvgCompass = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
const SvgList = () => (
  <svg
    width="20"
    height="20"
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
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const SvgUser = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const SvgLogout = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const CollaboratorSidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Overview",
      path: "/collaborator",
      icon: SvgGrid,
      description: "Stats & insights",
    },
    {
      name: "Browse Opportunities",
      path: "/opportunities",
      icon: SvgCompass,
      description: "Find your next role",
    },
    {
      name: "My Applications",
      path: "/collaborator/my-applications",
      icon: SvgList,
      description: "Track your progress",
    },
    {
      name: "Profile",
      path: "/collaborator/profile",
      icon: SvgUser,
      description: "Edit your info",
    },
  ];

  const isActive = (path) => {
    if (path === "/collaborator") return pathname === "/collaborator";
    return pathname?.startsWith(path);
  };

  return (
    <aside className="h-screen w-72 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white flex flex-col shadow-2xl overflow-y-auto scrollbar-hide">
      <div className="p-6 border-b border-white/10">
        <Link href="/collaborator" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300">
            <SvgLogo />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">StartupForge</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
              Collaborator Panel
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 mb-3">
          Main Menu
        </p>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);
          return (
            <Link key={link.path} href={link.path}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group relative ${
                  active
                    ? "bg-gradient-to-r from-emerald-600/20 to-teal-600/10 text-white shadow-lg shadow-emerald-900/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeCollabTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div
                  className={`p-2 rounded-lg transition-colors duration-200 ${active ? "bg-emerald-500/20" : "group-hover:bg-white/10"}`}
                >
                  <Icon />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium">{link.name}</span>
                  <p className="text-[10px] text-white/40 group-hover:text-white/60 hidden lg:block">
                    {link.description}
                  </p>
                </div>
                {active && (
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?u=jane"
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1a1a2e]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              Jane Doe
            </p>
            <p className="text-xs text-white/40 truncate">jane@collab.com</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200">
          <SvgLogout /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default CollaboratorSidebar;
