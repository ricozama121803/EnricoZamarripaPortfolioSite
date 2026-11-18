"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { IconBarrierBlock, IconBrandGithub, IconDownload, IconExternalLink, IconTerminal2 } from "@tabler/icons-react";
import { projectsData, projectGroups } from "../data/projects";
import SkillLogo from "./SkillLogo";

const CATEGORIES = ["All", "Web", "CLI", "Games", "Extensions"];

// These lead the list, in this order; these close it out, in this order; everything else sits between them,
// newest first.
const PINNED_FIRST = ["UmbraFlow", "ProfSpot | CSUF", "¡Pnch!", "Snap Shelf"];
const PINNED_LAST = ["Film Fest Scraper", "QuizzAI", "Statics Playground"];
// ProfSpot | UIUC sorts as if it were as new as ProfSpot | CSUF (id 9): the two swapped places
const SORT_AS = { "ProfSpot | UIUC": 9 };
const rank = (p) => {
  if (PINNED_FIRST.includes(p.title)) return [0, PINNED_FIRST.indexOf(p.title)];
  if (PINNED_LAST.includes(p.title)) return [2, PINNED_LAST.indexOf(p.title)];
  return [1, -(SORT_AS[p.title] ?? p.order)];
};
const byRank = (a, b) => {
  const [ga, ia] = rank(a), [gb, ib] = rank(b);
  return ga - gb || ia - ib;
};

// The full list: loose projects plus each group as one card (placed by its newest member).
function buildList() {
  const loose = projectsData.filter((p) => !p.group).map((p) => ({ ...p, key: `p-${p.id}`, order: p.id }));
  const groups = projectGroups
    .map((g) => {
      const members = projectsData.filter((p) => p.group === g.id).sort((a, b) => b.id - a.id);
      const tech = [...new Set(members.flatMap((m) => m.tech || []))];
      return { ...g, members, tech, key: `g-${g.id}`, order: members[0]?.id ?? 0 };
    })
    .filter((g) => g.members.length);
  return [...loose, ...groups].sort(byRank);
}

const action =
  "inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-white/25 hover:bg-white/5 hover:text-white";

// deployed somewhere real, not just a link back to the repo
const isLive = (p) => !p.notLive && Boolean(p.previewUrl) && p.previewUrl !== p.gitUrl;

function Links({ gitUrl, previewUrl, downloadUrl, notLive }) {
  const live = isLive({ gitUrl, previewUrl, notLive });
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <a href={gitUrl} target="_blank" rel="noopener noreferrer" className={action}><IconBrandGithub size={14} /> Code</a>
      {live && <a href={previewUrl} target="_blank" rel="noopener noreferrer" className={action}><IconExternalLink size={14} /> Live</a>}
      {downloadUrl && <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className={action}><IconDownload size={14} /> Download</a>}
    </div>
  );
}

const IMAGE_SIZES = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw";

function Card({ item }) {
  const group = Boolean(item.members);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1c]/90 transition-colors hover:border-white/20">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-neutral-900">
        {group ? (
          <div className="grid h-full grid-cols-3 grid-rows-2 gap-px">
            {item.members.slice(0, 6).map((m) => (
              <div key={m.id} className="relative">
                <Image src={m.image} alt="" fill sizes="(min-width: 1024px) 120px, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <Image src={item.image} alt={`${item.title} screenshot`} fill sizes={IMAGE_SIZES} className="object-cover object-top" />
        )}
        {item.inProgress && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-950 shadow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-amber-900/60" />
              <span className="relative h-2 w-2 rounded-full bg-amber-900" />
            </span>
            In progress
          </span>
        )}
        {item.underConstruction && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-950 shadow">
            <IconBarrierBlock size={14} stroke={2.2} />
            Under construction
          </span>
        )}
        {isLive(item) && (
          <a href={item.previewUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} is live: open it`}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-[#05070f] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300 shadow transition hover:border-emerald-300 hover:text-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live
          </a>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {item.tag.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-neutral-400">
              {t === "CLI" && <IconTerminal2 size={13} className="text-electric-300" aria-hidden="true" />}
              {t}
            </span>
          ))}
          {group && <span className="text-[11px] text-neutral-500">{item.members.length} games</span>}
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-neutral-100">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">{item.description}</p>
        {group && <p className="mt-3 text-xs text-neutral-500">{item.members.map((m) => m.title).join(" · ")}</p>}
        {item.tech?.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {item.tech.slice(0, 6).map((t) => (
              <span key={t} title={t}><SkillLogo name={t} className="h-5 w-5" /></span>
            ))}
          </div>
        )}
        <Links gitUrl={item.gitUrl} previewUrl={item.previewUrl} downloadUrl={item.downloadUrl} notLive={item.notLive} />
      </div>
    </article>
  );
}

export default function Projects() {
  const all = useMemo(buildList, []);
  const [category, setCategory] = useState("All");

  // under "Games" the 3DS games are listed one by one; everywhere else they're one card
  const shown = useMemo(() => {
    if (category === "All") return all;
    if (category === "Games") {
      return projectsData.filter((p) => p.tag.includes("Games")).sort((a, b) => b.id - a.id).map((p) => ({ ...p, key: `p-${p.id}` }));
    }
    return all.filter((p) => !p.members && p.tag.includes(category));
  }, [all, category]);

  const count = (c) => (c === "All" ? all.length : projectsData.filter((p) => p.tag.includes(c)).length);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Projects</h2>
      <div role="group" aria-label="Filter projects" className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category === c}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              category === c ? "border-electric-300 bg-electric-300/15 text-white" : "border-white/10 text-neutral-400 hover:border-white/25 hover:text-white"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {c === "CLI" && <IconTerminal2 size={15} aria-hidden="true" />}
              {c} <span className="text-neutral-500">{count(c)}</span>
            </span>
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <li key={item.key}><Card item={item} /></li>
        ))}
      </ul>
    </section>
  );
}
