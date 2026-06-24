"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SuccessStories() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image / Visual Side */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-2xl shadow-blue-500/30"
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </motion.div>
                <p className="text-white font-bold text-lg">TechNova AI</p>
                <p className="text-slate-500 text-sm mt-1">Series A Funded</p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full w-fit">
              Case Study
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              From Idea to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                $4M Valuation
              </span>{" "}
              in 14 Months
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              "StartupForge completely changed our trajectory. Within two weeks
              of posting our core requirements, we matched with a brilliant lead
              engineer and a fractional CFO. The quality of talent here is
              unmatched by traditional job boards."
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <img
                src="https://i.pravatar.cc/150?u=successfounder"
                alt="Founder"
                className="w-14 h-14 rounded-full ring-2 ring-emerald-500/30 object-cover"
              />
              <div>
                <p className="text-white font-bold">Sarah Jenkins</p>
                <p className="text-slate-500 text-sm">
                  CEO & Co-Founder, TechNova AI
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
