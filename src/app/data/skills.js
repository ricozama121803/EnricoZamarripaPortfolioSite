// Single source for the skills list, the skills search and the job-match report.

export const SKILL_CATEGORIES = [
  {
    title: "Experience",
    items: [
      "Software Developer @ AUTODCP",
      "Software Engineering Fellow @ HeadstarterAI",
    ],
  },
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "SQL", "PHP", "Java", "C++", "C#", "MATLAB"],
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

// Other names someone might type into the skills search box.
export const ALIASES = {
  JavaScript: ["js", "ecmascript"],
  TypeScript: ["ts"],
  Python: ["py"],
  "C++": ["cpp", "cplusplus"],
  "C#": ["csharp", "dotnet"],
  Node: ["nodejs", "node.js"],
  AWS: ["amazon web services", "amazon"],
  "Tailwind CSS": ["tailwind"],
  "GitLab CI/CD": ["ci", "cicd", "continuous integration", "pipelines"],
  Shadcn: ["shadcn/ui"],
  "HTML/CSS": ["html", "css"],
  MySQL: ["sql database", "database"],
  "Material UI": ["mui"],
  Docker: ["containers"],
  Terraform: ["iac", "infrastructure as code"],
};

const normalize = (str) => str.toLowerCase().replace(/[\s.\-_/]/g, "");

// Search-box matching: forgiving prefix/substring match as the user types.
export const matchesQuery = (item, query) => {
  const q = normalize(query);
  if (!q) return false;
  if (normalize(item).includes(q)) return true;
  return (ALIASES[item] || []).some((alias) => normalize(alias).startsWith(q));
};

// ---------------------------------------------------------------------------
// Job-description scanning. Stricter than the search box: whole terms only.
// Plain strings match case-insensitively; { cs: "Word" } is case-sensitive,
// for terms that are also ordinary English words ("Express", "Swift").
// ---------------------------------------------------------------------------

export const SKILL_TERMS = {
  JavaScript: ["javascript", "js", "ecmascript", "es6"],
  TypeScript: ["typescript", "ts"],
  Python: ["python"],
  SQL: ["sql"],
  PHP: ["php"],
  Java: ["java"],
  "C++": ["c++", "cpp"],
  "C#": ["c#", "csharp"],
  MATLAB: ["matlab"],
  React: ["react", "react.js", "reactjs"],
  "React Native": ["react native"],
  Vue: ["vue", "vue.js", "vuejs"],
  "Next.js": ["next.js", "nextjs"],
  Node: ["node.js", "nodejs", { cs: "Node" }],
  Express: ["express.js", "expressjs", { cs: "Express" }],
  Flask: ["flask"],
  Expo: [{ cs: "Expo" }],
  BeautifulSoup: ["beautifulsoup", "beautiful soup", "bs4"],
  Jest: ["jest"],
  Playwright: ["playwright"],
  Puppeteer: ["puppeteer"],
  Selenium: ["selenium"],
  AWS: ["aws", "amazon web services"],
  Terraform: ["terraform"],
  "Serverless Framework": ["serverless"],
  Cloudflare: ["cloudflare"],
  "GitLab CI/CD": ["gitlab"],
  Firebase: ["firebase"],
  Supabase: ["supabase"],
  "HTML/CSS": ["html", "html5", "css", "css3"],
  "Tailwind CSS": ["tailwind", "tailwindcss"],
  "Material UI": ["material ui", "material-ui", "mui"],
  Shadcn: ["shadcn"],
  Git: ["git"],
  Docker: ["docker"],
  Linux: ["linux"],
  Bash: ["bash", "shell scripting"],
  MySQL: ["mysql"],
  WordPress: ["wordpress"],
  Soldering: ["soldering", "solder"],
  PowerShell: ["powershell"],
};

