"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthSyncPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  useEffect(() => {
    const syncRoleWithDatabase = async () => {
      if (!role) {
        return router.push("/");
      }

      try {
        const res = await fetch("http://localhost:5000/api/users/role", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
          credentials: "include",
        });

        const json = await res.json();

        if (res.ok && json.success) {
          toast.success(`Welcome! Signed in successfully as ${role}.`);
          if (role === "Founder") {
            window.location.href = "/founder";
          } else {
            window.location.href = "/collaborator";
          }
        } else {
          // 🚨 DEBUG POPUP: This will tell us exactly why the backend failed!
          alert(`BACKEND REJECTED UPGRADE: ${json.error || "Unknown Error"}`);
          window.location.href = "/";
        }
      } catch (err) {
        // 🚨 DEBUG POPUP: This will tell us if it's a network/CORS issue
        alert(`NETWORK ERROR: ${err.message}`);
        window.location.href = "/";
      }
    };

    syncRoleWithDatabase();
  }, [role, router]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-mono text-sm text-slate-500">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6 shadow-sm" />
      <p className="font-bold tracking-wider uppercase text-xs">
        Provisioning your {role || "Workspace"} profile...
      </p>
    </div>
  );
}
