import Image from "next/image";
import { IconBolt, IconCircuitResistor, IconCode, IconComponents, IconDeviceMobile, IconSpider } from "@tabler/icons-react";

// Colour logos for each skill, from Devicon (MIT licence, v2.16.0), saved in public/images/skills.
// Skills Devicon has no logo for get a simple line icon instead.
const LOGO_FILE = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  SQL: "sql",
  PHP: "php",
  Java: "java",
  C: "c",
  "C++": "cpp",
  "C#": "csharp",
  MATLAB: "matlab",
  React: "react",
  "React Native": "react",
  Vue: "vue",
  "Next.js": "nextjs",
  Node: "node",
  Express: "express",
  Flask: "flask",
  Jest: "jest",
  Playwright: "playwright",
  Puppeteer: "puppeteer",
  Selenium: "selenium",
  AWS: "aws",
  Terraform: "terraform",
  Cloudflare: "cloudflare",
  "GitLab CI/CD": "gitlab",
  Firebase: "firebase",
  Supabase: "supabase",
  "HTML/CSS": "html",
  "Tailwind CSS": "tailwind",
  "Material UI": "materialui",
  Git: "git",
  Docker: "docker",
  Linux: "linux",
  Bash: "bash",
  MySQL: "mysql",
  WordPress: "wordpress",
  PowerShell: "powershell",
};

const FALLBACK = {
  Expo: IconDeviceMobile,
  "Serverless Framework": IconBolt,
  Shadcn: IconComponents,
  Soldering: IconCircuitResistor,
  BeautifulSoup: IconSpider,
};

export default function SkillLogo({ name, className = "h-6 w-6" }) {
  const file = LOGO_FILE[name];
  if (file) {
    return <Image src={`/images/skills/${file}.svg`} alt="" width={48} height={48} unoptimized className={`object-contain ${className}`} />;
  }
  const Icon = FALLBACK[name] || IconCode;
  return <Icon aria-hidden="true" stroke={1.7} className={`text-slate-500 ${className}`} />;
}
