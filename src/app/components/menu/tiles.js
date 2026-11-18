import { projectsData, projectGroups } from "../../data/projects";

export const EMAIL = "ricozama121803@gmail.com";
export const LINKS = {
  github: "https://github.com/ricozama121803",
  gitlab: "https://gitlab.com/ricozama121803",
  linkedin: "https://www.linkedin.com/in/enrico-zamarripa-3ba2882a3/",
};

// my resume, served from /public; the tile shows a picture of its page
export const RESUME = {
  pdf: "/Enrico_Zamarripa_Resume.pdf",
  fileName: "Enrico_Zamarripa_Resume.pdf",
  preview: "/images/resume-preview.png",
  page: "/images/resume-page.png",
};

export const PER_PAGE = 12; // 4 x 3 on desktop

const cleanTags = (tags) => tags.filter((t) => t !== "All");

// Folder order: these lead, in this order; these close it out, in this order; everything else sits
// between them, newest first.
const PINNED_FIRST = ["p-19", "p-1", "p-11", "p-10"]; // UmbraFlow, ProfSpot | UIUC, ¡Pnch!, Snap Shelf
const PINNED_LAST = ["p-4", "p-2", "p-5"]; // Film Fest Scraper, QuizzAI, Statics Playground
const rank = (t) => {
  const first = PINNED_FIRST.indexOf(t.id);
  if (first !== -1) return [0, first];
  const last = PINNED_LAST.indexOf(t.id);
  if (last !== -1) return [2, last];
  return [1, -t.order];
};
const byRank = (a, b) => {
  const [ga, ia] = rank(a), [gb, ib] = rank(b);
  return ga - gb || ia - ib;
};

// All the channels. The main menu holds About, Skills, one big Projects folder and the ways to reach me;
// the folder holds every project, newest first (grouped projects collapse into one sub-folder tile
// placed by their newest member).
export function buildChannels() {
  const loose = projectsData.filter((p) => !p.group);
  const groups = projectGroups.map((g) => {
    const members = projectsData.filter((p) => p.group === g.id).sort((a, b) => b.id - a.id);
    // every tool used across the group, most common first
    const tally = members.flatMap((m) => m.tech || []).reduce((n, t) => ({ ...n, [t]: (n[t] || 0) + 1 }), {});
    const tech = Object.entries(tally).sort((a, b) => b[1] - a[1]).map(([t]) => t);
    return { ...g, members, tech, newest: members[0]?.id ?? 0 };
  });

  const projectTiles = [
    ...loose.map((p) => ({
      id: `p-${p.id}`,
      kind: "project",
      order: p.id,
      title: p.title,
      project: { ...p, tags: cleanTags(p.tag) },
    })),
    ...groups
      .filter((g) => g.members.length)
      .map((g) => ({
        id: `g-${g.id}`,
        kind: "group",
        order: g.newest,
        title: g.title,
        group: { ...g, tags: cleanTags(g.tag) },
      })),
  ].sort(byRank);

  // the folder's cover shows the newest screenshots and the tools used most across all projects
  const tally = projectsData.flatMap((p) => p.tech || []).reduce((n, t) => ({ ...n, [t]: (n[t] || 0) + 1 }), {});
  const folder = {
    id: "projects",
    kind: "folder",
    title: "Projects",
    big: true,
    projects: projectTiles,
    covers: projectTiles.slice(0, 6).map((t) => (t.kind === "group" ? t.group.members[0].image : t.project.image)),
    tech: Object.entries(tally).sort((a, b) => b[1] - a[1]).map(([t]) => t),
  };

  const menu = [
    { id: "about", kind: "about", title: "About Me" },
    { id: "skills", kind: "skills", title: "Skills" },
    folder,
    { id: "resume", kind: "resume", title: "Resume" },
    { id: "contact", kind: "contact", title: "Contact" },
    { id: "github", kind: "link", title: "GitHub", href: LINKS.github, brand: "github" },
    { id: "linkedin", kind: "link", title: "LinkedIn", href: LINKS.linkedin, brand: "linkedin" },
    { id: "gitlab", kind: "link", title: "GitLab", href: LINKS.gitlab, brand: "gitlab" },
  ];

  return { menu, all: [...menu, ...projectTiles] };
}

// a big tile covers 2 x 2 slots
const slots = (t) => (t.big ? 4 : 1);

// Split tiles into pages of PER_PAGE slots, padding the last page with empty slots so the grid keeps its shape.
export function paginate(tiles, size = PER_PAGE) {
  const pages = [[]];
  let used = 0;
  for (const t of tiles) {
    if (used + slots(t) > size) { pages.push([]); used = 0; }
    pages[pages.length - 1].push(t);
    used += slots(t);
  }
  const last = pages[pages.length - 1];
  for (let i = 0; used < size; i++, used++) last.push({ id: `empty-${pages.length}-${i}`, kind: "empty" });
  return pages;
}

// a project only gets a "Visit site" button when its preview is a real deployment, not just the repo
export const hasDeployment = (p) => Boolean(p.previewUrl) && p.previewUrl !== p.gitUrl;
