"use client";
import React, { useState } from "react";

const SKILL_CATEGORIES = [
  {
    title: "Experience",
    items: [
      "Software Developer @ AUTODCP",
      "Software Engineering Fellow @ HeadstarterAI",
    ],
  },
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "SQL", "PHP"],
  },
  {
    title: "Frameworks",
    items: ["React", "React Native", "Vue", "Next.js", "Node", "Express", "Flask"],
  },
  {
    title: "Testing",
    items: ["Jest", "Playwright", "Puppeteer"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Terraform", "Serverless Framework", "Cloudflare", "GitLab CI/CD"],
  },
  {
    title: "Design",
    items: ["HTML/CSS", "Tailwind CSS", "Material UI", "Shadcn"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker", "Linux", "Bash", "MySQL", "WordPress", "Soldering"],
  },
  {
    title: "Also Familiar With",
    items: [
      "Java",
      "C++",
      "C#",
      "Selenium",
      "BeautifulSoup",
      "PowerShell",
      "Firebase",
      "Supabase",
      "Expo",
    ],
  },
];

const SkillsSection = () => {
  const [active, setActive] = useState(SKILL_CATEGORIES[0].title);
  const activeCategory = SKILL_CATEGORIES.find((c) => c.title === active);

  return (
    <section className="text-white" id="skills">
      <div className="px-4 pt-8 pb-8 sm:px-6 lg:px-12 xl:px-16 sm:pt-16 sm:pb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
          Skills & Experience
        </h2>
        <div className="flex overflow-x-auto sm:flex-wrap gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.title}
              onClick={() => setActive(category.title)}
              className={`shrink-0 rounded-full border-2 px-4 py-2 text-sm sm:text-base whitespace-nowrap transition-colors ${
                active === category.title
                  ? "text-white border-indigo-400 bg-indigo-400/10"
                  : "text-[#ADB7BE] border-slate-600 hover:border-white"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-6 min-h-[3rem]">
          {activeCategory.items.map((item) => (
            <span
              key={item}
              className="text-sm sm:text-base text-[#ADB7BE] bg-[#181818] border border-[#33353F] rounded-full px-4 py-2"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
