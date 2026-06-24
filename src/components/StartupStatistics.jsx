"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Active Startups",
    color: "text-blue-400",
  },
  {
    value: 50000,
    suffix: "+",
    label: "Global Collaborators",
    color: "text-cyan-400",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Successful Matches",
    color: "text-emerald-400",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    color: "text-violet-400",
  },
];

function AnimatedCounter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span
      ref={ref}
      className="text-5xl md:text-6xl font-black tracking-tighter"
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          {value.toLocaleString()}
          {suffix}
        </motion.span>
      ) : (
        "0"
      )}
    </span>
  );
}

export default function StartupStatistics() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Gradient Background Mesh */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center space-y-3"
              >
                <div
                  className={`bg-gradient-to-b from-slate-100/5 to-transparent py-4 rounded-xl ${stat.color}`}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
