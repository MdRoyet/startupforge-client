"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();

  // --- State Management ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Effects ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const publicRoutes = [
    {
      name: "Home",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      name: "Browse Startups",
      path: "/startups",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 3.82-13.04L14 3l1 2 2 1 4.04-1.18a22 22 0 0 1-13.04 3.82z" />
          <circle cx="17.5" cy="6.5" r=".5" />
        </svg>
      ),
    },
    {
      name: "Browse Opportunities",
      path: "/opportunities",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* --- DESKTOP & TABLET NAVBAR --- */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-base-100/80 backdrop-blur-lg border-base-200 shadow-sm py-2"
            : "bg-base-100 border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Left: Brand Logo & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="btn btn-ghost btn-circle lg:hidden"
                aria-label="Open mobile menu"
              >
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
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>

              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
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
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
                  StartupForge
                </span>
              </Link>
            </div>

            {/* Center: Desktop Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {publicRoutes.map((route) => (
                <Link
                  key={route.name}
                  href={route.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    isActive(route.path)
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  }`}
                >
                  {route.icon}
                  {route.name}
                </Link>
              ))}
            </nav>

            {/* Right: Framer Motion Animated Gradient Login Button */}
            <div className="hidden sm:flex items-center relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="/login"
                  className="relative flex items-center justify-center gap-2 px-8 py-2.5 rounded-full text-white font-bold overflow-hidden shadow-lg"
                >
                  {/* Vibrant Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_auto] hover:animate-gradient transition-all duration-500"></div>

                  {/* Button Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    Login
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE OFF-CANVAS DRAWER --- */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Dark Overlay */}
        <div
          className="absolute inset-0 bg-neutral/80 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 left-0 w-[85%] max-w-sm h-full bg-base-100 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-base-200">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="bg-primary/10 text-primary p-1.5 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-base-content">
                StartupForge
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-sm btn-circle btn-ghost bg-base-200"
            >
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
            <p className="px-4 text-xs font-bold uppercase tracking-wider text-base-content/50 mb-2">
              Menu
            </p>
            {publicRoutes.map((route) => (
              <Link
                key={route.name}
                href={route.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold text-lg transition-colors ${
                  isActive(route.path)
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/80 hover:bg-base-200"
                }`}
              >
                <div
                  className={`p-2 rounded-xl ${isActive(route.path) ? "bg-primary/20" : "bg-base-200"}`}
                >
                  {route.icon}
                </div>
                {route.name}
              </Link>
            ))}
          </div>

          {/* Drawer Bottom Action: Mobile Gradient Login */}
          <div className="p-6 border-t border-base-200 bg-base-50">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="relative flex items-center justify-center gap-2 w-full h-14 rounded-xl text-white font-bold overflow-hidden shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500"></div>
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  Login
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
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
