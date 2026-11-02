"use client";
import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SKILL_CATEGORIES, matchesQuery } from "../data/skills";
import JobMatch from "./JobMatch";

// job-description match tool; hidden for now, flip to true to show it again
const SHOW_JOB_MATCH = false;
const [EXPERIENCE, ...SKILLS] = SKILL_CATEGORIES;
const matches = matchesQuery;

// wraps the typed text in a highlight when it appears literally in the item
const Highlight = ({ text, query }) => {
  const q = query.trim();
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-electric-500/30 text-white rounded-sm px-0.5 -mx-0.5">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
};

const columnTitle = "font-mono text-xs uppercase tracking-[0.25em] text-electric-300 mb-6";

const SkillsSection = () => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const searching = query.trim().length > 0;

  const allItems = SKILL_CATEGORIES.flatMap((c) => c.items);
  const found = searching ? allItems.filter((item) => matches(item, query)) : [];

  // "/" jumps to the search box, like on GitHub
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "/" || e.target.closest("input, textarea")) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // classes for an item depending on whether it matches the current search
  const itemState = (item) => {
    if (!searching) return "";
    return matches(item, query) ? "text-white" : "opacity-25";
  };

  return (
    <section className="text-white py-8 sm:py-12" id="skills">
      <SectionHeading index="01" label="Background" title="Skills & Experience" />

      <div className="mt-8 max-w-xl">
        <label htmlFor="skill-search" className="sr-only">
          Search my skills
        </label>
        <div className="relative">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-electric-300" />
          <input
            ref={inputRef}
            id="skill-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            placeholder="Looking for a skill? Try React, AWS, Python…"
            autoComplete="off"
            spellCheck="false"
            className="w-full rounded-md border border-ink-600 bg-ink-800/80 py-3 pl-12 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-electric-300 focus:shadow-[0_0_20px_-4px_rgba(27,154,243,0.9)] [&::-webkit-search-cancel-button]:hidden"
          />
          {searching ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 hidden sm:block rounded border border-ink-600 px-1.5 font-mono text-xs text-slate-500">
              /
            </kbd>
          )}
        </div>
        <p aria-live="polite" className="mt-3 min-h-[1.5rem] text-sm">
          {searching &&
            (found.length > 0 ? (
              <span className="text-electric-300">
                <span className="font-mono">&#10003;</span> {found.length === 1 ? "Yes" : `${found.length} matches`}:{" "}
                <span className="text-white">{found.join(", ")}</span>
              </span>
            ) : (
              <span className="text-slate-400">
                &ldquo;{query.trim()}&rdquo; isn&apos;t listed here, but I pick things up fast.{" "}
                <a href="#contact" className="text-electric-300 underline underline-offset-4 hover:text-white">
                  Ask me about it
                </a>
              </span>
            ))}
        </p>
      </div>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h3 className={columnTitle}>Experience</h3>
          <ul className="space-y-6">
            {EXPERIENCE.items.map((item) => {
              const [role, company] = item.split(" @ ");
              return (
                <li key={item} className={`border-l-2 border-electric-500 pl-4 transition-opacity ${itemState(item)}`}>
                  <p className="text-lg font-medium text-white">
                    <Highlight text={role} query={query} />
                  </p>
                  {company && (
                    <p className="font-display tracking-wide text-electric-300">
                      <Highlight text={company} query={query} />
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className={columnTitle}>Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
            {SKILLS.map((category) => {
              const hasMatch = category.items.some((item) => matches(item, query));
              return (
                <div key={category.title}>
                  <h4
                    className={`text-sm font-semibold text-white mb-3 transition-opacity ${
                      searching && !hasMatch ? "opacity-25" : ""
                    }`}
                  >
                    {category.title}
                  </h4>
                  <ul className="space-y-1.5 text-sm sm:text-base text-slate-400">
                    {category.items.map((item) => (
                      <li key={item} className={`transition ${itemState(item)}`}>
                        <Highlight text={item} query={query} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {SHOW_JOB_MATCH && <JobMatch />}
    </section>
  );
};

export default SkillsSection;
