"use client";

import React from "react";
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

const FounderSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

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

  return (
    <aside className="h-screen w-72 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white flex flex-col shadow-2xl overflow-y-auto scrollbar-hide">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <Link href="/founder" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
            <Briefcase width={22} height={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">StartupForge</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">
              Founder Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
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
                    ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-white shadow-lg shadow-blue-900/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Active Indicator Bar */}
                {active && (
                  <motion.div
                    layoutId="activeSidebarTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    active ? "bg-blue-500/20" : "group-hover:bg-white/10"
                  }`}
                >
                  <Icon
                    width={20}
                    height={20}
                    className={active ? "text-blue-400" : ""}
                  />
                </div>

                <div className="flex-1">
                  <span className="text-sm font-medium">{link.name}</span>
                  <p className="text-[10px] text-white/40 group-hover:text-white/60 hidden lg:block">
                    {link.description}
                  </p>
                </div>

                {active && (
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade / Premium Card */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl p-4">
          <h3 className="font-bold text-sm text-white">Upgrade to Pro</h3>
          <p className="text-xs text-white/50 mt-1 mb-3">
            Unlock unlimited opportunity postings.
          </p>
          <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* User Profile / Logout Section (Matches image_103dea.png perfectly) */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src={
                user?.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/50"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1a1a2e]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.name || "Loading..."}
            </p>
            <p className="text-xs text-white/40 truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
        >
          <ArrowRightFromSquare width={14} height={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default FounderSidebar;
