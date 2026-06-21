"use client";

import React from "react";
import CollaboratorSidebar from "@/components/dashboard/CollaboratorSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Collaborator Dashboard | StartupForge",
};

export default function CollaboratorLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f2f5]">
      <div className="hidden lg:flex">
        <CollaboratorSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-100 px-4 py-3 flex items-center justify-between z-40">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1.5 rounded-lg text-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <span className="font-bold text-gray-800">Collaborator Panel</span>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-square btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-2xl w-72 border border-gray-100"
            >
              <CollaboratorSidebar />
            </ul>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{ borderRadius: "12px", fontSize: "14px" }}
      />
    </div>
  );
}
