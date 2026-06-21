"use client";

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Use next/link if using Next.js
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { Briefcase, LayoutDashboard, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Temporary mock authentication state for design matching
  // This will hook into your Better Auth layer in Phase 2
  const [user, setUser] = useState({
    name: "Alex Morgan",
    email: "alex@startupforge.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    role: "Founder", // 'Founder' | 'Collaborator' | 'Admin'
  });

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  // Paths required by A10_CAT-002.docx
  const publicRoutes = [
    { name: "Home", path: "/" },
    { name: "Browse Startups", path: "/startups" },
    { name: "Browse Opportunities", path: "/opportunities" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <HeroNavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/80 backdrop-blur-md"
      maxWidth="xl"
    >
      {/* Mobile Menu Toggle & Brand Logo */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="pr-3" justify="start">
        <NavbarBrand>
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight"
          >
            <Briefcase className="h-6 w-6 text-indigo-600" />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              StartupForge
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Public Navigation Links */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {publicRoutes.map((route) => (
          <NavbarItem key={route.name} isActive={isActive(route.path)}>
            <Link
              to={route.path}
              className={`text-sm font-medium transition-colors ${
                isActive(route.path)
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              {route.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Primary Right Actions (Auth State Dependent) */}
      <NavbarContent justify="end">
        {user ? (
          // Authenticated Dropdown View
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform border-indigo-500"
                color="primary"
                name={user.name}
                size="sm"
                src={user.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile_header"
                className="h-14 gap-2"
                textValue="User Context"
              >
                <p className="font-semibold text-xs text-gray-400">
                  Signed in as
                </p>
                <p className="font-semibold text-sm text-gray-800">
                  {user.email}
                </p>
                <span className="inline-block mt-1 text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
                  {user.role}
                </span>
              </DropdownItem>

              <DropdownItem
                key="dashboard"
                startContent={<LayoutDashboard className="h-4 w-4" />}
                onPress={() => navigate("/dashboard")}
                textValue="Dashboard"
              >
                Dashboard
              </DropdownItem>

              <DropdownItem
                key="profile"
                startContent={<User className="h-4 w-4" />}
                onPress={() => navigate("/profile")}
                textValue="Profile"
              >
                My Profile
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger"
                startContent={<LogOut className="h-4 w-4" />}
                onPress={handleLogout}
                textValue="Logout"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          // Public Authentication Call to Actions
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                to="/register"
                variant="solid"
                className="bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700"
                size="sm"
              >
                Register
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Full Screen Mobile Dropdown Overlays */}
      <NavbarMenu className="bg-white/95 pt-6 space-y-3">
        {publicRoutes.map((route, index) => (
          <NavbarMenuItem key={`${route.name}-${index}`}>
            <Link
              className={`w-full block py-2 rounded-lg px-3 text-lg font-medium ${
                isActive(route.path)
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              to={route.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {route.name}
            </Link>
          </NavbarMenuItem>
        ))}

        <hr className="border-gray-100 my-2" />

        {user ? (
          <>
            <NavbarMenuItem>
              <Link
                className="w-full flex items-center gap-2 py-2 rounded-lg px-3 text-gray-700 hover:bg-gray-50 text-lg font-medium"
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5 text-gray-500" />
                Dashboard
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full flex items-center gap-2 py-2 rounded-lg px-3 text-gray-700 hover:bg-gray-50 text-lg font-medium"
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 text-gray-500" />
                Profile
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <button
                className="w-full flex items-center gap-2 py-2 rounded-lg px-3 text-red-600 hover:bg-red-50 text-lg font-medium text-left"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </NavbarMenuItem>
          </>
        ) : (
          <div className="flex flex-col gap-2 pt-4 px-3">
            <Button
              as={Link}
              to="/login"
              variant="bordered"
              className="border-gray-200 text-gray-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Button>
            <Button
              as={Link}
              to="/register"
              color="primary"
              className="bg-indigo-600 text-white font-medium shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Button>
          </div>
        )}
      </NavbarMenu>
    </HeroNavbar>
  );
};

export default Navbar;
