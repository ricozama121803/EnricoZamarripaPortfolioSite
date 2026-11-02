// Jet-black backdrop with smoke. The smoke is two pre-rendered images, kept
// still on purpose: animating full-screen layers made the whole page stutter
// on machines without a strong GPU.
const layer = "absolute inset-0 bg-cover bg-center";

const SmokeBackground = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
  >
    <div
      className={`${layer} opacity-[0.16]`}
      style={{ backgroundImage: "url(/images/smoke-a.webp)" }}
    />
    <div
      className={`${layer} opacity-[0.1] -scale-x-100`}
      style={{ backgroundImage: "url(/images/smoke-b.webp)" }}
    />
    {/* darken the edges so the smoke pools toward the middle */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_20%,rgba(0,0,0,0.85)_100%)]" />
  </div>
);

export default SmokeBackground;
