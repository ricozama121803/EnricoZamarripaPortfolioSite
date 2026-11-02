"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import GitlabIcon from "../../../public/gitlab-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import SectionHeading from "./SectionHeading";

const EMAIL = "ricozama121803@gmail.com";

const socialButton =
  "flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-electric-700/70 bg-ink-800/80 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-electric-300 hover:shadow-[0_0_30px_-2px_rgba(27,154,243,0.9)]";

const EmailSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    // Reset the copied state after a few seconds
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="relative my-12 py-16 sm:py-24 md:py-32">
      <div className="hud-frame relative overflow-hidden rounded-lg border border-ink-600 bg-ink-800/80 px-6 py-14 sm:px-12 sm:py-20 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/30 blur-3xl"
        />
        <div className="relative">
          <SectionHeading index="03" label="Contact" title="Let's Connect" center />
          <p className="text-slate-300/90 mt-6 mb-10 max-w-2xl mx-auto text-base sm:text-xl leading-relaxed">
            I&apos;m currently looking for new opportunities, my inbox is always open.
            Whether you have a question or just want to say hi, I&apos;ll try my best
            to get back to you!
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-10">
            <Link href="https://github.com/ricozama121803" className={socialButton} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <Image src={GithubIcon} alt="" className="h-10 w-10 sm:h-12 sm:w-12" />
            </Link>
            <Link href="https://gitlab.com/ricozama121803" className={socialButton} aria-label="GitLab" target="_blank" rel="noopener noreferrer">
              <Image src={GitlabIcon} alt="" className="h-10 w-10 sm:h-12 sm:w-12" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/enrico-zamarripa-3ba2882a3/"
              className={socialButton}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={LinkedinIcon} alt="" className="h-10 w-10 sm:h-12 sm:w-12" />
            </Link>
            <div className="relative">
              <button type="button" onClick={handleCopyEmail} className={socialButton} aria-label="Copy email address">
                <EnvelopeIcon className="h-10 w-10 sm:h-12 sm:w-12 text-slate-300" />
              </button>
              <span
                role="status"
                className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-electric-300 transition-opacity ${
                  copied ? "opacity-100" : "opacity-0"
                }`}
              >
                {copied ? "Email copied!" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
