import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => (
  <button
    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
      isSelected
        ? "border-electric-500/70 bg-electric-500/10 text-white"
        : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
    }`}
    onClick={() => onClick(name)}
    aria-pressed={isSelected}
  >
    {name}
  </button>
);

export default ProjectTag;
