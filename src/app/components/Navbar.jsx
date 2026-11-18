import Image from "next/image";

// Plain #anchor links: each click is a browser history entry, so Back returns to where you were on the page
// instead of leaving the site.
const LINKS = [
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  return (
    <nav className="absolute inset-x-0 top-0 z-40 border-b border-white/5">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <a href="#top" aria-label="Enrico Zamarripa, back to top" className="flex items-center gap-3">
          <Image src="/images/ez-logo.png" alt="" width={44} height={44} priority className="h-9 w-9 rounded-full sm:h-10 sm:w-10" />
          <span className="hidden text-sm font-semibold tracking-tight text-neutral-100 sm:block">Enrico Zamarripa</span>
        </a>
        <ul className="flex items-center gap-1 text-sm">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-3 py-2 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white sm:px-4">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
