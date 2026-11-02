import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import GithubIcon from "../../../public/github-icon.svg";
import GitlabIcon from "../../../public/gitlab-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";

const EMAIL = "ricozama121803@gmail.com";

const SECTIONS = [
  { title: "Intro", path: "#home" },
  { title: "Skills", path: "#skills" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/ricozama121803", icon: GithubIcon },
  { label: "GitLab", href: "https://gitlab.com/ricozama121803", icon: GitlabIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/enrico-zamarripa-3ba2882a3/", icon: LinkedinIcon },
];

const heading = "font-mono text-xs uppercase tracking-[0.25em] text-electric-300 mb-4";
const link = "text-slate-400 hover:text-white transition-colors";

const Footer = () => {
  return (
    <footer className="relative z-10 text-white bg-ink-950/80">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-electric-500 to-transparent opacity-70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/images/ez-logo.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
            <span className="font-display uppercase tracking-[0.2em] text-sm">
              Enrico<span className="text-electric-300"> Zamarripa</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Electrical Engineering student at CSUF and software developer at AUTODCP, building
            full-stack web apps and tools.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className={heading}>Navigate</h3>
          <ul className="space-y-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.path}>
                <a href={s.path} className={link}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className={heading}>Connect</h3>
          <a href={`mailto:${EMAIL}`} className={`${link} inline-flex items-center gap-2 text-sm break-all`}>
            <EnvelopeIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {EMAIL}
          </a>
          <ul className="mt-4 flex gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 opacity-70 transition hover:opacity-100 hover:border-electric-300 hover:shadow-[0_0_16px_-2px_rgba(27,154,243,0.9)]"
                >
                  <Image src={s.icon} alt="" className="h-5 w-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-5 flex flex-col sm:flex-row gap-3 items-center justify-between font-mono text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} Enrico Zamarripa. All rights reserved.</span>
          <a href="#home" className="inline-flex items-center gap-1.5 uppercase tracking-widest hover:text-white transition-colors">
            Back to top <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
