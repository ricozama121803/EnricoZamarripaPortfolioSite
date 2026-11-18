import Image from "next/image";
import { IconBrandGithub, IconBrandGitlab, IconBrandLinkedin, IconFileTypePdf, IconFolderFilled, IconMail } from "@tabler/icons-react";
import SkillLogo from "./SkillLogo";
import { SKILL_CATEGORIES } from "../../data/skills";
import { EMAIL, RESUME } from "./tiles";

// The picture on a channel tile. Sizes are in container units (cqw), so the same art
// scales cleanly from a small tile up to the big banner on the channel screen.

const BRANDS = {
  github: { Icon: IconBrandGithub, bg: "linear-gradient(160deg,#2b3137,#0d1117)", label: "GitHub", sub: "Code & repos" },
  linkedin: { Icon: IconBrandLinkedin, bg: "linear-gradient(160deg,#1d83e0,#0a58b0)", label: "LinkedIn", sub: "Let's connect" },
  gitlab: { Icon: IconBrandGitlab, bg: "linear-gradient(160deg,#fc8d3c,#e2432a)", label: "GitLab", sub: "More projects" },
};

// the twelve logos on the Skills tile, and how many skills there are in all
const SHOWCASE = ["JavaScript", "TypeScript", "Python", "C", "C++", "React", "Next.js", "Node", "AWS", "Docker", "Terraform", "Git"];
const SKILL_COUNT = SKILL_CATEGORIES.slice(1).reduce((n, c) => n + c.items.length, 0);

// what a tile is drawn at: a quarter of the desktop menu, half a phone screen
const TILE_SIZES = "(min-width: 768px) 30vw, 50vw";
const BANNER_SIZES = "(min-width: 768px) 832px, 100vw";

// a project still being built gets a pulsing badge in the corner of its art
export const InProgressBadge = ({ className = "" }) => (
  <span className={`inline-flex items-center gap-[0.45em] rounded-full bg-amber-400 px-[0.8em] py-[0.3em] font-extrabold uppercase tracking-wide text-amber-950 shadow ${className}`}>
    <span className="relative flex h-[0.6em] w-[0.6em]">
      <span className="absolute inset-0 animate-ping rounded-full bg-amber-900/60" />
      <span className="relative h-full w-full rounded-full bg-amber-900" />
    </span>
    In progress
  </span>
);

// the always-visible strip along the bottom of a project tile: its name and what it's built with
function NameStrip({ title, tech = [], extra, icon }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center gap-[2.5cqw] bg-white/95 px-[3.5cqw] py-[2.4cqw] shadow-[0_-1px_0_rgba(0,0,0,0.08)]">
      {icon}
      <span className="min-w-0 flex-1 truncate text-left text-[6.2cqw] font-extrabold leading-none text-slate-700">
        {title}
        {extra && <span className="ml-[1.5cqw] text-[4.2cqw] font-bold text-slate-400">{extra}</span>}
      </span>
      <span className="flex shrink-0 items-center gap-[1.6cqw]">
        {tech.slice(0, 4).map((t) => (
          <span key={t} title={t}><SkillLogo name={t} className="h-[6.4cqw] w-[6.4cqw]" /></span>
        ))}
      </span>
    </div>
  );
}

// The banner reuses the tile's (already loaded) image underneath its sharper one, so it never flashes
// empty while the tile zooms up into it.
function ProjectArt({ project, banner }) {
  return (
    <div className="absolute inset-0 bg-slate-900">
      <Image src={project.image} alt="" fill sizes={TILE_SIZES} className="object-cover object-top" />
      {banner && <Image src={project.image} alt="" fill sizes={BANNER_SIZES} className="object-cover object-top" />}
      {project.inProgress && <InProgressBadge className="absolute left-[3cqw] top-[3cqw] text-[3.6cqw]" />}
      <NameStrip title={project.title} tech={project.tech} />
    </div>
  );
}

function GroupArt({ group, banner }) {
  return (
    <div className="absolute inset-0 bg-slate-900">
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-[0.6cqw]">
        {group.members.slice(0, 6).map((m) => (
          <div key={m.id} className="relative">
            <Image src={m.image} alt="" fill sizes={banner ? "(min-width: 768px) 280px, 33vw" : "(min-width: 768px) 12vw, 20vw"} className="object-cover" />
          </div>
        ))}
      </div>
      <NameStrip title={group.title} extra={`${group.members.length} games`} tech={group.tech} />
    </div>
  );
}

// the Projects folder: a contact sheet of the newest projects
function FolderArt({ folder, banner }) {
  const total = folder.projects.reduce((n, t) => n + (t.kind === "group" ? t.group.members.length : 1), 0);
  return (
    <div className="absolute inset-0 bg-slate-900">
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-[0.5cqw]">
        {folder.covers.map((src) => (
          <div key={src} className="relative">
            <Image src={src} alt="" fill sizes={banner ? "(min-width: 768px) 280px, 33vw" : "(min-width: 768px) 17vw, 33vw"} className="object-cover object-top" />
          </div>
        ))}
      </div>
      <NameStrip
        title={folder.title} extra={`${total} projects`} tech={folder.tech}
        icon={<IconFolderFilled aria-hidden="true" className="h-[6.4cqw] w-[6.4cqw] shrink-0 text-[#36b8f5]" />}
      />
    </div>
  );
}

