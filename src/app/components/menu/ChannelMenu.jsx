"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconAlertCircle, IconArrowLeft, IconCheck, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import TileArt from "./TileArt";
import Tile, { artId } from "./Tile";
import BottomBar from "./BottomBar";
import ChannelBody, { channelActions } from "./ChannelContent";
import { EMAIL, buildChannels, paginate } from "./tiles";

const pillButton =
  "inline-flex h-12 min-w-[7.5rem] items-center justify-center gap-2 rounded-full border-[3px] border-[#c9ced4] bg-[linear-gradient(#ffffff,#eef0f2)] px-5 text-base font-black text-slate-600 shadow-[0_3px_8px_rgba(0,0,0,0.1)] transition hover:border-[#36b8f5] hover:text-[#1e9fe0] hover:shadow-[0_0_0_4px_rgba(54,184,245,0.22)] focus:outline-none focus-visible:border-[#36b8f5] focus-visible:shadow-[0_0_0_4px_rgba(54,184,245,0.35)] md:h-16 md:min-w-[12rem] md:text-xl";

// round, icon-only version of the bar button (used for the GitHub link)
const roundButton =
  "inline-grid h-12 w-12 place-items-center rounded-full border-[3px] border-[#c9ced4] bg-[linear-gradient(#ffffff,#eef0f2)] text-slate-600 shadow-[0_3px_8px_rgba(0,0,0,0.1)] transition hover:border-[#36b8f5] hover:text-[#1e9fe0] hover:shadow-[0_0_0_4px_rgba(54,184,245,0.22)] focus:outline-none focus-visible:border-[#36b8f5] focus-visible:shadow-[0_0_0_4px_rgba(54,184,245,0.35)] md:h-16 md:w-16";

// copy text to the clipboard, falling back to a hidden textarea where the Clipboard API isn't available
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

