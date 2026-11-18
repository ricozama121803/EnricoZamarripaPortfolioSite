"use client";
import { useEffect, useRef, useState } from "react";
import { IconArrowUp, IconListDetails, IconX } from "@tabler/icons-react";

const SECTIONS = [
  ["Top", "#top"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

// The navbar scrolls away with the page, so once you're past the hero a small round button in the corner
// opens a list of the sections to jump to. The links are plain #anchors, so Back returns to where you were.
export default function SectionJump() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on Escape or a tap anywhere else
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => { if (!shown) setOpen(false); }, [shown]);

  return (
    <div
      ref={ref}
      className={`fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 transition-all duration-200 sm:bottom-8 sm:right-8 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {open && (
        <ul id="section-jump" className="w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1c] py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          {SECTIONS.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white">
                {label}
                {href === "#top" && <IconArrowUp size={15} className="text-neutral-500" />}
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button" onClick={() => setOpen((o) => !o)} tabIndex={shown ? 0 : -1}
        aria-label={open ? "Close section menu" : "Jump to a section"} aria-expanded={open} aria-controls="section-jump"
        className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-[#0b0f1c] text-neutral-200 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_24px_-6px_rgba(27,154,243,0.6)] transition hover:border-electric-300 hover:text-white"
      >
        {open ? <IconX size={20} /> : <IconListDetails size={20} />}
      </button>
    </div>
  );
}