// Common technologies NOT on the list, so the report can say what's missing.
export const OTHER_TECH = {
  Go: ["golang"],
  Rust: ["rust"],
  Ruby: [{ cs: "Ruby" }],
  "Ruby on Rails": ["ruby on rails", { cs: "Rails" }],
  Kotlin: ["kotlin"],
  Swift: [{ cs: "Swift" }],
  Scala: ["scala"],
  Dart: [{ cs: "Dart" }],
  Flutter: ["flutter"],
  Perl: ["perl"],
  Haskell: ["haskell"],
  Elixir: ["elixir"],
  "Objective-C": ["objective-c"],
  ".NET": [".net", "dotnet", "asp.net"],
  Angular: ["angular", "angularjs"],
  Svelte: ["svelte", "sveltekit"],
  Redux: ["redux"],
  jQuery: ["jquery"],
  Bootstrap: [{ cs: "Bootstrap" }],
  Sass: ["sass", "scss"],
  Django: ["django"],
  FastAPI: ["fastapi"],
  "Spring Boot": ["spring boot"],
  Laravel: ["laravel"],
  NestJS: ["nestjs"],
  Electron: [{ cs: "Electron" }],
  GraphQL: ["graphql"],
  Prisma: ["prisma"],
  PostgreSQL: ["postgresql", "postgres"],
  MongoDB: ["mongodb", "mongo"],
  Redis: ["redis"],
  Elasticsearch: ["elasticsearch"],
  Snowflake: [{ cs: "Snowflake" }],
  Kafka: ["kafka"],
  Spark: [{ cs: "Spark" }, "pyspark"],
  Kubernetes: ["kubernetes", "k8s"],
  "Google Cloud": ["gcp", "google cloud"],
  Azure: ["azure"],
  Vercel: ["vercel"],
  Heroku: ["heroku"],
  Nginx: ["nginx"],
  Jenkins: ["jenkins"],
  "GitHub Actions": ["github actions"],
  Ansible: ["ansible"],
  Cypress: ["cypress"],
  Vitest: ["vitest"],
  Mocha: [{ cs: "Mocha" }],
  Pandas: ["pandas"],
  NumPy: ["numpy"],
  TensorFlow: ["tensorflow"],
  PyTorch: ["pytorch"],
  Figma: ["figma"],
  Jira: ["jira"],
  Unity: [{ cs: "Unity" }],
  "Unreal Engine": ["unreal"],
  Simulink: ["simulink"],
  Verilog: ["verilog", "systemverilog"],
  VHDL: ["vhdl"],
  LabVIEW: ["labview"],
  Altium: ["altium"],
  KiCad: ["kicad"],
  SPICE: ["ltspice", "pspice", { cs: "SPICE" }],
  Arduino: ["arduino"],
  "Raspberry Pi": ["raspberry pi"],
  AutoCAD: ["autocad"],
  SolidWorks: ["solidworks"],
};

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// whole-term regex: not glued to letters/digits on either side
const termRegex = (term) => {
  const cs = typeof term === "object";
  const text = cs ? term.cs : term;
  const body = escape(text).replace(/ /g, "[\\s-]+");
  return new RegExp(`(?<![A-Za-z0-9.])${body}(?![A-Za-z0-9+#])`, cs ? "" : "i");
};

const compile = (table) =>
  Object.entries(table).map(([name, terms]) => [name, terms.map(termRegex)]);

const SKILL_RES = compile(SKILL_TERMS);
const OTHER_RES = compile(OTHER_TECH);

const found = (compiled, text) =>
  compiled.filter(([, res]) => res.some((re) => re.test(text))).map(([name]) => name);

// Returns { matched: [{ category, skills }], missing: [names], matchedCount, total }
export function analyzeJobText(text) {
  const hits = new Set(found(SKILL_RES, text));
  const matched = SKILL_CATEGORIES.slice(1)
    .map((c) => ({ category: c.title, skills: c.items.filter((s) => hits.has(s)) }))
    .filter((g) => g.skills.length);
  const missing = found(OTHER_RES, text);
  const matchedCount = matched.reduce((n, g) => n + g.skills.length, 0);
  return { matched, missing, matchedCount, total: matchedCount + missing.length };
}
