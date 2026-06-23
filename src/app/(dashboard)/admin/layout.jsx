"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

// --- INLINE SYSTEM SVG ICONS MATCHING YOUR SIDEBAR ---
const SvgLogo = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    className="text-purple-600"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
const SvgOverview = () => (
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
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);
const SvgUsers = () => (
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
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const SvgStartups = () => (
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
    <path d="M12 2s8 3 8 7c0 6-8 11-8 11S4 15 4 9c0-4 8-7 8-7z" />
  </svg>
);
const SvgTransactions = () => (
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
    <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);
const SvgProfile = () => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  // Sidebar link definitions mapping directly to your dynamic routes
  const navigationItems = [
    { name: "Overview", href: "/admin", icon: <SvgOverview /> },
    { name: "Manage Users", href: "/admin/users", icon: <SvgUsers /> },
    { name: "Manage Startups", href: "/admin/startups", icon: <SvgStartups /> },
    {
      name: "Transactions",
      href: "/admin/transactions",
      icon: <SvgTransactions />,
    },
    { name: "Profile", href: "/admin/profile", icon: <SvgProfile /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-800 antialiased">
      {/* Left Navigation Sidebar Drawer */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 fixed h-full z-20">
        <div>
          {/* Brand Branding Row */}
          <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
                <SvgLogo />
              </div>
              <Link
                href="/"
                className="font-bold text-slate-900 tracking-tight text-base"
              >
                StartupForge
              </Link>
            </div>
          </div>

          {/* Connected User Profile Segment */}
          <div className="px-6 py-6 border-b border-slate-100/60 flex items-center gap-3">
            <img
              src={user?.image || "https://i.pravatar.cc/150?img=33"}
              className="w-10 h-10 rounded-full border border-slate-200/80 bg-slate-50 object-cover"
              alt="Admin Signature Marks"
            />
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm truncate leading-tight">
                {user?.name || "Admin User"}
              </h4>
              <span className="inline-flex items-center px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-md uppercase tracking-wider mt-1 border border-purple-100/40">
                admin
              </span>
            </div>
          </div>

          {/* Navigation Action Roster */}
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                    isActive
                      ? "bg-purple-50/80 text-purple-700 font-bold"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={isActive ? "text-purple-600" : "text-slate-400"}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Console Sticky Info Footer */}
        <div className="p-4 border-t border-slate-100 text-[11px] font-mono text-slate-400 font-bold bg-slate-50/50">
          CORE_NODE // SECURE_CONNECTED
        </div>
      </aside>

      {/* Main Right Content Panel Port viewport container */}
      <main className="flex-1 pl-64 min-w-0 min-h-screen flex flex-col">
        <div className="p-8 lg:p-10 max-w-7xl w-full mx-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
