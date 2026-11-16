"use client";
import { useState } from "react";
import Image from "next/image";
import { IconBrandGithub, IconCopy, IconExternalLink, IconDownload, IconFileText, IconSearch } from "@tabler/icons-react";
import { SKILL_CATEGORIES, matchesQuery } from "../../data/skills";
import SkillLogo from "./SkillLogo";
import Tile from "./Tile";
import { RESUME, hasDeployment } from "./tiles";

const [EXPERIENCE, ...SKILLS] = SKILL_CATEGORIES;

const Heading = ({ children }) => (
  <h2 className="text-3xl font-black tracking-tight text-slate-700 sm:text-4xl">{children}</h2>
);
const Label = ({ children }) => (
  <h3 className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#36b8f5]">{children}</h3>
);

// a skill with its logo, e.g. in a project's "Built with" list
const LogoChip = ({ name }) => (
  <span className="inline-flex items-center gap-2 rounded-full border-2 border-[#d5d9de] bg-white py-1 pl-1.5 pr-3 text-sm font-bold text-slate-600">
    <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-50"><SkillLogo name={name} className="h-5 w-5" /></span>
    {name}
  </span>
);

const BuiltWith = ({ tech = [] }) =>
  tech.length > 0 && (
    <div className="mt-6">
      <Label>Built with</Label>
      <div className="flex flex-wrap gap-2">{tech.map((t) => <LogoChip key={t} name={t} />)}</div>
    </div>
  );

// the buttons in the channel screen's bottom bar, besides "Menu"
export function channelActions(tile, { openTile }) {
  switch (tile.kind) {
    case "project": {
      const p = tile.project;
      return [
        hasDeployment(p) && { label: "Visit site", href: p.previewUrl, Icon: IconExternalLink },
        p.downloadUrl && { label: "Download", href: p.downloadUrl, Icon: IconDownload },
        { label: "View code on GitHub", href: p.gitUrl, Icon: IconBrandGithub, iconOnly: true },
      ].filter(Boolean);
    }
    case "group":
      return [
        tile.group.downloadUrl && { label: "Download", href: tile.group.downloadUrl, Icon: IconDownload },
        { label: "View code on GitHub", href: tile.group.gitUrl, Icon: IconBrandGithub, iconOnly: true },
      ].filter(Boolean);
    case "about":
      return [{ label: "Copy my email", onClick: () => openTile("contact"), Icon: IconCopy }];
    case "resume":
      return [
        { label: "View resume", href: RESUME.pdf, Icon: IconFileText },
        { label: "Download", href: RESUME.pdf, download: RESUME.fileName, Icon: IconDownload },
      ];
    default:
      return [];
  }
}

const FILTERS = ["All", "Web", "Tools", "Games"];

// inside the Projects folder: every project as a tile, filterable by kind
function FolderBody({ folder, openTile }) {
  const [filter, setFilter] = useState("All");
  const tagsOf = (t) => (t.kind === "group" ? t.group.tags : t.project.tags);
  const shown = filter === "All" ? folder.projects : folder.projects.filter((t) => tagsOf(t).includes(filter));
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading>Projects</Heading>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-extrabold transition ${
                filter === f ? "border-[#36b8f5] bg-[#36b8f5] text-white" : "border-[#d5d9de] bg-white text-slate-600 hover:border-[#36b8f5] hover:text-[#1e9fe0]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {shown.map((t) => (
          <li key={t.id}><Tile tile={t} from="f" onOpen={openTile} /></li>
        ))}
      </ul>
    </>
  );
}

function ProjectBody({ project: p }) {
  return (
    <>
      <Heading>{p.title}</Heading>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{p.description}</p>
      <BuiltWith tech={p.tech} />
    </>
  );
}

