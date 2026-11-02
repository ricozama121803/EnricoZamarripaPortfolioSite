// An oscilloscope trace with a voltage spike; a pulse of current runs along it.
const TRACE =
  "M0 30 H430 L446 30 L456 6 L470 54 L482 12 L494 46 L504 22 L512 30 H1000";

const VoltDivider = () => (
  <div aria-hidden="true" className="relative my-6 sm:my-10 h-[60px] w-full">
    <svg
      viewBox="0 0 1000 60"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      <path
        d={TRACE}
        fill="none"
        stroke="rgba(27,154,243,0.28)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* soft halo: a wide, faint stroke instead of a blur filter */}
      <path
        d={TRACE}
        fill="none"
        stroke="rgba(27,154,243,0.35)"
        strokeWidth="9"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength="1200"
        className="current-pulse"
      />
      <path
        d={TRACE}
        fill="none"
        stroke="#D6F3FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength="1200"
        className="current-pulse"
      />
    </svg>
  </div>
);

export default VoltDivider;
