"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { signUp, signOut } from "@/lib/auth-client"; // <-- FIXED: Imported signOut to clear auto-login sessions

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Collaborator",
    image: null,
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasMinLength = value.length >= 6;

      if (!hasMinLength)
        setPasswordError("Password must be at least 6 characters.");
      else if (!hasUppercase)
        setPasswordError("Password must contain an uppercase letter.");
      else if (!hasLowercase)
        setPasswordError("Password must contain a lowercase letter.");
      else setPasswordError("");
    }
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwordError) {
      toast.error("Please fix the errors in your password.");
      return;
    }

    if (!formData.image) {
      toast.warning("Please upload a profile picture.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload the image to ImgBB first
      toast.info("Uploading profile picture...", { autoClose: 1500 });

      const imageUploadData = new FormData();
      imageUploadData.append("image", formData.image);

      const imgbbTargetUrl =
        process.env.NEXT_PUBLIC_API_IMAGES_URL ||
        "https://api.imgbb.com/1/upload?key=d6d1f608c8cfa77e816c76772af6fe27";

      const imgResponse = await fetch(imgbbTargetUrl, {
        method: "POST",
        body: imageUploadData,
      });

      const contentType = imgResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await imgResponse.text();
        console.error("Server returned non-JSON response:", errorText);
        throw new Error(
          "The image server returned an invalid response page. Check your connection.",
        );
      }

      const imgData = await imgResponse.json();

      if (!imgData.success) {
        throw new Error(
          imgData.error?.message ||
            "Failed to upload image. Please try a different file.",
        );
      }

      const uploadedImageUrl = imgData.data.display_url;

      // 2. Register the user with Better Auth using the real image URL
      toast.info("Creating your account...", { autoClose: 1500 });

      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: uploadedImageUrl,
        role: formData.role,
      });

      if (error) {
        toast.error(error.message || "Failed to create account.");
        setIsLoading(false);
        return;
      }

      // --- CRITICAL AUTH ACTION FIX ---
      // Better Auth auto-signs up and sets validation cookies instantly.
      // We run a silent sign-out here to flush those cookies out of the browser memory.
      await signOut({
        redirect: false,
      });

      toast.success(
        "Account created successfully! Please sign in manually. 🔐",
      );
      router.push("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-base-100 font-sans">
      {/* Left Column: The Form Container */}
      <div className="w-full lg:w-[60%] flex items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto">
        <div className="w-full max-w-xl space-y-8 py-8">
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-8 text-base-content/60 hover:text-primary transition-colors"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Home
            </Link>
            <h2 className="text-4xl font-black tracking-tight text-base-content mb-2">
              Create your account
            </h2>
            <p className="text-lg text-base-content/60">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="mb-2">
              <label className="label-text font-semibold text-base-content/80 block mb-4 text-lg">
                I am joining as a...
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`cursor-pointer border-2 rounded-2xl p-4 transition-all ${formData.role === "Founder" ? "border-primary bg-primary/5" : "border-base-300 bg-base-100 hover:border-primary/50"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="role"
                      value="Founder"
                      checked={formData.role === "Founder"}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="radio radio-primary"
                    />
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 p-2 rounded-lg text-primary">
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
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <polyline points="16 11 18 13 22 9" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-base-content">Founder</p>
                        <p className="text-xs text-base-content/60">
                          I want to build a team
                        </p>
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`cursor-pointer border-2 rounded-2xl p-4 transition-all ${formData.role === "Collaborator" ? "border-secondary bg-secondary/5" : "border-base-300 bg-base-100 hover:border-secondary/50"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="role"
                      value="Collaborator"
                      checked={formData.role === "Collaborator"}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="radio radio-secondary"
                    />
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/20 p-2 rounded-lg text-secondary">
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
                          <path d="m12 14 4-4" />
                          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-base-content">
                          Collaborator
                        </p>
                        <p className="text-xs text-base-content/60">
                          I want to join a startup
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-base-content/80">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/50 bg-base-200/50 text-base-content placeholder:text-base-content/40 font-medium"
                  placeholder="Jane Doe"
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-base-content/80">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary/50 bg-base-200/50 text-base-content placeholder:text-base-content/40 font-medium"
                  placeholder="jane@example.com"
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80">
                  Profile Picture
                </span>
                <span className="label-text-alt text-base-content/50">
                  Required for ImgBB upload
                </span>
              </label>
              <input
                type="file"
                required
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="file-input file-input-bordered file-input-primary w-full bg-base-200/50 text-base-content font-medium"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-base-content/80">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                required
                disabled={isLoading}
                className={`input input-bordered w-full focus:ring-2 transition-shadow bg-base-200/50 text-base-content placeholder:text-base-content/40 tracking-widest ${passwordError ? "input-error focus:ring-error/50" : "focus:ring-primary/50"}`}
                placeholder="••••••••"
                onChange={handleChange}
              />
              {passwordError && (
                <label className="label pb-0">
                  <span className="label-text-alt text-error flex items-center gap-1">
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
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {passwordError}
                  </span>
                </label>
              )}
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{
                  scale:
                    isLoading || passwordError || !formData.password ? 1 : 1.01,
                }}
                whileTap={{
                  scale:
                    isLoading || passwordError || !formData.password ? 1 : 0.99,
                }}
                type="submit"
                disabled={!!passwordError || !formData.password || isLoading}
                className="btn btn-primary w-full shadow-lg shadow-primary/20 h-14 text-lg rounded-xl disabled:bg-base-300 disabled:text-base-content/40 disabled:shadow-none"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column: Visual Side */}
      <div className="hidden lg:flex w-[40%] bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>

        <div className="relative z-10">
          <div className="bg-white/10 p-3 rounded-2xl inline-block backdrop-blur-md border border-white/10 shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-secondary"
            >
              <path d="M12 2v20" />
              <path d="m17 5-5-3-5 3" />
              <path d="m17 19-5 3-5-3" />
              <path d="M2 12h20" />
              <path d="m5 7-3 5 3 5" />
              <path d="m19 7 3 5-3 5" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-white">
          <blockquote className="text-2xl font-bold leading-relaxed mb-6">
            "StartupForge completely changed how we built our founding team. We
            found our lead developer within 48 hours of posting."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
              <img src="https://i.pravatar.cc/150?img=68" alt="CEO" />
            </div>
            <div>
              <p className="font-bold">David Chen</p>
              <p className="text-sm text-slate-300">CEO at CloudSync</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
