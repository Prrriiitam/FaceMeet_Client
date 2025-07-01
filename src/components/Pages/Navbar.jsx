import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { useStats } from "../../context/SocketProvider";

export default function Navbar() {
  const { user } = useAuth();
  const { liveUsers } = useStats();
  const [open, setOpen] = useState(false);

  // close the menu when window is resized to md+
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const NavLinks = () => (
    <>
      <a href="/"    className="nav-link">Home</a>
      <a href="/blog"  className="nav-link">Blog</a>
      <a href="/features"  className="nav-link">Features</a>
      <a href="/policy" className="nav-link">Policy</a>
      <a href="/about"  className="nav-link">About&nbsp;Us</a>
      

      <span className="rounded-full bg-teal-600/20 px-2 py-0.5 text-xs font-semibold text-teal-300 mt-2 md:mt-0">
        🟢 Live&nbsp;{liveUsers}
      </span>

      {user?.picture && (
        <img
          src={user.picture}
          alt="Profile"
          referrerPolicy="no-referrer"
          onError={(e) => (e.currentTarget.src = "/images/default-avatar.png")}
          className="h-10 w-10 rounded-full border-2 border-teal-500 object-cover shadow md:ml-4 mt-3 md:mt-0"
        />
      )}
    </>
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Brand */}
          <a className="text-3xl font-bold text-teal-800 dark:text-teal-300" href="#">
            FaceMeet
          </a>

          {/* Hamburger button (mobile) */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-teal-300 hover:text-teal-400 focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-lg">
            <NavLinks />
          </nav>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 pb-4 pt-2 space-y-2 text-base">
          <NavLinks />
        </nav>
      )}
    </header>
  );
}

/* tailwind class extracted for brevity */
const link =
  "block text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white/75";
