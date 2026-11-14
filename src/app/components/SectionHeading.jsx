const SectionHeading = ({ index, label, title, center = false }) => (
  <div className={center ? "text-center" : ""}>
    <p className={`font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="text-electric-300/80">{index}</span>
      <span className="h-px w-8 bg-gradient-to-r from-electric-500/60 to-transparent" />
      {label}
    </p>
    <h2 className="mt-3 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-3xl sm:text-5xl font-bold tracking-tight text-transparent">
      {title}
    </h2>
  </div>
);

export default SectionHeading;
