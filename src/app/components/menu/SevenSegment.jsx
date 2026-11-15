// A digital-clock readout drawn with SVG segments (lit ones grey, unlit ones a faint ghost).

const ON = {
  0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg",
  5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg", "-": "g",
};

// hexagonal bar centred on (cx, cy)
const bar = (cx, cy, len, t, vertical) => {
  const h = len / 2, k = t / 2;
  const pts = vertical
    ? [[cx, cy - h], [cx + k, cy - h + k], [cx + k, cy + h - k], [cx, cy + h], [cx - k, cy + h - k], [cx - k, cy - h + k]]
    : [[cx - h, cy], [cx - h + k, cy - k], [cx + h - k, cy - k], [cx + h, cy], [cx + h - k, cy + k], [cx - h + k, cy + k]];
  return pts.map((p) => p.join(",")).join(" ");
};

const SEGMENTS = {
  a: bar(30, 8, 38, 9, false),
  b: bar(52, 29, 38, 9, true),
  c: bar(52, 71, 38, 9, true),
  d: bar(30, 92, 38, 9, false),
  e: bar(8, 71, 38, 9, true),
  f: bar(8, 29, 38, 9, true),
  g: bar(30, 50, 38, 9, false),
};

function Digit({ char }) {
  const lit = ON[char] ?? "";
  return (
    <svg viewBox="-2 0 64 100" className="h-full w-auto" aria-hidden="true">
      <g transform="skewX(-5) translate(4 0)">
        {Object.entries(SEGMENTS).map(([s, pts]) => (
          <polygon key={s} points={pts} className={lit.includes(s) ? "fill-[#8e949b]" : "fill-black/[0.03]"} />
        ))}
      </g>
    </svg>
  );
}

export default function SevenSegment({ text, blink, className = "" }) {
  return (
    <span className={`inline-flex h-full items-center gap-[0.12em] ${className}`}>
      {[...text].map((ch, i) =>
        ch === ":" ? (
          <svg key={i} viewBox="0 0 20 100" className={`h-full w-auto transition-opacity ${blink ? "opacity-30" : ""}`} aria-hidden="true">
            <rect x="5" y="28" width="9" height="9" className="fill-[#8e949b]" />
            <rect x="3" y="64" width="9" height="9" className="fill-[#8e949b]" />
          </svg>
        ) : (
          <Digit key={i} char={ch} />
        )
      )}
    </span>
  );
}
