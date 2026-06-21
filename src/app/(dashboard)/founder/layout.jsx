import React from "react";
import FounderSidebar from "@/components/dashboard/FounderSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Founder Dashboard | StartupForge",
};

export default function FounderLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f2f5]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <FounderSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Mobile Navbar */}
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-100 px-4 py-3 flex items-center justify-between z-40">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 rounded-lg">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <span className="font-bold text-gray-800">Founder Panel</span>
          </div>

          {/* Mobile Drawer Toggle */}
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
              {/* We render a mini version of the sidebar inside the mobile dropdown */}
              <FounderSidebar />
            </ul>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>

      {/* Toastify Configuration */}
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
        toastStyle={{
          borderRadius: "12px",
          fontFamily: "inherit",
          fontSize: "14px",
        }}
      />
    </div>
  );
}
