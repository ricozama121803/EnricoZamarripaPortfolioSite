"use client";
import { useEffect, useRef } from "react";

// Builds a jagged path between two points by repeatedly nudging midpoints.
function boltPoints(x1, y1, x2, y2, spread, detail, out) {
  if (spread < detail) {
    out.push([x2, y2]);
    return;
  }
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * spread;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * spread * 0.4;
  boltPoints(x1, y1, mx, my, spread / 2, detail, out);
  boltPoints(mx, my, x2, y2, spread / 2, detail, out);
}

function makeBolt(x1, y1, x2, y2) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const main = [[x1, y1]];
  boltPoints(x1, y1, x2, y2, length * 0.35, 3, main);
  const paths = [{ pts: main, width: 2.2 }];

  // a few forks that peel off the main channel
  const forks = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < forks; i++) {
    const start = main[Math.floor(main.length * (0.15 + Math.random() * 0.6))];
    const angle = Math.atan2(y2 - y1, x2 - x1) + (Math.random() - 0.5) * 1.6;
    const len = length * (0.15 + Math.random() * 0.25);
    const ex = start[0] + Math.cos(angle) * len;
    const ey = start[1] + Math.sin(angle) * len;
    const fork = [[start[0], start[1]]];
    boltPoints(start[0], start[1], ex, ey, len * 0.35, 3, fork);
    paths.push({ pts: fork, width: 1 });
  }
  return { image: renderBolt(paths), born: performance.now(), life: 650 };
}

// Draws the glow + white core once into an offscreen canvas. Each animation
// frame then only stamps that image with a new opacity, which is cheap,
// instead of re-running the expensive shadow blur on every frame.
function renderBolt(paths) {
  const pad = 40;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const { pts } of paths) {
    for (const [x, y] of pts) {
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    }
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  const w = maxX - minX + pad * 2;
  const h = maxY - minY + pad * 2;
  canvas.width = Math.ceil(w * dpr);
  canvas.height = Math.ceil(h * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, (pad - minX) * dpr, (pad - minY) * dpr);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (const { pts, width } of paths) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);

    // outer glow
    ctx.shadowColor = "rgba(27, 154, 243, 1)";
    ctx.shadowBlur = 24;
    ctx.strokeStyle = "rgba(27, 154, 243, 0.85)";
    ctx.lineWidth = width * 3;
    ctx.stroke();

    // white-hot core
    ctx.shadowBlur = 8;
    ctx.strokeStyle = "rgba(230, 246, 255, 1)";
    ctx.lineWidth = width;
    ctx.stroke();
  }
  return { canvas, x: minX - pad, y: minY - pad, w, h };
}

const LightningCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let bolts = [];
    let flash = 0;
    let frame = null;
    let timer = null;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, width, height);

      if (flash > 0.01) {
        ctx.fillStyle = `rgba(84, 202, 235, ${flash * 0.07})`;
        ctx.fillRect(0, 0, width, height);
        flash *= 0.86;
      }

      bolts = bolts.filter((b) => now - b.born < b.life);
      for (const bolt of bolts) {
        const t = (now - bolt.born) / bolt.life;
        // flickers early on, then fades out
        let alpha = 1 - t;
        if (t < 0.35 && Math.random() < 0.3) alpha *= 0.25;
        const { canvas: img, x, y, w, h } = bolt.image;
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, x, y, w, h);
      }
      ctx.globalAlpha = 1;

      if (bolts.length || flash > 0.01) {
        frame = requestAnimationFrame(draw);
      } else {
        frame = null;
        ctx.clearRect(0, 0, width, height);
      }
    };

    const strike = (x2, y2) => {
      const x1 = x2 + (Math.random() - 0.5) * 240;
      bolts.push(makeBolt(x1, -10, x2, y2));
      flash = 1;
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const scheduleAmbient = () => {
      timer = setTimeout(() => {
        if (document.visibilityState === "visible") {
          strike(Math.random() * width, height * (0.3 + Math.random() * 0.45));
        }
        scheduleAmbient();
      }, 5000 + Math.random() * 7000);
    };

    // click empty space to call down a bolt
    const onPointerDown = (e) => {
      if (e.target.closest("a, button, input, textarea, select, label")) return;
      strike(e.clientX, e.clientY);
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) {
      window.addEventListener("pointerdown", onPointerDown);
      timer = setTimeout(() => {
        strike(width * (0.55 + Math.random() * 0.35), height * 0.45);
        scheduleAmbient();
      }, 900);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
      clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
};

export default LightningCanvas;
