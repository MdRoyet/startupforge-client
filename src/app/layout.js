import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

// 🎯 THE GLOBAL INTERCEPTOR: Hijacks browser fetch to automatically inject credentials
if (typeof window !== "undefined") {
  const originalFetch = window.fetch;
  window.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input.url;

    // If the request hits your Vercel backend, automatically attach authentication cookies
    if (
      url.includes("startupforge-server-ten.vercel.app") ||
      url.includes("/api/")
    ) {
      init = init || {};
      init.credentials = "include";
    }

    return originalFetch(input, init);
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <Navbar />

        <main className="flex-grow">{children}</main>

        <Footer />

        {/* Global Toast Container */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
