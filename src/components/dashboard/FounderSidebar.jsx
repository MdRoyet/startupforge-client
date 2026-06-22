"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  Briefcase,
  LayoutHeaderCursor,
  CirclePlus,
  ListCheck,
  Person,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";

// --- INLINE DESIGN SYSTEM ICONS ---
const SvgCrownGold = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fbbf24"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
    <path d="M3 20h18" />
  </svg>
);

const SvgShieldCheck = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10b981"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 11 11 13 15 9" />
  </svg>
);

const FounderSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  // Track subscription parameters dynamically
  const [userPlan, setUserPlan] = useState("Free");
  const [upgrading, setUpgrading] = useState(false);

  // Founder navigation links
  const navLinks = [
    {
      name: "Overview",
      path: "/founder",
      icon: LayoutHeaderCursor,
      description: "Stats & insights",
    },
    {
      name: "My Startup",
      path: "/founder/my-startup",
      icon: Briefcase,
      description: "Company profile",
    },
    {
      name: "Add Opportunity",
      path: "/founder/add-opportunity",
      icon: CirclePlus,
      description: "Post new roles",
    },
    {
      name: "Manage Opportunities",
      path: "/founder/manage-opportunities",
      icon: ListCheck,
      description: "Edit or delete",
    },
    {
      name: "Applications",
      path: "/founder/applications",
      icon: Person,
      description: "Review candidates",
    },
  ];

  // Sync Live Profile Status on startup mount cycles
  useEffect(() => {
    const checkSubscriptionTier = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/founder/overview", {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success && json.data?.plan) {
          setUserPlan(json.data.plan);
        }
      } catch (err) {
        console.error("Failed to sync structural sidebar properties:", err);
      }
    };

    if (user) {
      checkSubscriptionTier();
    }
  }, [user, pathname]);

  const isActive = (path) => {
    if (path === "/founder") return pathname === "/founder";
    return pathname?.startsWith(path);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully.");
    router.push("/login");
    router.refresh();
  };

  // --- DISPATCH HIGH LEVEL CHECKOUT SESSION ENGINES ---
  const handleUpgradeToPro = async () => {
    if (!user?.email) {
      toast.error(
        "Authentication Context Error: Active user email parameter is missing.",
      );
      return;
    }

    setUpgrading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "founder",
          email: user.email,
        }),
      });
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

  return (
    <aside className="h-screen w-72 bg-gradient-to-b from-[#0f0f1a] to-[#121224] text-white flex flex-col shadow-2xl overflow-y-auto scrollbar-hide border-r border-white/[0.03]">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <Briefcase width={22} height={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              StartupForge
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">
              Founder Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="text-xs font-semibold text-white/30 uppercase tracking-wider px-3 mb-3">
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group relative ${
                  active
                    ? "bg-gradient-to-r from-blue-600/15 to-indigo-600/5 text-white border border-blue-500/20"
                    : "text-white/50 hover:text-white hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeSidebarTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-blue-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div
                  className={`p-2 rounded-lg transition-colors duration-200 ${active ? "bg-blue-500/10" : "group-hover:bg-white/5"}`}
                >
                  <Icon
                    width={18}
                    height={18}
                    className={active ? "text-blue-400" : ""}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium block truncate">
                    {link.name}
                  </span>
                  <p className="text-[10px] text-white/30 group-hover:text-white/50 hidden lg:block truncate">
                    {link.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Dynamic Membership State Block Container */}
      <div className="px-4 mb-4">
        {userPlan === "Pro" ? (
          /* 🔥 HIGH-END PRO ACTIVATED CARD STATE */
          <div className="bg-gradient-to-br from-emerald-950/30 to-slate-900/40 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 shadow-md">
              <SvgShieldCheck />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase font-mono block">
                Pro Tier Active
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5 truncate">
                200 Roles Unlocked
              </h4>
            </div>
          </div>
        ) : (
          /* 💎 GLOWING PREMIUM UPGRADE PROMPT CARD STATE */
          <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/30 border border-indigo-500/20 rounded-2xl p-4 relative overflow-hidden shadow-xl group">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors" />

            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wider mb-1.5 font-mono">
              <SvgCrownGold />
              <span>Forge Premium</span>
            </div>

            <h3 className="font-black text-sm text-white tracking-tight">
              Upgrade to Pro
            </h3>
            <p className="text-[11px] text-slate-400/80 mt-0.5 mb-3 leading-relaxed">
              Scale your pipeline workspace limits from 10 to 200 active
              opportunity postings.
            </p>

            <button
              onClick={handleUpgradeToPro}
              disabled={upgrading}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:from-slate-800 disabled:to-slate-900 flex items-center justify-center min-h-[32px]"
            >
              {upgrading ? (
                <span className="loading loading-spinner loading-xs text-white"></span>
              ) : (
                "Upgrade Now"
              )}
            </button>
          </div>
        )}
      </div>

      {/* User Profile / Logout Section */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src={
                user?.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              }
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f0f1a]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">
              {user?.name || "Loading..."}
            </p>
            <p className="text-xs text-slate-500 truncate mt-0.5">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-red-400/80 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all duration-200"
        >
          <ArrowRightFromSquare width={14} height={14} />
          Sign Out Dashboard
        </button>
      </div>
    </aside>
  );
};

export default FounderSidebar;