function GroupBody({ group }) {
  return (
    <>
      <Heading>{group.title}</Heading>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{group.description}</p>
      <BuiltWith tech={group.tech} />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {group.members.map((m) => (
          <article key={m.id} className="overflow-hidden rounded-2xl border-2 border-[#d5d9de] bg-white shadow-sm">
            <div className="relative aspect-[16/10]">
              <Image src={m.image} alt={`${m.title} screenshot`} fill sizes="(min-width: 640px) 40vw, 90vw" className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-black tracking-tight text-slate-700">{m.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{m.description}</p>
              <a href={m.gitUrl} target="_blank" rel="noopener noreferrer" aria-label={`${m.title} code on GitHub`} title="View code on GitHub"
                className="mt-3 grid h-10 w-10 place-items-center rounded-full border-2 border-[#d5d9de] text-slate-600 transition hover:border-[#36b8f5] hover:text-[#1e9fe0]">
                <IconBrandGithub size={20} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function AboutBody() {
  return (
    <>
      <Heading>Hi, I&apos;m Enrico.</Heading>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        CSUF Sophomore studying Electrical Engineering, and a Software Developer focused on building intuitive
        software. I bring hands-on experience across full-stack development, AWS, and modern DevOps practices.
        Currently building at AUTODCP, and always excited to keep learning and shipping.
      </p>
      <div className="mt-8">
        <Label>Experience</Label>
        <ul className="space-y-4">
          {EXPERIENCE.items.map((item) => {
            const [role, company] = item.split(" @ ");
            return (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-3 w-3 shrink-0 rounded-full border-[3px] border-[#36b8f5] bg-white" />
                <div>
                  <p className="text-lg font-bold text-slate-700">{role}</p>
                  {company && <p className="font-semibold text-[#1e9fe0]">{company}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function SkillsBody() {
  const [query, setQuery] = useState("");
  const searching = query.trim().length > 0;
  const found = searching ? SKILLS.flatMap((c) => c.items).filter((i) => matchesQuery(i, query)) : [];
  return (
    <>
      <Heading>Skills</Heading>
      <div className="relative mt-5 max-w-lg">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="search" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Looking for a skill? Try React, AWS, Python…" aria-label="Search my skills"
          autoComplete="off" spellCheck="false"
          className="w-full rounded-full border-2 border-[#d5d9de] bg-white py-2.5 pl-12 pr-4 font-semibold text-slate-700 outline-none placeholder:font-medium placeholder:text-slate-400 focus:border-[#36b8f5] focus:shadow-[0_0_0_4px_rgba(54,184,245,0.2)]"
        />
      </div>
      <p aria-live="polite" className="mt-2 min-h-[1.5rem] text-sm font-semibold text-slate-500">
        {searching && (found.length
          ? <>✓ {found.length === 1 ? "Yes" : `${found.length} matches`}: <span className="text-slate-700">{found.join(", ")}</span></>
          : <>&ldquo;{query.trim()}&rdquo; isn&apos;t listed here, but I pick things up fast.</>)}
      </p>
      <div className="mt-4 space-y-8">
        {SKILLS.map((c) => (
          <div key={c.title}>
            <Label>{c.title}</Label>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {c.items.map((i) => (
                <li
                  key={i}
                  className={`flex flex-col items-center gap-2 rounded-2xl border-2 bg-white px-2 pb-2.5 pt-3.5 text-center transition ${
                    searching ? (matchesQuery(i, query) ? "border-[#36b8f5] shadow-[0_0_0_3px_rgba(54,184,245,0.2)]" : "border-[#d5d9de] opacity-30") : "border-[#d5d9de]"
                  }`}
                >
                  <SkillLogo name={i} className="h-10 w-10" />
                  <span className="text-[13px] font-bold leading-tight text-slate-600">{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

// the resume, readable right here: the PDF itself on wide screens (phones show PDFs badly inline,
// so they get a sharp picture of the page instead); the bar below opens or downloads the file
function ResumeBody() {
  return (
    <>
      <Heading>Resume</Heading>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        One page: experience at AUTODCP, projects, skills and education. Open it full size or download the PDF
        with the buttons below.
      </p>
      <iframe
        src={`${RESUME.pdf}#view=FitH`} title="Enrico Zamarripa resume (PDF)"
        className="mt-6 hidden aspect-[8.5/11] w-full rounded-2xl border-2 border-[#d5d9de] bg-white md:block"
      />
      <a href={RESUME.pdf} target="_blank" rel="noopener noreferrer" className="mt-6 block md:hidden">
        <Image
          src={RESUME.page} alt="Enrico Zamarripa's resume, page 1" width={1700} height={2200} sizes="90vw"
          className="h-auto w-full rounded-2xl border-2 border-[#d5d9de] bg-white"
        />
      </a>
    </>
  );
}

export default function ChannelBody({ tile, openTile }) {
  switch (tile.kind) {
    case "folder": return <FolderBody folder={tile} openTile={openTile} />;
    case "project": return <ProjectBody project={tile.project} />;
    case "group": return <GroupBody group={tile.group} />;
    case "about": return <AboutBody />;
    case "skills": return <SkillsBody />;
    case "resume": return <ResumeBody />;
    default: return null;
  }
}
