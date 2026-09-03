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
    items: ["JavaScript", "TypeScript", "Python", "SQL", "PHP", "Java", "C++", "C#"],
  },
  {
    title: "Frameworks",
    items: [
      "React",
      "React Native",
      "Vue",
      "Next.js",
      "Node",
      "Express",
      "Flask",
      "Expo",
      "BeautifulSoup",
    ],
  },
  {
    title: "Testing",
    items: ["Jest", "Playwright", "Puppeteer", "Selenium"],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS",
      "Terraform",
      "Serverless Framework",
      "Cloudflare",
      "GitLab CI/CD",
      "Firebase",
      "Supabase",
    ],
  },
  {
    title: "Design",
    items: ["HTML/CSS", "Tailwind CSS", "Material UI", "Shadcn"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker", "Linux", "Bash", "MySQL", "WordPress", "Soldering", "PowerShell"],
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
        <div className="flex overflow-x-auto sm:flex-wrap gap-x-6 gap-y-2 border-b border-[#33353F] -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.title}
              onClick={() => setActive(category.title)}
              className={`shrink-0 relative pb-3 text-sm sm:text-base whitespace-nowrap transition-colors ${
                active === category.title
                  ? "text-white font-semibold after:absolute after:left-0 after:-bottom-px after:h-0.5 after:w-full after:bg-indigo-400"
                  : "text-[#ADB7BE] hover:text-white"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="mt-6 min-h-[3rem] text-[#ADB7BE] text-base sm:text-lg leading-relaxed">
          {activeCategory.items.map((item, i) => (
            <span key={item}>
              {item}
              {i < activeCategory.items.length - 1 && (
                <span className="text-indigo-400 mx-2">&middot;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
