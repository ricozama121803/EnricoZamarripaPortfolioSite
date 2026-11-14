import React from "react";
import Link from "next/link";
import { IconBrandGithub, IconExternalLink, IconDownload } from "@tabler/icons-react";
import GlowCard from "./GlowCard";

const action =
  "inline-flex items-center gap-1.5 rounded-full border border-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-800/60 hover:text-white";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, downloadUrl, tags = [] }) => {
  // the Live button opens the deployment; projects whose preview just points at GitHub don't show it
  const hasDeployment = Boolean(previewUrl) && previewUrl !== gitUrl;
  return (
    <GlowCard className="group/card transition-transform duration-200 ease-out hover:-translate-y-1" innerClassName="flex flex-col overflow-hidden">
      <div className="relative h-48 overflow-hidden rounded-t-xl border-b border-neutral-800 md:h-56">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover/card:scale-105"
          style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-neutral-800 bg-neutral-950/60 px-2.5 py-0.5 text-[11px] font-medium text-neutral-400">
              {tag}
            </span>
          ))}
        </div>
        <h5 className="mb-2 text-lg font-semibold tracking-tight text-neutral-100">{title}</h5>
        <p className="flex-1 text-sm leading-relaxed text-neutral-400">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={gitUrl} target="_blank" rel="noopener noreferrer" className={action}>
            <IconBrandGithub size={14} /> Code
          </Link>
          {hasDeployment && (
            <Link href={previewUrl} target="_blank" rel="noopener noreferrer" className={action}>
              <IconExternalLink size={14} /> Live
            </Link>
          )}
          {downloadUrl && (
            <Link href={downloadUrl} target="_blank" rel="noopener noreferrer" className={action}>
              <IconDownload size={14} /> Download
            </Link>
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default ProjectCard;