function AboutArt() {
  return (
    <div className="absolute inset-0 flex items-center gap-[5cqw] px-[6cqw]" style={{ background: "linear-gradient(170deg,#1e2a5a 0%,#3b2f7a 55%,#c2667a 100%)" }}>
      {/* a few stars */}
      {[[12, 14], [30, 8], [55, 18], [78, 10], [88, 30], [66, 6], [92, 62]].map(([x, y]) => (
        <span key={`${x}-${y}`} className="absolute h-[0.9cqw] w-[0.9cqw] rounded-full bg-white/80" style={{ left: `${x}%`, top: `${y}%` }} />
      ))}
      <div className="relative h-[32cqw] w-[32cqw] shrink-0 overflow-hidden rounded-full border-[1cqw] border-white/90 shadow-lg">
        <Image src="/images/github-avatar.jpg" alt="" fill sizes="30vw" className="scale-[1.06] object-cover" />
      </div>
      <div className="relative min-w-0 text-white">
        <p className="text-[8.5cqw] font-black leading-[0.95] tracking-tight">Enrico<br />Zamarripa</p>
        <p className="mt-[2.5cqw] text-[4.2cqw] font-bold leading-snug text-white/90">Software Developer<br />@ AUTODCP</p>
        <p className="mt-[1cqw] text-[4.2cqw] font-bold leading-snug text-white/70">EE student @ CSUF</p>
      </div>
    </div>
  );
}

function SkillsArt() {
  return (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-white to-sky-50 px-[4.5cqw] pb-[4cqw] pt-[3.5cqw]">
      <div className="flex items-baseline justify-between">
        <p className="text-[8.5cqw] font-black leading-none tracking-tight text-slate-700">Skills</p>
        <p className="text-[4.2cqw] font-extrabold text-slate-400">{SKILL_COUNT} tools</p>
      </div>
      <div className="mt-[3cqw] grid flex-1 grid-cols-6 grid-rows-2 gap-[1.8cqw]">
        {SHOWCASE.map((s) => (
          <div key={s} title={s} className="grid place-items-center rounded-[2.5cqw] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] ring-1 ring-slate-200">
            <SkillLogo name={s} className="h-[8.5cqw] w-[8.5cqw]" />
          </div>
        ))}
      </div>
    </div>
  );
}

// clicking the Contact tile copies the address, so the art says so
function ContactArt() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[1.6cqw] px-[4cqw]" style={{ background: "linear-gradient(170deg,#5fd0ff 0%,#2196f3 100%)" }}>
      <div className="grid h-[20cqw] w-[20cqw] place-items-center rounded-[4.5cqw] bg-white shadow-lg">
        <IconMail className="h-[13cqw] w-[13cqw] text-sky-500" stroke={1.8} />
      </div>
      <p className="text-[7.5cqw] font-black leading-none tracking-tight text-white drop-shadow">Contact</p>
      <p className="max-w-full truncate text-[4.4cqw] font-bold text-white/90">{EMAIL}</p>
      <span className="rounded-full bg-white/95 px-[3cqw] py-[0.8cqw] text-[3.8cqw] font-extrabold text-sky-600">Click to copy</span>
    </div>
  );
}

// the resume's real first page, as a sheet of paper on a soft blue desk
function ResumeArt() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "linear-gradient(170deg,#eaf6fe 0%,#cfe9fb 100%)" }}>
      <div className="absolute left-[14cqw] top-[7cqw] aspect-[8.5/11] w-[72cqw] -rotate-2 overflow-hidden rounded-[1.5cqw] bg-white shadow-[0_2cqw_5cqw_rgba(15,60,100,0.25)] ring-1 ring-slate-200">
        <Image src={RESUME.preview} alt="" fill sizes="(min-width: 768px) 30vw, 45vw" className="object-cover object-top" />
      </div>
      <NameStrip
        title="Resume" extra="PDF"
        icon={<IconFileTypePdf aria-hidden="true" className="h-[6.4cqw] w-[6.4cqw] shrink-0 text-[#36b8f5]" stroke={2} />}
      />
    </div>
  );
}

function LinkArt({ brand }) {
  const { Icon, bg, label, sub } = BRANDS[brand];
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[4cqw] text-white" style={{ background: bg }}>
      <Icon className="h-[24cqw] w-[24cqw]" stroke={1.6} />
      <div>
        <p className="text-[11cqw] font-black leading-none tracking-tight">{label}</p>
        <p className="mt-[1.5cqw] text-[4.5cqw] font-semibold text-white/75">{sub}</p>
      </div>
    </div>
  );
}

export default function TileArt({ tile, banner = false }) {
  switch (tile.kind) {
    case "project": return <ProjectArt project={tile.project} banner={banner} />;
    case "group": return <GroupArt group={tile.group} banner={banner} />;
    case "folder": return <FolderArt folder={tile} banner={banner} />;
    case "about": return <AboutArt />;
    case "skills": return <SkillsArt />;
    case "contact": return <ContactArt />;
    case "resume": return <ResumeArt />;
    case "link": return <LinkArt brand={tile.brand} />;
    default: return null;
  }
}
