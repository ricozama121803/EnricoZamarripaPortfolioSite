"use client";
import React from "react";

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
  return (
    <section className="text-white" id="skills">
      <div className="px-4 pt-8 pb-8 xl:px-16 sm:pt-16 sm:pb-16">
        <h2 className="text-4xl font-bold text-white mb-8">Skills & Experience</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="bg-[#181818] border border-[#33353F] rounded-lg p-5"
            >
              <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs sm:text-sm text-[#ADB7BE] bg-[#0d0d0d] border border-[#2b2d31] rounded-full px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
