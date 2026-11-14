"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IconBrandGithub, IconBrandGitlab, IconBrandLinkedin, IconMail, IconCopy, IconCheck } from "@tabler/icons-react";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const EMAIL = "ricozama121803@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/ricozama121803", Icon: IconBrandGithub },
  { label: "GitLab", href: "https://gitlab.com/ricozama121803", Icon: IconBrandGitlab },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/enrico-zamarripa-3ba2882a3/", Icon: IconBrandLinkedin },
];

const EmailSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="relative my-12 py-12 sm:py-20">
      <GlowCard innerClassName="relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/15 blur-3xl"
        />
        <div className="relative">
          <SectionHeading index="03" label="Contact" title="Let's Connect" center />
          <p className="mx-auto mb-10 mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            I&apos;m currently looking for new opportunities, my inbox is always open.
            Whether you have a question or just want to say hi, I&apos;ll try my best
            to get back to you!
          </p>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <HoverBorderGradient
                as="a" href={`mailto:${EMAIL}`} containerClassName="rounded-full"
                className="flex items-center gap-2 bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-white"
              >
                <IconMail size={18} /> {EMAIL}
              </HoverBorderGradient>
              <button
                type="button" onClick={handleCopyEmail} aria-label="Copy email address"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-900 hover:text-white"
              >
                {copied ? <IconCheck size={16} className="text-electric-300" /> : <IconCopy size={16} />}
                <span role="status">{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <ul className="flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/70 text-neutral-300 transition hover:-translate-y-0.5 hover:border-neutral-600 hover:text-white"
                  >
                    <Icon size={22} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlowCard>
    </section>
  );
};

export default EmailSection;
