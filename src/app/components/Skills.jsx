import { SKILL_CATEGORIES } from "../data/skills";
import SkillLogo from "./SkillLogo";

const [EXPERIENCE, ...CATEGORIES] = SKILL_CATEGORIES;

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Skills &amp; Experience</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-[18rem_1fr]">
        <div className="rounded-2xl border border-white/10 bg-[#0b0f1c]/90 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-electric-300">Experience</h3>
          <ul className="mt-4 space-y-4">
            {EXPERIENCE.items.map((item) => {
              const [role, company] = item.split(" @ ");
              return (
                <li key={item} className="border-l-2 border-electric-500/60 pl-3">
                  <p className="font-medium text-neutral-100">{role}</p>
                  {company && <p className="text-sm text-neutral-400">{company}</p>}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid gap-6 rounded-2xl border border-white/10 bg-[#0b0f1c]/90 p-6 sm:grid-cols-2">
          {CATEGORIES.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-electric-300">{c.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.items.map((i) => (
                  <li key={i} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1.5 pr-3 text-sm text-neutral-300">
                    <SkillLogo name={i} className="h-4 w-4" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
