"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects-and-tutorials", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-16">
          <a href="#" className="text-xl font-semibold text-gray-900">
            Houssam Eddine
          </a>
          <ul className="flex gap-8 list-none text-sm font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-gray-500 no-underline transition-colors duration-300 hover:text-gray-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="w-full px-6 flex justify-between items-center h-16">
          <a href="#" className="text-lg font-semibold text-gray-900">
            Houssam Eddine
          </a>
          <div className="relative">
            <div
              className={`hamburger-icon flex flex-col justify-between h-5 w-6 cursor-pointer ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <span className="w-full h-0.5 bg-gray-700 rounded transition-all duration-300 ease-in-out"></span>
              <span className="w-full h-0.5 bg-gray-700 rounded transition-all duration-300 ease-in-out"></span>
              <span className="w-full h-0.5 bg-gray-700 rounded transition-all duration-300 ease-in-out"></span>
            </div>
            <div
              className={`menu-links absolute top-full right-0 bg-white rounded-xl shadow-lg border border-gray-100 w-48 max-h-0 overflow-hidden transition-all duration-300 ease-in-out mt-2 ${menuOpen ? "open" : ""}`}
            >
              {links.map((link) => (
                <li key={link.href} className="list-none">
                  <a
                    href={link.href}
                    onClick={toggleMenu}
                    className="block px-5 py-3 text-sm text-gray-700 no-underline hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
