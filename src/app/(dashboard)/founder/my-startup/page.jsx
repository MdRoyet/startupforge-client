"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// --- INLINE SVG ICONS ---
const SvgBuilding = () => (
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
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="9" y1="22" x2="9" y2="16"></line>
    <line x1="15" y1="22" x2="15" y2="16"></line>
    <line x1="9" y1="16" x2="15" y2="16"></line>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M16 10h.01"></path>
  </svg>
);
const SvgMail = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);
const SvgTag = () => (
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
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);
const SvgCoins = () => (
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
    <circle cx="8" cy="8" r="6"></circle>
    <circle cx="18" cy="18" r="4"></circle>
    <line x1="12" y1="12" x2="14" y2="14"></line>
  </svg>
);
const SvgUpload = () => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);
const SvgLoader = () => (
  <svg
    className="animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

// --- Animation Variants ---
const formVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function CreateStartup() {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    startupName: "",
    logoUrl: "",
    industry: "",
    fundingStage: "",
    founderEmail: "",
    description: "",
  });

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ImgBB Upload Flow
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image format & size (Max 5MB)
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      return;
    }

    setIsUploading(true);
    const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!imgbbApiKey) {
      toast.error("ImgBB API Key missing in environment config.");
      setIsUploading(false);
      return;
    }

    const bodyData = new FormData();
    bodyData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: bodyData,
        },
      );
      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, logoUrl: data.data.url }));
        toast.success("Logo securely hosted on ImgBB!");
      } else {
        toast.error(data.error?.message || "Upload process failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication error with ImgBB.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Quick validation checks
    if (!formData.logoUrl) {
      toast.error("Please upload a startup company logo first.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API storage delay
    setTimeout(() => {
      console.log("Startup Submission Payload:", formData);
      toast.success("🚀 Startup profile provisioned successfully!");
      setIsSubmitting(false);

      // Optional Reset
      setFormData({
        startupName: "",
        logoUrl: "",
        industry: "",
        fundingStage: "",
        founderEmail: "",
        description: "",
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Launch Your Concept
        </h1>
        <p className="text-gray-500 mt-2">
          Create a powerful startup profile to start tracking metrics, listing
          open roles, and sourcing talent.
        </p>
      </div>

      {/* Main Dynamic Form Card */}
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden p-6 sm:p-10"
      >
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* LOGO UPLOAD COMPONENT */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Startup Brand Logo <span className="text-red-500">*</span>
            </label>

            <div
              onClick={() => !isUploading && fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer text-center relative flex flex-col items-center justify-center min-h-[140px] ${
                formData.logoUrl
                  ? "border-emerald-300 bg-emerald-50/20"
                  : "border-gray-200 hover:border-blue-400 hover:bg-gray-50/50"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                className="hidden"
                accept="image/*"
              />

              {isUploading ? (
                <div className="text-blue-600 flex flex-col items-center gap-2">
                  <SvgLoader />
                  <span className="text-sm font-medium text-gray-500">
                    Processing media asset via ImgBB...
                  </span>
                </div>
              ) : formData.logoUrl ? (
                <div className="flex items-center gap-5 w-full max-w-sm px-4">
                  <img
                    src={formData.logoUrl}
                    alt="Uploaded Logo Preview"
                    className="w-16 h-16 rounded-xl object-contain bg-white shadow-md border border-gray-100"
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold text-emerald-800">
                      Hosting Configured
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">
                      {formData.logoUrl}
                    </p>
                    <span className="text-xs text-blue-600 underline mt-1 block">
                      Click to replace
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 hover:text-gray-600 flex flex-col items-center transition-colors">
                  <SvgUpload />
                  <p className="text-sm font-semibold text-gray-700 mt-3">
                    Select a corporate brand image
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, or GIF accepted (max 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* TWO-COLUMN CONFIGURATION FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Startup Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Startup Name <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <SvgBuilding />
                </div>
                <input
                  type="text"
                  name="startupName"
                  required
                  value={formData.startupName}
                  onChange={handleInputChange}
                  placeholder="e.g., Stripe, Acclaim Corp"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 text-sm placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Founder Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Founder Contact Email <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <SvgMail />
                </div>
                <input
                  type="email"
                  name="founderEmail"
                  required
                  value={formData.founderEmail}
                  onChange={handleInputChange}
                  placeholder="alex@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 text-sm placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Industry Choice Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Target Market / Industry <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <SvgTag />
                </div>
                <select
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Core Sector...
                  </option>
                  <option value="SaaS & Software">SaaS & Software</option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Fintech">Fintech</option>
                  <option value="Healthcare & BioTech">
                    Healthcare & BioTech
                  </option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="CleanTech & Energy">CleanTech & Energy</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Funding Stage Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">
                Current Funding Status <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <SvgCoins />
                </div>
                <select
                  name="fundingStage"
                  required
                  value={formData.fundingStage}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Current Tier...
                  </option>
                  <option value="Bootstrapped">Bootstrapped</option>
                  <option value="Pre-Seed">Pre-Seed</option>
                  <option value="Seed Capital">Seed Capital</option>
                  <option value="Series A+">Series A+</option>
                  <option value="Crowdfunded / Other">
                    Crowdfunded / Other
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Description Textarea Block */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">
              Startup Vision & Description{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide a comprehensive summary detailing your value proposition, current progress, and ultimate mission goals..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 text-sm placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* Action Submission Trigger */}
          <div className="pt-4 border-t border-gray-50 flex items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting && <SvgLoader />}
              {isSubmitting ? "Finalizing Profile..." : "Initialize Profile"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
