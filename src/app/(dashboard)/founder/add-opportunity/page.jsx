"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";

const SvgHeaderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const SvgX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const SvgSend = () => (
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function AddOpportunity() {
  const [myStartups, setMyStartups] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    startupId: "",
    roleTitle: "",
    workType: "",
    commitmentLevel: "",
    deadline: "",
    industry: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch company options matching this founder identity account profile
  useEffect(() => {
    const loadCompanyProfiles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/startups/me", {
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setMyStartups(json.data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to populate startup parent directory contexts.");
      } finally {
        setPageLoading(false);
      }
    };
    loadCompanyProfiles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !skills.includes(newSkill)) {
        setSkills((prev) => [...prev, newSkill]);
        setSkillInput("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.startupId ||
      !formData.roleTitle ||
      !formData.workType ||
      !formData.commitmentLevel ||
      !formData.deadline ||
      skills.length === 0
    ) {
      toast.error(
        "Please specify a target startup company and complete all required metric input fields.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...formData, requiredSkills: skills }),
      });

      const result = await response.json();

      if (!response.ok || !result.success)
        throw new Error(
          result.error || "Server transaction processing failure.",
        );

      toast.success(
        "Opportunity pinned under startup identity successfully! 🚀",
      );
      setFormData({
        startupId: "",
        roleTitle: "",
        workType: "",
        commitmentLevel: "",
        deadline: "",
        industry: "",
      });
      setSkills([]);
    } catch (error) {
      toast.error(error.message || "Error deploying dataset matrix changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Guard Clause: Force founders to design a corporate company frame profile first
  if (myStartups.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center mt-16">
        <div className="max-w-md bg-white p-8 border rounded-3xl shadow-sm border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            No Startups Located
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            You must create a startup brand identity before you can deploy
            hiring assignments or roles.
          </p>
          <Link
            href="/dashboard/my-startup"
            className="btn btn-primary rounded-xl px-6 font-bold"
          >
            Create Startup Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-8 pt-24 px-4 pb-12 text-slate-800"
    >
      <motion.div variants={itemVariants} className="mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
            <SvgHeaderIcon />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Add Opportunity
            </h1>
            <p className="text-slate-500 mt-0.5">
              Publish a targeted open role under your corporate company
              directory framework.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm"
      >
        {/* CRITICAL DROP DOWN SELECTOR FOR CORPORATE ASSIGNMENT */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-slate-700">
              Select Target Startup Company{" "}
              <span className="text-error">*</span>
            </span>
          </label>
          <select
            name="startupId"
            value={formData.startupId}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="select select-bordered w-full bg-slate-50 border-slate-200 text-slate-900 font-semibold"
          >
            <option value="" disabled>
              Select which company this role belongs to...
            </option>
            {myStartups.map((company) => (
              <option key={company._id} value={company._id}>
                {company.startupName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-slate-700">
              Role Title <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            name="roleTitle"
            placeholder="e.g., Senior Full-Stack Lead Engineer"
            value={formData.roleTitle}
            onChange={handleInputChange}
            className="input input-bordered w-full bg-slate-50 border-slate-200 text-slate-900"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-slate-700">
              Required Skills <span className="text-error">*</span>
            </span>
          </label>
          <div className="min-h-[48px] input input-bordered w-full flex flex-wrap items-center gap-1.5 py-2 px-3 bg-slate-50 border-slate-200 focus-within:bg-white transition-all">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="badge bg-blue-50 text-blue-600 border-transparent font-bold gap-1 rounded px-2.5 py-2.5"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
                  className="text-red-500 font-black"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder={
                skills.length === 0
                  ? "Type skill tag entry and hit Enter..."
                  : "Add another..."
              }
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow outline-none bg-transparent min-w-[150px] h-8 text-slate-900 text-sm"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-bold text-slate-700">
                Work Type Allocation <span className="text-error">*</span>
              </span>
            </label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="select select-bordered w-full bg-slate-50 border-slate-200"
            >
              <option value="" disabled>
                Select workspace layout
              </option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="label">
              <span className="label-text font-bold text-slate-700">
                Commitment Metrics <span className="text-error">*</span>
              </span>
            </label>
            <select
              name="commitmentLevel"
              value={formData.commitmentLevel}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="select select-bordered w-full bg-slate-50 border-slate-200"
            >
              <option value="" disabled>
                Select agreement layer
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Equity">Equity</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-bold text-slate-700">
                Sector / Department
              </span>
            </label>
            <input
              type="text"
              name="industry"
              placeholder="e.g., Infrastructure, Growth (Optional)"
              value={formData.industry}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-slate-50 border-slate-200"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-bold text-slate-700">
                Closing Gate Calendar Deadline{" "}
                <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              required
              className="input input-bordered w-full bg-slate-50 border-slate-200 text-slate-900 font-medium"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="divider pt-2"></div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => toast.info("Action structural logging clean reset.")}
            className="btn btn-ghost text-slate-500 rounded-xl"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn bg-blue-600 hover:bg-blue-700 border-none font-bold text-white px-8 rounded-xl shadow-md shadow-blue-500/10"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <SvgSend /> Deploy Post
              </>
            )}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
