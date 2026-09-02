import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, activeSection, onLinkClick }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            href={link.path}
            title={link.title}
            active={activeSection === link.path.slice(1)}
            onClick={(e) => onLinkClick(e, link.path)}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
