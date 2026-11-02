import React from "react";
import { CodeBracketIcon, EyeIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const iconLink =
  "h-14 w-14 relative rounded-full border-2 border-electric-300/70 bg-ink-950/60 hover:border-white hover:shadow-[0_0_20px_rgba(27,154,243,0.9)] transition-[border-color,box-shadow] duration-150 group/link";
const iconStyle =
  "h-8 w-8 text-electric-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, tags = [] }) => {
  // the eye button opens the live deployment; projects without one (preview just points at GitHub) don't show it
  const hasDeployment = Boolean(previewUrl) && previewUrl !== gitUrl;
  return (
    <div className="group/card relative h-full transition-transform duration-200 ease-out hover:-translate-y-1">
      {/* glow sits on its own layer and only fades, so hovering never repaints the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[0_0_34px_-6px_rgba(27,154,243,0.75)] transition-opacity duration-200 ease-out group-hover/card:opacity-100"
      />
      <div className="relative h-full flex flex-col rounded-lg border border-ink-600 bg-ink-800/90 overflow-hidden transition-colors duration-200 group-hover/card:border-electric-500">
      {/* charge bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-electric-900 via-electric-300 to-electric-900 opacity-40 group-hover/card:opacity-100 transition-opacity duration-200" />
      <div className="h-52 md:h-64 relative group overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out group-hover/card:scale-105"
          style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="overlay flex items-center justify-center gap-3 absolute inset-0 bg-ink-950/75 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 focus-within:opacity-100">
          <Link href={gitUrl} className={iconLink} target="_blank" rel="noopener noreferrer" aria-label={`${title} source code`}>
            <CodeBracketIcon className={iconStyle} />
          </Link>
          {hasDeployment && (
            <Link href={previewUrl} className={iconLink} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo`}>
              <EyeIcon className={iconStyle} />
            </Link>
          )}
        </div>
      </div>
      <div className="text-white flex-1 flex flex-col py-5 px-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-300 border border-electric-900 rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <h5 className="font-display text-xl font-semibold uppercase tracking-wide mb-2 group-hover/card:text-glow-soft">
          {title}
        </h5>
        <p className="text-slate-400 text-sm leading-relaxed flex-1">{description}</p>
        <div className="mt-5 flex gap-5 font-mono text-xs uppercase tracking-widest">
          <Link href={gitUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-electric-300 hover:text-white">
            Code <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </Link>
          {hasDeployment && (
            <Link href={previewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-electric-300 hover:text-white">
              Live <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProjectCard;
