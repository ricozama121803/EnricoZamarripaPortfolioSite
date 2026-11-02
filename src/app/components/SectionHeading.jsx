const SectionHeading = ({ index, label, title, center = false }) => (
  <div className={center ? "text-center" : ""}>
    <p
      className={`font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-electric-300 flex items-center gap-3 ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="text-electric-500">{index}</span>
      <span className="h-px w-10 bg-gradient-to-r from-electric-500 to-transparent" />
      {label}
    </p>
    <h2 className="font-display uppercase tracking-wide text-3xl sm:text-5xl font-bold text-white mt-3 text-glow-soft">
      {title}
    </h2>
  </div>
);

export default SectionHeading;
