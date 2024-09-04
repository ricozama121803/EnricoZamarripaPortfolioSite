import React from "react";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
      <span>Enrico Zamarripa &copy; {new Date().getFullYear()} All Rights Reserved.</span>

        <p className="text-slate-600"></p>
      </div>
    </footer>
  );
};

export default Footer;
