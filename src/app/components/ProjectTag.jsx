import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-electric-300 bg-electric-900/30 shadow-[0_0_18px_-4px_rgba(27,154,243,0.9)]"
    : "text-slate-400 border-ink-600 bg-ink-800/60 hover:text-white hover:border-electric-700";
  return (
    <button
      className={`${buttonStyles} rounded-md border px-4 sm:px-6 py-2 font-mono text-xs sm:text-sm uppercase tracking-widest cursor-pointer transition-[color,border-color,background-color,box-shadow] duration-150 ease-out`}
      onClick={() => onClick(name)}
      aria-pressed={isSelected}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
