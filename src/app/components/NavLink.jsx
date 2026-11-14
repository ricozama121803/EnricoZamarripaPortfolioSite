import Link from "next/link";

const NavLink = ({ href, title, active = false, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`block py-2 pl-3 pr-4 text-base transition-colors ${active ? "text-white" : "text-neutral-400 hover:text-white"}`}
  >
    {title}
  </Link>
);

export default NavLink;
