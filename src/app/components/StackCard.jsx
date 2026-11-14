"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FolderOpenIcon, XMarkIcon, ArrowUpRightIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
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
        <div aria-hidden="true" className="absolute inset-x-3 top-0 bottom-3 rounded-lg border border-ink-600 bg-ink-700/80 transition-transform duration-300 ease-out rotate-[-2.5deg] group-hover/card:rotate-[-5deg] group-hover/card:-translate-x-2" />
        <div aria-hidden="true" className="absolute inset-x-1.5 top-1.5 bottom-1.5 rounded-lg border border-ink-600 bg-ink-700 transition-transform duration-300 ease-out rotate-[1.8deg] group-hover/card:rotate-[4deg] group-hover/card:translate-x-2" />

        <div className="relative h-full transition-transform duration-200 ease-out group-hover/card:-translate-y-1">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-lg opacity-0 shadow-[0_0_34px_-6px_rgba(27,154,243,0.75)] transition-opacity duration-200 ease-out group-hover/card:opacity-100" />
          <div className="relative h-full flex flex-col rounded-lg border border-ink-600 bg-ink-800 overflow-hidden transition-colors duration-200 group-hover/card:border-electric-500">
            <div className="h-0.5 w-full bg-gradient-to-r from-electric-900 via-electric-300 to-electric-900 opacity-40 group-hover/card:opacity-100 transition-opacity duration-200" />
            <button
              ref={openerRef} type="button" onClick={() => setOpen(true)}
              aria-label={`Open ${group.title}: ${members.length} projects`}
              className="h-52 md:h-64 relative overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-300"
            >
              {/* collage of the projects inside */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5 bg-ink-950 transition-transform duration-300 ease-out group-hover/card:scale-105">
                {covers.map((m) => (
                  <div key={m.id} className="bg-cover bg-center" style={{ backgroundImage: `url(${m.image})` }} />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded border border-electric-500/60 bg-ink-950/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-electric-100">
                {members.length} projects
              </span>
              <span className="absolute inset-0 flex items-center justify-center bg-ink-950/70 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100">
                <span className="flex items-center gap-2 rounded-full border-2 border-electric-300/70 bg-ink-950/60 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-electric-100">
                  <FolderOpenIcon className="h-5 w-5" /> Open stack
                </span>
              </span>
            </button>
            <div className="text-white flex-1 flex flex-col py-5 px-5">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-300 border border-electric-900 rounded px-2 py-0.5">{t}</span>
                ))}
              </div>
              <h5 className="font-display text-xl font-semibold uppercase tracking-wide mb-2 group-hover/card:text-glow-soft">{group.title}</h5>
              <p className="text-slate-400 text-sm leading-relaxed">{group.description}</p>
              <p className="mt-3 text-slate-500 text-xs leading-relaxed">{members.map((m) => m.title).join(" · ")}</p>
              <div className="mt-auto pt-5 flex flex-wrap gap-5 font-mono text-xs uppercase tracking-widest">
                <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-1 uppercase tracking-widest text-electric-300 hover:text-white">
                  Open <FolderOpenIcon className="h-3.5 w-3.5" />
                </button>
                <Link href={group.gitUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-electric-300 hover:text-white">
                  Code <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
                {group.downloadUrl && (
                  <Link href={group.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-electric-300 hover:text-white">
                    Download <ArrowDownTrayIcon className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="stack"
              className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-950/95 backdrop-blur-md px-4 py-10 sm:py-16"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
              onClick={(e) => e.target === e.currentTarget && setOpen(false)}
              role="dialog" aria-modal="true" aria-label={group.title}
            >
              <div className="w-full max-w-6xl" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex-1">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric-300">Stack · {members.length} projects</p>
                    <h3 className="mt-1 font-display text-3xl font-semibold uppercase tracking-wide text-white">{group.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm text-slate-400">{group.description}</p>
                  </div>
                  <button
                    ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close"
                    className="h-11 w-11 shrink-0 rounded-full border-2 border-electric-300/70 bg-ink-950/60 text-electric-100 hover:border-white hover:text-white grid place-items-center"
                  >
                    <XMarkIcon className="h-6 w-6" />
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
