"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#work", label: "Work" },
    { href: "#projects-and-tutorials", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const ThemeToggle = ({ className = "" }: { className?: string }) => (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-0
        bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 ${className}`}
    >
      {theme === "dark" ? (
        <i className="fas fa-sun text-amber-400 text-sm"></i>
      ) : (
        <i className="fas fa-moon text-gray-600 text-sm"></i>
      )}
    </button>
  );

  return (
    <>
      {/* Desktop Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 hidden lg:block transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-16">
          <a href="#" className="text-xl font-semibold text-gray-900 dark:text-white">
            Houssam Eddine
          </a>
          <div className="flex items-center gap-8">
            <ul className="flex gap-8 list-none text-sm font-medium">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 no-underline transition-colors duration-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="lg:hidden sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
        <div className="w-full px-6 flex justify-between items-center h-16">
          <a href="#" className="text-lg font-semibold text-gray-900 dark:text-white">
            Houssam Eddine
          </a>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="relative">
              <div
                className={`hamburger-icon flex flex-col justify-between h-5 w-6 cursor-pointer ${menuOpen ? "open" : ""}`}
                onClick={toggleMenu}
              >
                <span className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-300 ease-in-out"></span>
                <span className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-300 ease-in-out"></span>
                <span className="w-full h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-300 ease-in-out"></span>
              </div>
              <div
                className={`menu-links absolute top-full right-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-48 max-h-0 overflow-hidden transition-all duration-300 ease-in-out mt-2 ${menuOpen ? "open" : ""}`}
              >
                {links.map((link) => (
                  <li key={link.href} className="list-none">
                    <a
                      href={link.href}
                      onClick={toggleMenu}
                      className="block px-5 py-3 text-sm text-gray-700 dark:text-gray-200 no-underline hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
