"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-toastify";

const SvgUser = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const SvgX = () => (
  <svg
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
const SvgSave = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
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

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane@collab.com",
    image: "https://i.pravatar.cc/150?u=jane",
    bio: "Passionate Frontend Developer with 3 years of experience in React and Next.js. Looking to join an early-stage startup to build impactful products.",
  });

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
  ]);
  const [isSaving, setIsSaving] = useState(false);

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
        toast.warn("Skill already added!");
      }
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Saved Data:", { ...formData, skills });
    toast.success("Profile updated successfully! 🎉");
    setIsSaving(false);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl text-white shadow-lg shadow-emerald-500/30">
            <SvgUser />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Public Profile
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your personal information and skills.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSave}
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8"
      >
        {/* Avatar Preview */}
        <div className="flex items-center gap-6">
          <div className="avatar placeholder">
            <div className="w-24 rounded-2xl bg-gray-100 text-gray-400">
              <img
                src={formData.image}
                alt="Avatar"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Image URL
              </span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full focus:input-primary bg-gray-50/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Full Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input input-bordered w-full focus:input-primary bg-gray-50/50"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-gray-100 text-gray-500 cursor-not-allowed"
              disabled
            />
            <label className="label">
              <span className="label-text-alt text-gray-400">
                Email cannot be changed
              </span>
            </label>
          </div>
        </div>

        {/* Skills Tag Input */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">
              Skills
            </span>
          </label>
          <div className="min-h-[48px] input input-bordered w-full flex flex-wrap items-center gap-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500/30 bg-gray-50/50 px-3 py-2">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="badge bg-emerald-50 text-emerald-700 border-emerald-200 pl-3 pr-1 py-2 text-sm font-medium flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="p-0.5 rounded-full hover:bg-emerald-200 text-emerald-500 hover:text-emerald-800 transition-colors"
                >
                  <SvgX />
                </button>
              </motion.span>
            ))}
            <input
              type="text"
              placeholder="Type a skill and press Enter..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-[150px] bg-transparent border-none outline-none h-8 text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">Bio</span>
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full h-32 focus:textarea-primary bg-gray-50/50 resize-none"
            placeholder="Tell startups why they should hire you..."
          ></textarea>
        </div>

        <div className="divider m-0"></div>

        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={isSaving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-none shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 min-w-[180px]"
          >
            {isSaving ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <SvgSave /> Save Changes
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default Profile;
