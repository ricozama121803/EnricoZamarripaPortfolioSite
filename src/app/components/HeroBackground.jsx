"use client";
import React, { useEffect, useRef, useState } from "react";
import { Spotlight } from "./ui/spotlight-new";
import { BackgroundBeams } from "./ui/background-beams";
import { cn } from "../lib/utils";

// Hero backdrop. While developing, a switcher in the corner swaps between the options to compare them;
// production shows DEFAULT only.
const OPTIONS = [
  ["beams", "Beams"],
  ["dots", "Dots"],
  ["aurora", "Aurora"],
  ["stars", "Stars"],
];
const DEFAULT = "stars";
const DEV = process.env.NODE_ENV === "development";

// where the pointer is, relative to an element (null when it's elsewhere)
function usePointer(ref) {
  const [pos, setPos] = useState(null);
  useEffect(() => {
    const move = (e) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const x = e.clientX - r.left, y = e.clientY - r.top;
      setPos(x >= 0 && y >= 0 && x <= r.width && y <= r.height ? { x, y } : null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [ref]);
  return pos;
}

// A faint dot grid fading out at the edges; under the cursor the dots turn electric blue in a soft glow.
function DotGrid() {
  const ref = useRef(null);
  const pos = usePointer(ref);
  const at = pos ? `${pos.x}px ${pos.y}px` : "50% -20%";
  const fade = "radial-gradient(ellipse 75% 65% at 50% 40%, #000 30%, transparent 100%)";
  return (
    <div ref={ref} className="absolute inset-0">
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:22px_22px]"
        style={{ maskImage: fade, WebkitMaskImage: fade }} />
      <div
        className="absolute inset-0 [background-image:radial-gradient(rgba(84,202,235,0.85)_1.2px,transparent_1.2px)] [background-size:22px_22px] transition-opacity duration-300"
        style={{
          opacity: pos ? 1 : 0.35,
          maskImage: `radial-gradient(240px circle at ${at}, #000, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(240px circle at ${at}, #000, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: pos ? 1 : 0.6, background: `radial-gradient(420px circle at ${at}, rgba(27,154,243,0.10), transparent 70%)` }} />
    </div>
  );
}

// Slow drifting bands of blue light (an "aurora"), blurred and faded toward the bottom.
function Aurora() {
  const bands =
    "repeating-linear-gradient(100deg, #1269D8 10%, #54CAEB 15%, #7B8CFF 20%, #1B9AF3 25%, #174AA1 30%)";
  const fade = "radial-gradient(ellipse at 70% 0%, #000 10%, transparent 70%)";
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ maskImage: fade, WebkitMaskImage: fade }}>
      <div
        className="absolute -inset-[10px] opacity-40 blur-[10px] will-change-transform motion-safe:animate-aurora"
        style={{
          backgroundImage: `repeating-linear-gradient(100deg, #0a0a0a 0%, #0a0a0a 7%, transparent 10%, transparent 12%, #0a0a0a 16%), ${bands}`,
          backgroundSize: "300%, 200%",
          backgroundPosition: "50% 50%, 50% 50%",
        }}
      />
    </div>
  );
}

// Twinkling stars (some tinted, a few bright ones with a glow) and shooting stars, on a canvas over two soft
// nebula glows. The animation pauses while the hero is off-screen or the tab is hidden.
const TINTS = ["214,243,255", "214,243,255", "214,243,255", "255,255,255", "84,202,235", "160,170,255"];

function Stars() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, stars = [], shots = [], nextShot = 0.8, visible = true;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((w * h) / 2600) }, () => {
        const bright = Math.random() < 0.04;
        return {
          x: Math.random() * w, y: Math.random() * h,
          r: bright ? 1.4 + Math.random() * 0.8 : 0.35 + Math.random() * 1.0,
          a: bright ? 1 : 0.35 + Math.random() * 0.55,
          s: 0.6 + Math.random() * 1.8, p: Math.random() * 6.28,
          c: TINTS[Math.floor(Math.random() * TINTS.length)], bright,
        };
      });
    };
    const draw = (t, dt) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(t * s.s + s.p);
        if (s.bright) {                                     // soft halo
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 7);
          g.addColorStop(0, `rgba(${s.c},${0.35 * tw})`); g.addColorStop(1, `rgba(${s.c},0)`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 7, 0, 6.283); ctx.fill();
        }
        ctx.fillStyle = `rgba(${s.c},${s.a * tw})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
      if (reduce) return;
      nextShot -= dt;
      if (nextShot <= 0 && shots.length < 2) {
        const ang = (18 + Math.random() * 30) * Math.PI / 180, v = 700 + Math.random() * 500;
        shots.push({ x: Math.random() * w * 0.8, y: Math.random() * h * 0.45, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, life: 0, len: 160 + Math.random() * 120 });
        nextShot = 1.2 + Math.random() * 2.8;
      }
      shots = shots.filter((sh) => {
        sh.life += dt; sh.x += sh.vx * dt; sh.y += sh.vy * dt;
        const n = Math.hypot(sh.vx, sh.vy), tx = sh.x - (sh.vx / n) * sh.len, ty = sh.y - (sh.vy / n) * sh.len;
        const fade = Math.min(1, sh.life * 4) * Math.max(0, 1 - sh.life / 1.6);
        const g = ctx.createLinearGradient(tx, ty, sh.x, sh.y);
        g.addColorStop(0, "rgba(27,154,243,0)"); g.addColorStop(0.7, `rgba(84,202,235,${0.5 * fade})`); g.addColorStop(1, `rgba(255,255,255,${fade})`);
        ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(sh.x, sh.y); ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${fade})`; ctx.beginPath(); ctx.arc(sh.x, sh.y, 1.6, 0, 6.283); ctx.fill();
        return sh.life < 1.6 && sh.x < w + sh.len && sh.y < h + sh.len;
      });
    };
    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      draw(now / 1000, dt);
      raf = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
    };
    const start = () => { if (!raf && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    resize();
    draw(0, 0);
    const ro = new ResizeObserver(() => { resize(); draw(performance.now() / 1000, 0); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); });
    io.observe(canvas);
    const onVis = () => start();
    document.addEventListener("visibilitychange", onVis);
    if (!reduce) start();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);
  return (
    <>
      {/* nebula glows: static gradients, no animation cost */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_75%_30%,rgba(27,154,243,0.16),transparent_70%),radial-gradient(ellipse_50%_50%_at_15%_70%,rgba(123,140,255,0.12),transparent_70%)]" />
      <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </>
  );
}

export default function HeroBackground() {
  const [bg, setBg] = useState(DEFAULT);
  useEffect(() => {
    if (!DEV) return;
    try { const s = localStorage.getItem("hero-bg"); if (s && OPTIONS.some(([k]) => k === s)) setBg(s); } catch {}
  }, []);
  const choose = (k) => { setBg(k); try { localStorage.setItem("hero-bg", k); } catch {} };

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {bg === "beams" && (<><Spotlight /><BackgroundBeams /></>)}
        {bg === "dots" && <DotGrid />}
        {bg === "aurora" && <Aurora />}
        {bg === "stars" && <Stars />}
      </div>
      {DEV && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-950/80 p-1 text-xs backdrop-blur">
          <span className="px-2 text-neutral-500">Background</span>
          {OPTIONS.map(([k, label]) => (
            <button key={k} type="button" onClick={() => choose(k)} aria-pressed={bg === k}
              className={cn("rounded-full px-3 py-1 transition", bg === k ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white")}>
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
