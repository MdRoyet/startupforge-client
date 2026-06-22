"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

// --- INLINE SVGS ---
const SvgBriefcase = () => (
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
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const SvgClock = () => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const SvgGlobe = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const SvgClose = () => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function ManageOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    roleTitle: "",
    workType: "",
    commitmentLevel: "",
    deadline: "",
    industry: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/opportunities");
        const json = await res.json();
        if (res.ok && json.success) {
          setOpportunities(json.data);
        }
      } catch (err) {
        console.error("Fetch Exception Error:", err);
        toast.error(
          "Failed to connect with indexed opportunities collections.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = skillInput.trim();
      if (value && !skills.includes(value)) {
        setSkills((prev) => [...prev, value]);
        setSkillInput("");
      }
    }
  };

  const handleEditClick = (op) => {
    setEditingId(op._id);
    setFormData({
      roleTitle: op.roleTitle,
      workType: op.workType,
      commitmentLevel: op.commitmentLevel,
      deadline: op.deadline,
      industry: op.industry || "",
    });
    setSkills(op.requiredSkills || []);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Permanently wipe this opportunity posting from index fields?",
      )
    )
      return;

    try {
      const res = await fetch(`http://localhost:5000/api/opportunities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data.success)
        throw new Error(data.error || "Execution failed.");

      toast.success("Post dropped cleanly.");
      setOpportunities((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(err.message || "Deletion sequence failed.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/opportunities/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, requiredSkills: skills }),
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.error);

      toast.success("Opportunity properties updated.");
      setOpportunities((prev) =>
        prev.map((item) => (item._id === editingId ? data.data : item)),
      );
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || "Update transaction execution anomaly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 mt-16 text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 pb-5 border-b border-slate-200">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Manage Postings
          </h1>
          <p className="text-slate-500 mt-1">
            Review active talent positions, adjust operational requirements, or
            execute removal commands.
          </p>
        </div>

        {opportunities.length === 0 ? (
          /* Empty State Window */
          <div className="text-center py-20 bg-white border rounded-3xl p-8 border-dashed border-slate-200 shadow-sm">
            <div className="p-4 bg-slate-50 rounded-full w-12 h-12 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <SvgBriefcase />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              No Positions Formed
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
              Deploy an assignment posting map to request collaborator matching
              metrics pipeline feeds.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((op) => (
              /* Opportunity Card Layout */
              <div
                key={op._id}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between relative group"
              >
                <div className="absolute top-4 right-4 flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button
                    onClick={() => handleEditClick(op)}
                    className="btn btn-xs btn-square bg-blue-50 text-blue-600 border-none hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <SvgPencil />
                  </button>
                  <button
                    onClick={() => handleDelete(op._id)}
                    className="btn btn-xs btn-square bg-red-50 text-red-600 border-none hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <SvgTrash />
                  </button>
                </div>

                <div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] bg-blue-50 font-bold tracking-wider text-blue-600 uppercase inline-block mb-3">
                    {op.industry || "General"}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2 pr-12">
                    {op.roleTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4 font-semibold">
                    <span className="flex items-center gap-1 text-slate-500">
                      <SvgGlobe /> {op.workType}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <SvgClock /> {op.commitmentLevel}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-6">
                    {op.requiredSkills?.map((tag) => (
                      <span
                        key={tag}
                        className="badge bg-slate-100 border-transparent text-slate-600 font-semibold rounded px-2.5 py-2.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600 bg-rose-50/60 px-3 py-2 rounded-xl border border-rose-100/40">
                  <span>Application Closing Gate:</span>
                  <span>
                    {new Date(op.deadline).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- LIGHT THEMING CRUD MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div
              className="absolute inset-0"
              onClick={() => !isSubmitting && setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl p-6 md:p-8 relative z-10 shadow-2xl"
            >
              <button
                disabled={isSubmitting}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <SvgClose />
              </button>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                Modify Talent Parameters
              </h2>
              <form
                onSubmit={handleUpdateSubmit}
                className="space-y-4 text-sm text-slate-700"
              >
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-slate-700">
                      Role Title
                    </span>
                  </label>
                  <input
                    type="text"
                    name="roleTitle"
                    required
                    value={formData.roleTitle}
                    onChange={handleInputChange}
                    className="input input-bordered w-full text-slate-900 font-medium bg-slate-50 border-slate-200 focus:bg-white transition-all outline-none"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-slate-700">
                      Required Skills
                    </span>
                  </label>
                  <div className="input input-bordered w-full flex flex-wrap items-center gap-1.5 py-1.5 px-3 h-auto bg-slate-50 border-slate-200 focus-within:bg-white transition-all">
                    {skills.map((tag, idx) => (
                      <span
                        key={idx}
                        className="badge bg-blue-50 text-blue-600 border-blue-100 gap-1 rounded font-bold px-2 py-2.5"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() =>
                            setSkills(skills.filter((_, i) => i !== idx))
                          }
                          className="text-red-500 font-black hover:scale-110 transition-transform"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Press enter to add"
                      className="flex-grow outline-none bg-transparent min-w-[120px] h-8 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-bold text-slate-700">
                        Work Location
                      </span>
                    </label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleInputChange}
                      className="select select-bordered w-full bg-slate-50 border-slate-200 text-slate-800 font-medium"
                    >
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-bold text-slate-700">
                        Commitment Allocation
                      </span>
                    </label>
                    <select
                      name="commitmentLevel"
                      value={formData.commitmentLevel}
                      onChange={handleInputChange}
                      className="select select-bordered w-full bg-slate-50 border-slate-200 text-slate-800 font-medium"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Equity">Equity</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-bold text-slate-700">
                        Market Sector
                      </span>
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="input input-bordered w-full bg-slate-50 border-slate-200 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-bold text-slate-700">
                        Gate Deadline Target
                      </span>
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      required
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="input input-bordered w-full bg-slate-50 border-slate-200 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-ghost text-slate-500 rounded-xl hover:bg-slate-100"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 border-none shadow-md shadow-blue-500/10"
                  >
                    {isSubmitting ? "Syncing..." : "Save Modifications"}
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
