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
const DEFAULT = "beams";
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

// Twinkling stars with an occasional shooting star, drawn on a canvas.
function Stars() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, stars = [], shot = null, nextShot = 1.5;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((w * h) / 5200) }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.6 + 0.15, s: Math.random() * 1.5 + 0.5, p: Math.random() * 6.28,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduce ? 1 : 0.65 + 0.35 * Math.sin(t * s.s + s.p);
        ctx.fillStyle = `rgba(214,243,255,${s.a * tw})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
      if (!reduce) {
        nextShot -= dt;
        if (!shot && nextShot <= 0) {
          const ang = (20 + Math.random() * 25) * Math.PI / 180;
          shot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, vx: Math.cos(ang) * 900, vy: Math.sin(ang) * 900, life: 0 };
          nextShot = 2.5 + Math.random() * 4;
        }
        if (shot) {
          shot.life += dt; shot.x += shot.vx * dt; shot.y += shot.vy * dt;
          const len = 140, n = Math.hypot(shot.vx, shot.vy);
          const tx = shot.x - (shot.vx / n) * len, ty = shot.y - (shot.vy / n) * len;
          const g = ctx.createLinearGradient(tx, ty, shot.x, shot.y);
          g.addColorStop(0, "rgba(27,154,243,0)"); g.addColorStop(1, "rgba(214,243,255,0.9)");
          ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(shot.x, shot.y); ctx.stroke();
          if (shot.x > w + len || shot.y > h + len || shot.life > 3) shot = null;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
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
