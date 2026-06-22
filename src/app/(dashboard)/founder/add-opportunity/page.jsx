"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// --- INLINE SVG ICONS ---
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

const AddOpportunity = () => {
  const [formData, setFormData] = useState({
    roleTitle: "",
    workType: "",
    commitmentLevel: "",
    deadline: "",
    industry: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      } else if (skills.includes(newSkill)) {
        toast.warn("Skill already appended to this list matrix!");
      }
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // CONNECTED TO BACKEND API ROUTINES
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.roleTitle ||
      !formData.workType ||
      !formData.commitmentLevel ||
      !formData.deadline ||
      skills.length === 0
    ) {
      toast.error(
        "Please fill all fields and add at least one metric tag requirement skill attribute.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleTitle: formData.roleTitle,
          requiredSkills: skills,
          workType: formData.workType,
          commitmentLevel: formData.commitmentLevel,
          deadline: formData.deadline,
          industry: formData.industry,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Server validation execution tracking error properties failed.",
        );
      }

      toast.success(
        "Opportunity posted successfully to active talent nodes! 🚀",
      );

      setFormData({
        roleTitle: "",
        workType: "",
        commitmentLevel: "",
        deadline: "",
        industry: "",
      });
      setSkills([]);
    } catch (error) {
      console.error(error);
      toast.error(
        error.message ||
          "Communication loop failure to database collections mapping routes.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8 pt-24 px-4 sm:px-6 lg:px-8 pb-12"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-500/30">
            <SvgHeaderIcon />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Add New Opportunity
            </h1>
            <p className="text-gray-500 mt-1">
              Fill in the details to find your next perfect team member.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              Role Title <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="text"
            name="roleTitle"
            placeholder="e.g., Senior Frontend Developer"
            value={formData.roleTitle}
            onChange={handleInputChange}
            className="input input-bordered w-full bg-gray-50/50 hover:bg-white text-gray-800 font-medium"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              Required Skills <span className="text-error">*</span>
            </span>
          </label>
          <div className="min-h-[48px] input input-bordered w-full flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-primary/30 transition-all bg-gray-50/50 hover:bg-white px-3 py-2">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="badge bg-blue-50 text-blue-700 border-blue-200 pl-3 pr-1 py-2 text-sm font-medium flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="p-0.5 rounded-full hover:bg-blue-200 text-blue-500"
                >
                  <SvgX />
                </button>
              </motion.span>
            ))}
            <input
              type="text"
              placeholder={
                skills.length === 0
                  ? "Type a skill and press Enter..."
                  : "Add another..."
              }
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-[150px] bg-transparent border-none outline-none h-8 text-sm text-gray-800 placeholder:text-gray-400"
              disabled={isSubmitting}
            />
          </div>
          <label className="label">
            <span className="label-text-alt text-gray-400">
              Press Enter or comma to append structural requirements tokens
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Work Type <span className="text-error">*</span>
              </span>
            </label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleInputChange}
              className="select select-bordered w-full bg-gray-50/50 hover:bg-white text-gray-800 font-medium"
              required
              disabled={isSubmitting}
            >
              <option disabled value="">
                Select work type
              </option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Commitment Level <span className="text-error">*</span>
              </span>
            </label>
            <select
              name="commitmentLevel"
              value={formData.commitmentLevel}
              onChange={handleInputChange}
              className="select select-bordered w-full bg-gray-50/50 hover:bg-white text-gray-800 font-medium"
              required
              disabled={isSubmitting}
            >
              <option disabled value="">
                Select commitment
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Equity">Equity</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Industry
              </span>
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="select select-bordered w-full bg-gray-50/50 hover:bg-white text-gray-800 font-medium"
              disabled={isSubmitting}
            >
              <option disabled value="">
                Select industry (Optional)
              </option>
              <option value="Tech">Tech</option>
              <option value="Healthcare">Healthcare</option>
              <option value="FinTech">FinTech</option>
              <option value="EdTech">EdTech</option>
              <option value="E-commerce">E-commerce</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Application Deadline <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-gray-50/50 hover:bg-white text-gray-800 font-medium"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="divider m-0"></div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => toast.info("Action cancelled")}
            className="btn btn-ghost text-gray-500 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none shadow-lg shadow-blue-500/30 min-w-[180px]"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <SvgSend />
                Post Opportunity
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default AddOpportunity;
