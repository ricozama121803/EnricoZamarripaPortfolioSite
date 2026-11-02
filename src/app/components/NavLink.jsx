const NavLink = ({ href, title, active, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`block py-2 pl-3 pr-4 font-mono uppercase tracking-widest sm:text-lg rounded md:p-0 ${
        active ? "text-white text-glow-soft" : "text-slate-400 hover:text-white"
      }`}
    >
      {title}
    </a>
  );
};

export default NavLink;
