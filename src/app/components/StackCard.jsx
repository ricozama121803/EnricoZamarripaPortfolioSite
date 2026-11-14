"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { IconFolderOpen, IconX, IconBrandGithub, IconDownload } from "@tabler/icons-react";
import GlowCard from "./GlowCard";

const action =
  "inline-flex items-center gap-1.5 rounded-full border border-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-800/60 hover:text-white";
import ProjectCard from "./ProjectCard";

// A group of projects shown as a stack of cards; opening it lays the projects out in an overlay.
const StackCard = ({ group, members }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef(null);
  const openerRef = useRef(null);
  const tags = group.tag.filter((t) => t !== "All");
  const covers = members.slice(0, 6);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const opener = openerRef.current;
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <div className="group/card relative h-full pt-3">
        {/* the cards underneath: they fan out a little on hover */}
        <div aria-hidden="true" className="absolute inset-x-4 top-0 bottom-4 rounded-2xl border border-slate-800/70 bg-[#0c1222]/60 transition-transform duration-300 ease-out rotate-[-2.5deg] group-hover/card:rotate-[-5deg] group-hover/card:-translate-x-2" />
        <div aria-hidden="true" className="absolute inset-x-2 top-1.5 bottom-2 rounded-2xl border border-slate-800/70 bg-[#0c1222]/80 transition-transform duration-300 ease-out rotate-[1.8deg] group-hover/card:rotate-[4deg] group-hover/card:translate-x-2" />

        <GlowCard className="transition-transform duration-200 ease-out group-hover/card:-translate-y-1 bg-neutral-950" innerClassName="flex flex-col overflow-hidden">
          <button
            ref={openerRef} type="button" onClick={() => setOpen(true)}
            aria-label={`Open ${group.title}: ${members.length} projects`}
            className="relative h-48 overflow-hidden rounded-t-xl border-b border-neutral-800 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-300 md:h-56"
          >
            {/* collage of the projects inside */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5 bg-neutral-950 transition-transform duration-500 ease-out group-hover/card:scale-105">
              {covers.map((m) => (
                <div key={m.id} className="bg-cover bg-center" style={{ backgroundImage: `url(${m.image})` }} />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full border border-neutral-700 bg-neutral-950/80 px-2.5 py-1 text-[11px] font-medium text-neutral-200 backdrop-blur">
              {members.length} projects
            </span>
            <span className="absolute inset-0 flex items-center justify-center bg-neutral-950/60 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100">
              <span className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-4 py-2 text-sm font-medium text-white">
                <IconFolderOpen size={18} /> Open stack
              </span>
            </span>
          </button>
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span key={t} className="rounded-full border border-neutral-800 bg-neutral-950/60 px-2.5 py-0.5 text-[11px] font-medium text-neutral-400">{t}</span>
              ))}
            </div>
            <h5 className="mb-2 text-lg font-semibold tracking-tight text-neutral-100">{group.title}</h5>
            <p className="text-sm leading-relaxed text-neutral-400">{group.description}</p>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500">{members.map((m) => m.title).join(" · ")}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              <button type="button" onClick={() => setOpen(true)} className={action}>
                <IconFolderOpen size={14} /> Open
              </button>
              <Link href={group.gitUrl} target="_blank" rel="noopener noreferrer" className={action}>
                <IconBrandGithub size={14} /> Code
              </Link>
              {group.downloadUrl && (
                <Link href={group.downloadUrl} target="_blank" rel="noopener noreferrer" className={action}>
                  <IconDownload size={14} /> Download
                </Link>
              )}
            </div>
          </div>
        </GlowCard>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="stack"
              className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-neutral-950/95 backdrop-blur-md px-4 py-10 sm:py-16"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
              onClick={(e) => e.target === e.currentTarget && setOpen(false)}
              role="dialog" aria-modal="true" aria-label={group.title}
            >
              <div className="w-full max-w-6xl" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex-1">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500"><span className="text-electric-300/80">Stack</span> · {members.length} projects</p>
                    <h3 className="mt-1 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">{group.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm text-neutral-400">{group.description}</p>
                  </div>
                  <button
                    ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close"
                    className="h-10 w-10 shrink-0 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white grid place-items-center"
                  >
                    <IconX size={20} />
                  </button>
                </div>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {members.map((m, i) => (
                    <motion.li
                      key={m.id}
                      initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut", delay: 0.04 * i }}
                    >
                      <ProjectCard
                        title={m.title} description={m.description} imgUrl={m.image} gitUrl={m.gitUrl}
                        previewUrl={m.previewUrl} downloadUrl={m.downloadUrl} tags={m.tag.filter((t) => t !== "All")}
                      />
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};

export default StackCard;
