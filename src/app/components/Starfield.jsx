"use client";
import { useEffect, useRef } from "react";

// The page backdrop: twinkling stars (a few tinted, a few bright with a glow) and the odd shooting star, on one
// fixed canvas behind everything. Drawn at 30fps, paused while the tab is hidden, and still for reduced motion.
const TINTS = ["214,243,255", "214,243,255", "255,255,255", "84,202,235", "160,170,255"];
const FRAME = 1000 / 30;

export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, last = 0, stars = [], shots = [], nextShot = 1.5;

    const resize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      // phones resize the viewport as the address bar slides; keep the same stars unless it really changed
      if (nw === w && Math.abs(nh - h) < 120) return;
      w = nw; h = nh;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((w * h) / 2800) }, () => {
        const bright = Math.random() < 0.04;
        return {
          x: Math.random() * w, y: Math.random() * h,
          r: bright ? 1.3 + Math.random() * 0.8 : 0.35 + Math.random() * 0.9,
          a: bright ? 1 : 0.3 + Math.random() * 0.55,
          s: 0.6 + Math.random() * 1.6, p: Math.random() * 6.28,
          c: TINTS[Math.floor(Math.random() * TINTS.length)], bright,
        };
      });
    };

    const draw = (t, dt) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(t * s.s + s.p);
        if (s.bright) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
          g.addColorStop(0, `rgba(${s.c},${0.3 * tw})`);
          g.addColorStop(1, `rgba(${s.c},0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 6, 0, 6.283); ctx.fill();
        }
        ctx.fillStyle = `rgba(${s.c},${s.a * tw})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
      if (reduce) return;
      nextShot -= dt;
      if (nextShot <= 0 && shots.length < 1) {
        const ang = (18 + Math.random() * 30) * Math.PI / 180, v = 650 + Math.random() * 450;
        shots.push({ x: Math.random() * w * 0.8, y: Math.random() * h * 0.4, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, life: 0, len: 140 + Math.random() * 100 });
        nextShot = 3 + Math.random() * 5;
      }
      shots = shots.filter((sh) => {
        sh.life += dt; sh.x += sh.vx * dt; sh.y += sh.vy * dt;
        const n = Math.hypot(sh.vx, sh.vy), tx = sh.x - (sh.vx / n) * sh.len, ty = sh.y - (sh.vy / n) * sh.len;
        const fade = Math.min(1, sh.life * 4) * Math.max(0, 1 - sh.life / 1.4);
        const g = ctx.createLinearGradient(tx, ty, sh.x, sh.y);
        g.addColorStop(0, "rgba(27,154,243,0)");
        g.addColorStop(1, `rgba(255,255,255,${fade})`);
        ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(sh.x, sh.y); ctx.stroke();
        return sh.life < 1.4;
      });
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (now - last < FRAME) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      draw(now / 1000, dt);
    };
    const start = () => {
      if (raf || reduce || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const onVis = () => (document.hidden ? stop() : start());
    const onResize = () => { resize(); draw(performance.now() / 1000, 0); };

    resize();
    draw(0, 0);
    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* two soft nebula glows: static gradients, no animation cost */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_15%,rgba(27,154,243,0.14),transparent_70%),radial-gradient(ellipse_50%_45%_at_10%_75%,rgba(123,140,255,0.10),transparent_70%)]" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
