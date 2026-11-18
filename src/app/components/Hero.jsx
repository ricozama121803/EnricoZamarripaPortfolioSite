import Image from "next/image";
import { IconArrowRight, IconBrandGithub, IconBrandGitlab, IconBrandLinkedin, IconFileText } from "@tabler/icons-react";
import { LINKS, RESUME } from "../data/site";

const SOCIALS = [
  ["GitHub", LINKS.github, IconBrandGithub],
  ["LinkedIn", LINKS.linkedin, IconBrandLinkedin],
  ["GitLab", LINKS.gitlab, IconBrandGitlab],
];

export default function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-24 sm:px-6 md:grid-cols-[1fr_auto] md:pb-14 md:pt-32">
      <div className="text-center md:text-left">
        <h1 className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          Enrico Zamarripa
        </h1>
        <p className="mt-3 text-lg font-medium text-electric-300 sm:text-2xl">
          <span className="block sm:inline">Software Developer</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">EE Student @ CSUF</span>
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg md:mx-0">
          CSUF Sophomore studying Electrical Engineering, and a Software Developer focused on building intuitive
          software. I bring hands-on experience across full-stack development, AWS, and modern DevOps practices.
          Currently building at AUTODCP, and always excited to keep learning and shipping.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-electric-100">
            View projects <IconArrowRight size={16} />
          </a>
          <a href={RESUME.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-neutral-200 transition hover:border-white/30 hover:bg-white/5">
            <IconFileText size={16} /> Resume
          </a>
          <span className="flex items-center gap-2">
            {SOCIALS.map(([label, href, Icon]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-100 transition hover:border-electric-300 hover:bg-white/10 hover:text-white">
                <Icon size={28} stroke={1.6} />
              </a>
            ))}
          </span>
        </div>
      </div>
      <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-white/10 shadow-[0_0_80px_-20px_rgba(27,154,243,0.6)] sm:h-56 sm:w-56 md:h-72 md:w-72">
        <Image src="/images/github-avatar.jpg" alt="Enrico Zamarripa" fill priority sizes="(min-width: 768px) 288px, 224px" className="object-cover" />
      </div>
    </section>
  );
}
