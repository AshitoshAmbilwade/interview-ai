"use client";
// Marks this component as a client-side component in a Next.js application.

import { UserButton } from "@clerk/nextjs";
// Imports the UserButton component for user authentication controls.

import React, { useEffect, useState } from "react";
// Imports React and the useEffect, useState hooks for managing component state and side effects.

import { usePathname } from "next/navigation";
import Link from "next/link";
// Imports the usePathname hook to access the current URL path.

function Header() {
  // Defines the Header component.

  const [menuOpen, setMenuOpen] = useState(false);
  // Manages the state of the mobile menu (open/closed).

  const path = usePathname();
  // Stores the current path from the usePathname hook.

  useEffect(() => {
    // Placeholder for future side effects that run on component mount.
  }, []);
  // Empty dependency array means this effect runs once when the component mounts.

  const toggleMenu = () => {
    // Toggles the mobile menu open or closed.
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex p-4 items-center justify-between bg-gray-100 shadow-sm">
      {/* Main container for the header, using flexbox for layout and Tailwind for styling */}

      <img
        src="/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className="object-contain"
        // Displays the logo image with specified dimensions and contained styling.
      />

      <div className="md:hidden">
        {/* This div contains the button for toggling the menu, visible only on small screens (md:hidden). */}

        <button onClick={toggleMenu} className="focus:outline-none">
          {/* Button that toggles the mobile menu state when clicked */}

          <svg
            className="w-6 h-6 text-blue-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              // Conditionally renders the SVG path to show an "X" when the menu is open, or a "hamburger" menu icon when closed.
            ></path>
          </svg>
        </button>
      </div>

      <ul
        className={`md:flex gap-6 absolute md:static left-0 top-16 md:top-auto w-full md:w-auto bg-secondary md:bg-transparent transition-transform transform md:transform-none ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } flex-col md:flex-row p-4 md:p-0`}
        // Menu list that is a flexbox on larger screens (md:flex) and hidden off-screen on mobile (translate-x-full) unless the menu is open (translate-x-0).
      >
        <Link href={"/dashboard"}>
          <li
            className={`hover:text-blue-900 hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard" && "text-blue-900 font-bold"
            }`}
          >
            {/* Menu item for "Dashboard" with dynamic styling if the current path matches */}
            Dashboard
          </li>
        </Link>

      
        <Link href={"/dashboard/howitwork"}>
          <li
            className={`hover:text-blue-900 hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/howitwork" && "text-blue-900 font-bold"
            }`}
          >
            {/* Menu item for "How it works" with dynamic styling if the current path matches */}
            How it works
          </li>
        </Link>
        
        <Link href={"/dashboard/upgrade"}>
          <li
            className={`hover:text-blue-900 hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/upgrade" && "text-blue-900 font-bold"
            }`}
          >
            {/* Menu item for "Upgrade" with dynamic styling if the current path matches */}
            Upgrade
          </li>
        </Link>

        <Link href={"/dashboard/aboutus"}>
        <li
          className={`hover:text-blue-900 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/aboutus" && "text-blue-900 font-bold"
          }`}
        >
          {/* Menu item for "Questions" with dynamic styling if the current path matches */}
          About Us
        </li>
        </Link>
      </ul>

      <UserButton />
      {/* Renders the UserButton component for user authentication controls */}
    </div>
  );
}

export default Header;
// Exports the Header component for use in other parts of the application.
