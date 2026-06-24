"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

// 1. Core authentication syncing component
function AuthSyncContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  useEffect(() => {
    const syncRoleWithDatabase = async () => {
      if (!role) {
        return router.push("/");
      }

      try {
        // 🎯 THE URL FIX: Swapped localhost:5000 for your live Vercel server URL!
        const backendBaseUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://startupforge-server-ten.vercel.app";
        const res = await fetch(`${backendBaseUrl}/api/users/role`, {
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
          alert(`BACKEND REJECTED UPGRADE: ${json.error || "Unknown Error"}`);
          window.location.href = "/";
        }
      } catch (err) {
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

// 2. Main Page component providing the required Suspense boundary wrapper
export default function AuthSyncPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-mono text-sm text-slate-500">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6 shadow-sm" />
          <p className="font-bold tracking-wider uppercase text-xs">
            Initializing Secure Session Handler...
          </p>
        </div>
      }
    >
      <AuthSyncContent />
    </Suspense>
  );
}
