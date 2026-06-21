"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";

export function Providers({ children }) {
  const router = useRouter();

  return (
    // The navigate prop enables HeroUI buttons/links to hook directly into Next.js routing
    <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>
  );
}
