const NavLink = ({ href, title, active, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`block py-2 pl-3 pr-4 sm:text-xl rounded md:p-0 ${
        active ? "text-white font-semibold" : "text-[#ADB7BE] hover:text-white"
      }`}
    >
      {title}
    </a>
  );
};

export default NavLink;
