"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  {
    title: "Intro",
    path: "#home",
  },
  {
    title: "Skills",
    path: "#skills",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.path.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleScroll = (e, path) => {
    e.preventDefault();

    const target = document.querySelector(path);
    const offset = 80; // Adjust this value for scroll offset

    if (target) {
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setNavbarOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-ink-950/90">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link href={"/"} aria-label="Enrico Zamarripa, home" className="group flex items-center gap-3">
          <Image
            src="/images/ez-logo.png"
            alt="EZ logo"
            width={64}
            height={64}
            priority
            className="h-10 w-10 md:h-14 md:w-14 rounded-full transition-[filter] duration-300 group-hover:drop-shadow-[0_0_14px_rgba(27,154,243,0.9)]"
          />
          <span className="hidden sm:block font-display uppercase tracking-[0.2em] text-sm text-white">
            Enrico<span className="text-electric-300"> Zamarripa</span>
          </span>
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-electric-700 text-electric-300 hover:text-white hover:border-electric-300"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-electric-700 text-electric-300 hover:text-white hover:border-electric-300"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 font-mono text-sm uppercase tracking-widest">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.path.slice(1);
              return (
                <li key={index}>
                  <a
                    href={link.path}
                    onClick={(e) => handleScroll(e, link.path)}
                    className={`relative pb-1 transition-colors ${
                      isActive
                        ? "text-white text-glow-soft after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-electric-300 after:shadow-[0_0_10px_2px_rgba(27,154,243,0.8)]"
                        : "text-[#ADB7BE] hover:text-white"
                    }`}
                  >
                    <span className="text-electric-500 mr-1">0{index + 1}.</span>
                    {link.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* live wire along the bottom edge */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-electric-500 to-transparent opacity-70" />
      {navbarOpen ? (
        <MenuOverlay
          links={navLinks}
          activeSection={activeSection}
          onLinkClick={handleScroll}
        />
      ) : null}
    </nav>
  );
};

export default Navbar;
