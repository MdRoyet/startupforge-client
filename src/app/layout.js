import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Updated to match the naming convention in A10_CAT-002.docx[cite: 1]
export const metadata = {
  title: "StartupForge — Startup Team Builder Platform",
  description:
    "Connect with startup founders, publish startup ideas, recruit collaborators, and build elite teams.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 selection:bg-indigo-500 selection:text-white">
        <Providers>
          {/* Top Navigation Bar[cite: 1] */}
          <Navbar />

          {/* Main Content Area (flex-grow ensures the footer is pushed to the bottom) */}
          <main className="flex-grow">{children}</main>

          {/* Sticky Bottom Footer[cite: 1] */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
