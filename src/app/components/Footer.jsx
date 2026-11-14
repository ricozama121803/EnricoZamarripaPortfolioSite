"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandGithub, IconBrandGitlab, IconBrandLinkedin, IconMail, IconArrowUp } from "@tabler/icons-react";
import { FloatingDock } from "./ui/floating-dock";

const EMAIL = "ricozama121803@gmail.com";

const LINKS = [
  { title: "GitHub", href: "https://github.com/ricozama121803", icon: <IconBrandGithub className="h-full w-full text-neutral-300" /> },
  { title: "GitLab", href: "https://gitlab.com/ricozama121803", icon: <IconBrandGitlab className="h-full w-full text-neutral-300" /> },
  { title: "LinkedIn", href: "https://www.linkedin.com/in/enrico-zamarripa-3ba2882a3/", icon: <IconBrandLinkedin className="h-full w-full text-neutral-300" /> },
  { title: "Email", href: `mailto:${EMAIL}`, icon: <IconMail className="h-full w-full text-neutral-300" /> },
];

const Footer = () => (
  <footer className="relative z-10 mt-8 border-t border-white/5 bg-[#070b17]/80">
    <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-12">
      <div className="text-center sm:text-left">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image src="/images/ez-logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
          <span className="font-semibold text-neutral-200">Enrico Zamarripa</span>
        </Link>
        <p className="mt-3 max-w-sm text-sm text-neutral-500">
          Electrical Engineering student at CSUF and software developer at AUTODCP, building full-stack web apps, tools and games.
        </p>
      </div>
      <FloatingDock items={LINKS} desktopClassName="mx-0 bg-neutral-900" mobileClassName="hidden" />
      {/* the dock collapses into a toggle on phones; show the links directly instead */}
      <ul className="flex gap-3 md:hidden">
        {LINKS.map((l) => (
          <li key={l.title}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.title}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-800 p-2.5 transition hover:bg-neutral-700">
              {l.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div className="border-t border-neutral-900">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-neutral-600 sm:flex-row sm:px-6 lg:px-12">
        <span>&copy; {new Date().getFullYear()} Enrico Zamarripa. All rights reserved.</span>
        <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-300">
          Back to top <IconArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
