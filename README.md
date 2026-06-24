<div align="center">
  
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Express.js-4.18-black?logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-5.0-success?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Better_Auth-1.0-darkgray" alt="Better Auth" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-informational?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-critical?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Stripe-Payments-blueviolet?logo=stripe&logoColor=white" alt="Stripe" />

  <h1>🚀 StartupForge - Startup Team Builder Platform</h1>

  <p>A premium, full-stack platform where startup founders can publish ideas, build teams, and recruit collaborators. Developers, designers, and marketers can explore startup opportunities and apply to join cutting-edge projects.</p>

  <p>
    <strong><a href="#">Live Demo</a> • <a href="#">Client Repo</a> • <a href="#">Server Repo</a></strong>
  </p>
  
</div>

---

## 🌟 Overview
StartupForge acts as a dynamic bridge between visionary founders and talented collaborators. Unlike traditional job boards, it focuses specifically on the startup ecosystem, featuring role-based dashboards, premium tier limitations, dynamic quota enforcement, and real-time application tracking.

## ✨ Key Features
* **🎨 Premium UI/UX:** Dark-mode glassmorphism design system built with Tailwind CSS, DaisyUI, and Framer Motion scroll/hover animations.
* **🔐 Dual-Layer Authentication:** Seamless integration of Better Auth (Session Cookies) for frontend login, bridged securely to a custom Stateless JWT system (`startupforge_jwt`) for protected Express APIs.
* **👥 Role-Based Dashboards:**
  * **Founders:** Create startup profiles, post opportunities (with premium quota limits), review/accept/reject applicants.
  * **Collaborators:** Browse opportunities, apply with portfolio links, track application statuses in real-time.
  * **Admins:** Monitor total revenue, manage users (block/unblock), approve startup listings, view transaction logs.
* **💳 Stripe Integration:** Premium tier upgrades for founders to unlock higher posting limits (Free: 10 posts vs Pro: 200 posts).
* **🔍 Advanced Search & Filtering:** MongoDB `$regex` for searching by role/skills, and `$in` operators for filtering by Work Type and Industry.
* **📄 Server-Side Pagination:** Cleanly paginated opportunity feeds to ensure fast loading times.
* **☁️ Secure Media Hosting:** Direct integration with ImgBB API for handling logo and avatar uploads securely.

## 🛠 Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js (App Router), JSX | Core React Framework & Routing |
| **Styling** | Tailwind CSS, DaisyUI | Utility-first styling & Component Library |
| **Animation** | Framer Motion | Scroll animations, page transitions, micro-interactions |
| **Icons** | Inline SVGs (Gravity UI) | Zero-dependency, crisp vector icons |
| **Notifications** | React-Toastify | Elegant pop-up alerts |
| **Backend** | Node.js, Express.js | REST API Server |
| **Database** | MongoDB (Native Driver) | NoSQL Data Storage |
| **Auth (Frontend)** | Better Auth | Google OAuth & Email/Password Session Management |
| **Auth (Backend)** | JSON Web Tokens (JWT) | Stateless API Protection via HTTPOnly Cookies |
| **Payments** | Stripe | Checkout Sessions & Subscription Tiers |
| **Media** | ImgBB API | Image Hosting |

## 🗂 Architecture & Folder Structure

The project follows a strict separation of concerns across two distinct repositories to optimize for serverless deployment.

### Client (Next.js)
```text
src/
├── app/
│   ├── (public)/        # Home, Login, Register, Browse pages
│   ├── (dashboard)/     # Protected layout wrapper
│   │   ├── founder/     # Founder-specific pages
│   │   └── collaborator/# Collaborator-specific pages
│   ├── admin/           # Admin-specific pages
│   └── layout.jsx       # Root layout (Navbar/Footer)
├── components/
│   ├── dashboard/       # Sidebar, Overview cards
│   ├── home/            # FeaturedStartups, WhyJoin, Statistics, Testimonials
│   └── layout/          # Navbar, Footer
├── lib/
│   ├── auth.js          # Better Auth client config
│   └── authBridge.js    # JWT synchronization helper
└── providers/
    └── AuthProvider.jsx