// One open channel. Channels stack: a project opened from the Projects folder sits on top of the folder,
// so "Back" returns to the folder and "Menu" closes everything.
function ChannelScreen({ tile, from, depth, onBack, onMenu, openTile }) {
  const firstRef = useRef(null);
  const actions = channelActions(tile, { openTile });

  useEffect(() => {
    firstRef.current?.focus({ preventScroll: true });
  }, [tile.id]);

  return (
    <motion.div
      role="dialog" aria-modal="true" aria-label={tile.title}
      className="pinstripes fixed inset-0 overflow-y-auto"
      style={{ zIndex: 50 + depth }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.1 } }}
      transition={{ duration: 0.2 }}
    >
      <div className="mx-auto max-w-5xl px-4 pb-36 pt-6 md:pb-44 md:pt-10">
        <motion.div
          layoutId={artId(from, tile.id)}
          style={{ borderRadius: 28 }}
          initial={from === "bar" ? { opacity: 0, scale: 0.9 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="art relative mx-auto aspect-[16/10] w-full max-w-[calc(52vh*1.6)] overflow-hidden border-[5px] border-white shadow-[0_0_0_2px_#c4c9cf,0_20px_40px_-12px_rgba(0,0,0,0.25)]"
        >
          <TileArt tile={tile} />
        </motion.div>
        <motion.section
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24, transition: { duration: 0.15 } }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mt-6 rounded-[28px] border-2 border-[#d5d9de] bg-white/90 p-6 shadow-sm backdrop-blur md:mt-8 md:p-10"
        >
          <ChannelBody tile={tile} openTile={openTile} />
        </motion.section>
      </div>

      {/* the channel's own bottom bar: back / menu, plus whatever this channel can do */}
      <motion.div
        initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }} transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed inset-x-0 bottom-0 z-10 border-t-[3px] border-[#36b8f5] bg-[linear-gradient(#f6f7f8,#dcdfe3)] shadow-[0_-1px_0_#fff_inset]"
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 py-4 md:gap-6 md:py-6">
          {depth > 0 && (
            <button ref={firstRef} type="button" onClick={onBack} className={pillButton}>
              <IconArrowLeft className="h-5 w-5 md:h-6 md:w-6" stroke={2.4} /> Back
            </button>
          )}
          <button ref={depth > 0 ? undefined : firstRef} type="button" onClick={onMenu} className={pillButton}>Menu</button>
          {actions.map(({ label, href, onClick, Icon, iconOnly }) =>
            href ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={iconOnly ? `${label} (opens in a new tab)` : undefined} title={iconOnly ? label : undefined} className={iconOnly ? roundButton : pillButton}>
                <Icon className={iconOnly ? "h-6 w-6 md:h-8 md:w-8" : "h-5 w-5 md:h-6 md:w-6"} stroke={iconOnly ? 1.8 : 2.2} /> {!iconOnly && label}
              </a>
            ) : (
              <button key={label} type="button" onClick={onClick} className={pillButton}>
                <Icon className="h-5 w-5 md:h-6 md:w-6" stroke={2.2} /> {label}
              </button>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

const ArrowButton = ({ side, onClick }) => (
  <button
    type="button" onClick={onClick} aria-label={side === "left" ? "Previous page" : "Next page"}
    className={`absolute top-1/2 grid h-24 w-12 -translate-y-1/2 place-items-center border-[3px] border-[#c9ced4] bg-[linear-gradient(90deg,#ffffff,#eef0f2)] text-[#36b8f5] shadow-md transition hover:border-[#36b8f5] hover:shadow-[0_0_0_4px_rgba(54,184,245,0.22)] ${
      side === "left" ? "left-0 rounded-r-full border-l-0" : "right-0 rounded-l-full border-r-0"
    }`}
  >
    {side === "left" ? <IconChevronLeft size={30} stroke={3} /> : <IconChevronRight size={30} stroke={3} />}
  </button>
);

const pageVariants = {
  enter: (dir) => ({ x: `${dir * 105}%`, opacity: 0.4 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: `${dir * -105}%`, opacity: 0.4 }),
};

export default function ChannelMenu() {
  const { menu, all } = useMemo(() => buildChannels(), []);
  const pages = useMemo(() => paginate(menu), [menu]);
  const [[page, dir], setPage] = useState([0, 1]);
  const [stack, setStack] = useState([]); // open channels, bottom to top: { id, from, opener }

  // "contact" (the tile, the mail button, About's button) copies my email and says so in a toast
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(0);
  const copyEmail = useCallback(async () => {
    const ok = await copyText(EMAIL);
    setToast({ ok, text: ok ? `Copied ${EMAIL}` : `Couldn't copy. My email is ${EMAIL}` });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // a tile inside the Projects folder opens on top of it; anything else starts a fresh stack
  const openTile = useCallback((id, from = "bar", opener = null) => {
    if (id === "contact") return copyEmail();
    setStack((s) => (from === "f" ? [...s, { id, from, opener }] : [{ id, from, opener }]));
  }, [copyEmail]);
  // closing a channel hands focus back to the tile that opened it
  const stackRef = useRef(stack);
  stackRef.current = stack;
  const back = useCallback(() => {
    const s = stackRef.current;
    s[s.length - 1]?.opener?.focus({ preventScroll: true });
    setStack(s.slice(0, -1));
  }, []);
  const toMenu = useCallback(() => {
    stackRef.current[0]?.opener?.focus({ preventScroll: true });
    setStack([]);
  }, []);
  const turn = useCallback((d) => setPage(([p]) => [Math.min(pages.length - 1, Math.max(0, p + d)), d]), [pages.length]);
  const anyOpen = stack.length > 0;

  // keyboard: arrows flip menu pages, Escape steps back one channel
  useEffect(() => {
    const onKey = (e) => {
      if (anyOpen) {
        if (e.key === "Escape") back();
        return;
      }
      if (e.target.closest?.("input, textarea")) return;
      if (e.key === "ArrowRight") turn(1);
      if (e.key === "ArrowLeft") turn(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyOpen, back, turn]);

  // lock page scroll while any channel is open
  useEffect(() => {
    if (!anyOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [anyOpen]);

  return (
    <>
      <h1 className="sr-only">Enrico Zamarripa: Software Developer and Electrical Engineering student</h1>

      {/* desktop: 4 x 3 channels (the Projects folder takes 2 x 2), with arrow tabs if there's ever a second page */}
      <div className="relative hidden h-[100dvh] overflow-hidden md:block">
        <div className="absolute inset-x-0 bottom-[184px] top-0 flex items-center justify-center">
          <div className="relative" style={{ width: "min(1240px, calc(100vw - 160px), calc((100dvh - 250px) * 2.05))" }}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.ul
                key={page} custom={dir} variants={pageVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ type: "spring", stiffness: 260, damping: 32 }}
                className="grid grid-cols-4 gap-4 lg:gap-5"
              >
                {pages[page].map((tile) => (
                  <li key={tile.id} className={tile.big ? "col-span-2 row-span-2" : ""}>
                    <Tile tile={tile} from="d" onOpen={openTile} className={tile.big ? "!aspect-auto h-full" : ""} />
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
        {page > 0 && <ArrowButton side="left" onClick={() => turn(-1)} />}
        {page < pages.length - 1 && <ArrowButton side="right" onClick={() => turn(1)} />}
        {pages.length > 1 && (
          <div className="absolute inset-x-0 bottom-[192px] flex justify-center gap-2" aria-hidden="true">
            {pages.map((_, i) => (
              <span key={i} className={`h-2 rounded-full transition-all ${i === page ? "w-6 bg-[#36b8f5]" : "w-2 bg-[#c9ced4]"}`} />
            ))}
          </div>
        )}
      </div>

      {/* phones: one scrolling two-column list, the Projects folder full width */}
      <ul className="grid grid-cols-2 gap-3 px-3 pb-[140px] pt-4 md:hidden">
        {menu.map((tile) => (
          <li key={tile.id} className={tile.big ? "col-span-2" : ""}><Tile tile={tile} from="m" onOpen={openTile} /></li>
        ))}
      </ul>

      <BottomBar onAbout={() => openTile("about")} onContact={copyEmail} />

      {/* "copied" confirmation, above everything including open channels */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast" role="status"
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4"
          >
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border-[3px] border-[#36b8f5] bg-white px-5 py-2.5 text-sm font-extrabold text-slate-600 shadow-[0_8px_24px_rgba(54,184,245,0.35)] md:text-base">
              {toast.ok ? <IconCheck className="h-5 w-5 shrink-0 text-[#36b8f5]" stroke={3} /> : <IconAlertCircle className="h-5 w-5 shrink-0 text-amber-500" stroke={2.4} />}
              <span className="truncate">{toast.text}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stack.map((entry, depth) => {
          const tile = all.find((t) => t.id === entry.id);
          return tile && (
            <ChannelScreen
              key={`${depth}-${entry.id}`} tile={tile} from={entry.from} depth={depth}
              onBack={back} onMenu={toMenu} openTile={openTile}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
}
