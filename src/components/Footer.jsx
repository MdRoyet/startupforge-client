"use client";

import React, { useState } from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 mt-auto">
      {/* 1. TOP SECTION: Newsletter & CTA */}
      <div className="bg-primary/5 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Want the latest startup opportunities?
            </h2>
            <p className="mt-3 text-base opacity-80 max-w-xl">
              Join our newsletter to receive weekly updates on featured
              startups, new co-founder openings, and exclusive platform
              insights.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:w-1/2 lg:flex lg:justify-end">
            <form
              onSubmit={handleSubscribe}
              className="sm:flex w-full max-w-md"
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full sm:max-w-xs focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="btn btn-primary w-full flex items-center gap-2"
                  disabled={subscribed}
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                  {!subscribed && (
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
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-bold text-primary group transition-all"
            >
              <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <span className="tracking-tight">StartupForge</span>
            </Link>
            <p className="text-base opacity-75 max-w-sm leading-relaxed">
              The premier ecosystem bridging visionaries and executors. We
              provide the tools for founders to build elite teams and for talent
              to find their next big venture.
            </p>

            {/* Social Links[cite: 1] */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="btn btn-circle btn-sm btn-ghost bg-base-300 hover:bg-primary hover:text-primary-content transition-all"
                aria-label="Twitter"
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
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="btn btn-circle btn-sm btn-ghost bg-base-300 hover:bg-primary hover:text-primary-content transition-all"
                aria-label="LinkedIn"
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
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#"
                className="btn btn-circle btn-sm btn-ghost bg-base-300 hover:bg-primary hover:text-primary-content transition-all"
                aria-label="GitHub"
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
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links (Quick Links)[cite: 1] */}
          <div>
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Platform
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/opportunities"
                  className="text-base opacity-75 hover:opacity-100 hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link
                  href="/startups"
                  className="text-base opacity-75 hover:opacity-100 hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Explore Startups
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-base opacity-75 hover:opacity-100 hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Post a Job{" "}
                  <span className="badge badge-sm badge-primary badge-outline ml-2">
                    Founders
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-base opacity-75 hover:opacity-100 hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-base opacity-75 hover:opacity-100 hover:text-secondary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base opacity-75 hover:opacity-100 hover:text-secondary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Pricing & Premium
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base opacity-75 hover:opacity-100 hover:text-secondary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base opacity-75 hover:opacity-100 hover:text-secondary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  API Documentation{" "}
                  <span className="badge badge-sm badge-neutral ml-2">New</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information[cite: 1] */}
          <div>
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="bg-base-300 p-2 rounded-lg text-primary mt-1">
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
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Email Support</p>
                  <a
                    href="mailto:support@startupforge.com"
                    className="text-sm opacity-75 hover:text-primary transition-colors"
                  >
                    support@startupforge.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-base-300 p-2 rounded-lg text-primary mt-1">
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
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Phone Inquiries</p>
                  <a
                    href="tel:+15550192834"
                    className="text-sm opacity-75 hover:text-primary transition-colors"
                  >
                    +1 (555) 019-2834
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-base-300 p-2 rounded-lg text-primary mt-1">
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
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Headquarters</p>
                  <p className="text-sm opacity-75">
                    124 Innovation Drive
                    <br />
                    Silicon Valley, CA 94025
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: Copyright & Legal[cite: 1] */}
      <div className="border-t border-base-300 bg-base-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70 text-center md:text-left">
            &copy; {currentYear} StartupForge Platform. All rights reserved.
            Built with passion for founders and creators.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium opacity-70">
            <a
              href="#"
              className="hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
