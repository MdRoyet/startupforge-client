"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
const SvgClose = () => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const SvgPencil = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);
const SvgTrash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// --- Animation Variants ---
const formVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function CreateStartup() {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [startups, setStartups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    startupName: "",
    logoUrl: "",
    industry: "",
    fundingStage: "",
    founderEmail: "",
    description: "",
  });

  useEffect(() => {
    const fetchMyStartups = async () => {
      try {
        const res = await fetch(
          "https://startupforge-server-ten.vercel.app/api/startups/me",
          {
            credentials: "include",
          },
        );
        const result = await res.json();
        if (res.ok && result.success && Array.isArray(result.data)) {
          setStartups(result.data);
        }
      } catch (err) {
        console.error("Error loading startup profiles list:", err);
      } finally {
        setPageLoading(false);
      }
    };
    fetchMyStartups();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
          credentials: "include",

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

  const handleEditClick = (startup) => {
    setEditingId(startup._id);
    setFormData({
      startupName: startup.startupName,
      logoUrl: startup.logo,
      industry: startup.industry,
      fundingStage: startup.fundingStage,
      founderEmail: startup.founderEmail,
      description: startup.description,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (
      !window.confirm(
        "Are you absolutely sure you want to delete this startup profile from the database?",
      )
    )
      return;

    try {
      const response = await fetch(
        `https://startupforge-server-ten.vercel.app/api/startups/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to drop DB entries.");
      }

      toast.success("Startup permanently cleared from database indexes.");
      setStartups((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(
        err.message ||
          "An error occurred handling database synchronization requests.",
      );
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.logoUrl) {
      toast.error("Please upload a startup company logo first.");
      return;
    }

    setIsSubmitting(true);

    const apiUrl = editingId
      ? `https://startupforge-server-ten.vercel.app/api/startups/${editingId}`
      : `https://startupforge-server-ten.vercel.app/api/startups`;
    const apiMethod = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(apiUrl, {
        method: apiMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupName: formData.startupName,
          logo: formData.logoUrl,
          industry: formData.industry,
          description: formData.description,
          fundingStage: formData.fundingStage,
          founderEmail: formData.founderEmail,
        }),
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Failed to finalize startup profile processing mapping execution steps.",
        );
      }

      if (editingId) {
        toast.success("🔄 Startup profile metrics synced in MongoDB!");
        setStartups((prev) =>
          prev.map((item) => (item._id === editingId ? result.data : item)),
        );
      } else {
        toast.success("🚀 Startup profile stored in database successfully!");
        setStartups((prev) => [result.data, ...prev]);
      }

      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        startupName: "",
        logoUrl: "",
        industry: "",
        fundingStage: "",
        founderEmail: "",
        description: "",
      });
    } catch (error) {
      console.error("Database storage exception:", error);
      toast.error(
        error.message || "An error occurred connecting to the server.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCreationModal = () => {
    setEditingId(null);
    setFormData({
      startupName: "",
      logoUrl: "",
      industry: "",
      fundingStage: "",
      founderEmail: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  if (pageLoading) {
    return (
      <div className="max-w-4xl mx-auto pt-40 flex flex-col items-center justify-center text-gray-400 gap-2">
        <SvgLoader />
        <span className="text-sm font-medium">
          Synchronizing workspace profiles...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Startup Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your corporate brand asset records and overview details.
          </p>
        </div>

        <button
          onClick={openCreationModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.01] transition-all duration-200 self-start sm:self-auto"
        >
          Create Your Startup
        </button>
      </div>

      {startups.length > 0 ? (
        <div className="space-y-6">
          {startups.map((startup) => (
            <motion.div
              key={startup._id}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-10 space-y-8 relative group"
            >
              {/* 🎯 UPGRADED ACTION BUTTONS: Better gap, shadows, hover lift, and precise sizing */}
              <div className="absolute top-6 right-6 flex items-center gap-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <button
                  onClick={() => handleEditClick(startup)}
                  className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-500/30 hover:-translate-y-1 transition-all"
                  title="Modify Profile Metrics"
                >
                  <SvgPencil />
                </button>
                <button
                  onClick={() => handleDeleteClick(startup._id)}
                  className="flex items-center justify-center w-10 h-10 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl shadow-sm hover:shadow-md hover:shadow-red-500/30 hover:-translate-y-1 transition-all"
                  title="Drop System Assets"
                >
                  <SvgTrash />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-100">
                <img
                  src={startup.logo || startup.logoUrl}
                  alt="Company Logo"
                  className="w-24 h-24 rounded-2xl object-contain bg-gray-50 border border-gray-100 p-2 shadow-sm shrink-0"
                />
                <div className="text-center sm:text-left space-y-2 w-full">
                  {/* 🎯 FIXED OVERLAP: Added sm:pr-24 to create a safe zone for the floating buttons */}
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between sm:pr-24">
                    <h2 className="text-2xl font-black text-gray-900 truncate">
                      {startup.startupName}
                    </h2>
                    <span
                      className={`mt-2 sm:mt-0 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full border whitespace-nowrap
                      ${!startup.status || startup.status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-200" : ""}
                      ${startup.status === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : ""}
                      ${startup.status === "Rejected" ? "bg-red-50 text-red-600 border-red-200" : ""}
                    `}
                    >
                      {startup.status || "Pending"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                      {startup.industry}
                    </span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
                      {startup.fundingStage}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Founder Contact Point
                  </span>
                  <p className="text-sm font-semibold text-gray-700 flex items-center justify-center sm:justify-start gap-2">
                    <SvgMail /> {startup.founderEmail}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Initialization Date
                  </span>
                  <p className="text-sm font-semibold text-gray-700">
                    {new Date(
                      startup.createdAt || Date.now(),
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Company Vision & Roadmap Summary
                </span>
                <p className="text-sm leading-relaxed text-gray-600 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  {startup.description}
                </p>

                {/* 🎯 INJECTED PENDING WARNING BANNER HERE */}
                {(!startup.status || startup.status === "Pending") && (
                  <div className="mt-4 p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                    <p className="text-sm text-amber-700 font-medium flex items-center gap-2">
                      <span className="text-amber-500">⏳</span> Your startup is
                      currently under review by our admin team. You will be able
                      to post opportunities once approved.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center flex flex-col items-center justify-center min-h-[300px] shadow-sm"
        >
          <div className="p-4 bg-gray-50 rounded-full text-gray-400 mb-4">
            <SvgBuilding />
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            No Corporate Profiles Configured
          </h3>
          <p className="text-sm text-gray-400 max-w-sm mt-1 mb-6">
            Initialize your workspace configuration profile to start sourcing
            talent pipelines.
          </p>
          <button
            onClick={openCreationModal}
            className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-all"
          >
            Get Started
          </button>
        </motion.div>
      )}

      {/* --- POPUP MODAL FRAME --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
            <div
              className="absolute inset-0"
              onClick={() =>
                !isSubmitting && !isUploading && setIsModalOpen(false)
              }
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden p-6 sm:p-10 w-full max-w-4xl relative z-10 my-8"
            >
              <button
                disabled={isSubmitting || isUploading}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40"
              >
                <SvgClose />
              </button>

              <div className="mb-6 pr-8">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  {editingId ? "Refine Venture Profile" : "Launch Your Concept"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Provide corporate baseline information points to provision
                  database parameters.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* LOGO UPLOAD COMPONENT */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Startup Brand Logo <span className="text-red-500">*</span>
                  </label>
                  <div
                    onClick={() =>
                      !isUploading &&
                      !isSubmitting &&
                      fileInputRef.current.click()
                    }
                    className={`border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer text-center relative flex flex-col items-center justify-center min-h-[130px] ${formData.logoUrl ? "border-emerald-300 bg-emerald-50/20" : "border-gray-200 hover:border-blue-400 hover:bg-gray-50/50"}`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      className="hidden"
                      accept="image/*"
                      disabled={isSubmitting}
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
                          alt="Preview"
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

                {/* FIELDS CONTAINER */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        disabled={isSubmitting}
                        value={formData.startupName}
                        onChange={handleInputChange}
                        placeholder="e.g., Stripe, Acclaim Corp"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 text-sm placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block">
                      Founder Contact Email{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <SvgMail />
                      </div>
                      <input
                        type="email"
                        name="founderEmail"
                        required
                        disabled={isSubmitting}
                        value={formData.founderEmail}
                        onChange={handleInputChange}
                        placeholder="alex@company.com"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 text-sm placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block">
                      Target Market / Industry{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <SvgTag />
                      </div>
                      <select
                        name="industry"
                        required
                        disabled={isSubmitting}
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
                        <option value="CleanTech & Energy">
                          CleanTech & Energy
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
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 block">
                      Current Funding Status{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <SvgCoins />
                      </div>
                      <select
                        name="fundingStage"
                        required
                        disabled={isSubmitting}
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

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">
                    Startup Vision & Description{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    disabled={isSubmitting}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide a comprehensive summary detailing your value proposition..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 text-sm placeholder:text-gray-400 resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    disabled={isSubmitting || isUploading}
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.01] transition-all duration-200 disabled:opacity-50"
                  >
                    {isSubmitting && <SvgLoader />}
                    {isSubmitting
                      ? "Syncing Metrics..."
                      : editingId
                        ? "Save Document Changes"
                        : "Initialize Profile"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
