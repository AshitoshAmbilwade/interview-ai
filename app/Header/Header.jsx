"use client";

import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Add smooth scroll effect when links are clicked
  useEffect(() => {
    const handleSmoothScroll = (event) => {
      if (event.target.tagName === "A" && event.target.hash) {
        const targetId = event.target.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return (
    <div className="flex p-4 items-center justify-between bg-gray-100 shadow-sm">
      <img
        src="/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        className="object-contain"
      />

      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
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
            ></path>
          </svg>
        </button>
      </div>

      <ul
        className={`md:flex gap-6 absolute md:static left-0 top-16 md:top-auto w-full md:w-auto bg-secondary md:bg-transparent transition-transform transform md:transform-none ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } flex-col md:flex-row p-4 md:p-0`}
      >
        <Link href={"/#dashboard"}>
          <li
            className={`hover:text-blue-900 hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard" && "text-blue-900 font-bold"
            }`}
          >
            Dashboard
          </li>
        </Link>

       

        <Link href="/#how-it-works">
          <li
            className={`hover:text-blue-900 hover:font-bold transition-all cursor-pointer ${
              path == "/#how-it-works" && "text-blue-900 font-bold"
            }`}
          >
            How it works
          </li>
        </Link>

        
        <Link href={"/upgrade"}>
          <li
            className={`hover:text-blue-900 hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/upgrade" && "text-blue-900 font-bold"
            }`}
          >
            Upgrade
          </li>
        </Link>

        <Link href="/#about-us">
          <li
            className={`hover:text-blue-900 hover:font-bold transition-all cursor-pointer ${
              path == "/#about-us" && "text-blue-900 font-bold"
            }`}
          >
            About Us
          </li>
        </Link>

      </ul>

      <UserButton />
    </div>
  );
}

export default Header;
