"use client";
import { useEffect, useRef, useState } from "react";
import { IconBrandGithub, IconBrandGitlab, IconBrandLinkedin, IconCheck, IconCopy, IconFileText, IconMail } from "@tabler/icons-react";
import { EMAIL, LINKS, RESUME } from "../data/site";

// copy text to the clipboard, falling back to a hidden textarea where the Clipboard API isn't available
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

const FOOTER_LINKS = [
  ["GitHub", LINKS.github, IconBrandGithub],
  ["LinkedIn", LINKS.linkedin, IconBrandLinkedin],
  ["GitLab", LINKS.gitlab, IconBrandGitlab],
  ["Resume", RESUME.pdf, IconFileText],
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    if (!(await copyText(EMAIL))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-[#0b0f1c]/90 px-6 py-10 text-center sm:px-10">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Let&apos;s talk</h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-400">
          Have a question about a project or just want to say hi? Email is the fastest way to reach me.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-electric-100">
            <IconMail size={16} /> Email me
          </a>
          <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-neutral-200 transition hover:border-white/30 hover:bg-white/5">
            {copied ? <IconCheck size={16} className="text-electric-300" /> : <IconCopy size={16} />}
            <span aria-live="polite">{copied ? "Copied!" : EMAIL}</span>
          </button>
        </div>
      </div>
      <footer className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/15 pt-6 sm:flex-row">
        <p className="text-sm text-neutral-400">© {new Date().getFullYear()} Enrico Zamarripa</p>
        <div className="flex flex-wrap justify-center gap-2">
          {FOOTER_LINKS.map(([label, href, Icon]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-100 transition hover:border-electric-300 hover:bg-white/10">
              <Icon size={20} stroke={1.7} /> {label}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
