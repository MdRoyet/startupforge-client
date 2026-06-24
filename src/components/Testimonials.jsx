"use client";

import React from "react";
import { motion } from "framer-motion";

const SvgQuote = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-blue-500/20"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const testimonials = [
  {
    name: "David Cho",
    role: "Full-Stack Developer",
    text: "I was tired of corporate life. StartupForge connected me with an EdTech startup that perfectly aligned with my desire to build impactful educational tools. The process was incredibly smooth.",
    avatar: "davidcho",
  },
  {
    name: "Emily Davis",
    role: "UI/UX Designer",
    text: "The caliber of founders on this platform is phenomenal. I applied to three startups, got accepted by two, and chose the one that resonated with my design philosophy. No recruiters, just direct access.",
    avatar: "emilydavis",
  },
  {
    name: "Marcus Johnson",
    role: "Growth Marketer",
    text: "Finding a co-founder is like dating. StartupForge made it easier by showing me founders who valued marketing from day one, not as an afterthought. Highly recommend for early-stage builders.",
    avatar: "marcusjohnson",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#080d19]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-4 block">
            Trusted by Builders
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            What Collaborators Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-violet-500/30 transition-all duration-300 flex flex-col"
            >
              <SvgQuote />
              <p className="text-slate-300 text-sm leading-relaxed mt-4 flex-1 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                <img
                  src={`https://i.pravatar.cc/150?u=${t.avatar}`}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                />
                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
