"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "ProfSpot | UIUC",
    description: "ProfSpot is a RateMyProfessor chatbot powered by Retrieval-Augmented Generation (RAG) technology. It allows students to interactively search for professor ratings and reviews by leveraging advanced AI techniques and a scalable vector database.",
    image: "/images/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/ricozama121803/HEADSTARTERTEAM-AiRateMyProfessor/tree/main",
    previewUrl: "https://headstarterteam-ai-rate-my-professor.vercel.app/",
  },
  {
    id: 2,
    title: "QuizzAI",
    description: "AI generated flashcard and quiz sets created by user prompt or link upload. All sets can be saved and accessed later after user authentication.",
    image: "/images/projects/2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/ricozama121803/HeadstarterTeam-flashcard-saas/tree/main",
    previewUrl: "https://headstarter-team-flashcard-saas-five.vercel.app/",
  },
  {
    id: 3,
    title: "SceneScout",
    description: "A community-driven platform for finding filming locations. Filmmakers and photographers browse a map of curated spots, filter by tags, and share their own hidden gems.",
    image: "/images/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/ricozama121803/SceneScout",
    previewUrl: "https://scene-scout-brown.vercel.app/",
  },
  {
    id: 4,
    title: "Snap Shelf",
    description: "A Chrome extension for saving the exact piece of a webpage you need — a highlighted quote, a cropped screenshot, or an image — into a searchable, tagged side panel instead of leaving tabs open for reference.",
    image: "/images/projects/7.png",
    tag: ["All", "Tools"],
    gitUrl: "https://github.com/ricozama121803/snap-shelf",
    previewUrl: "https://github.com/ricozama121803/snap-shelf",
  },
  {
    id: 5,
    title: "Film Fest Scraper",
    description: "A Python pipeline that crawls Wikipedia, FilmFreeway, and regional directories to discover film festivals, maintaining a single deduplicated CSV database that refreshes on every run.",
    image: "/images/projects/8.png",
    tag: ["All", "Tools"],
    gitUrl: "https://github.com/ricozama121803/film-fest-scraper",
    previewUrl: "https://github.com/ricozama121803/film-fest-scraper",
  },
  {
    id: 6,
    title: "3DS Homebrew",
    description: "Nintendo 3DS games written in C with devkitPro and citro2d/citro3d, including Ringside (3D kickboxing with fighter AI and a custom shader), Tuffy Run (endless runner), and a top-down open-world crime sandbox. Each has a PC harness for previews and logic tests.",
    image: "/images/projects/9.png",
    tag: ["All", "Games"],
    gitUrl: "https://github.com/ricozama121803/3ds-homebrew",
    previewUrl: "https://github.com/ricozama121803/3ds-homebrew",
  },
  {
    id: 7,
    title: "Statics Playground",
    description: "An interactive single-file web app for learning engineering statics. Drag forces to explore moments, beam reactions, and 2D/3D cable equilibrium, with live equations, diagrams, and a scored Challenge mode.",
    image: "/images/projects/10.png",
    tag: ["All", "Web", "Tools"],
    gitUrl: "https://github.com/ricozama121803/statics-playground",
    previewUrl: "https://github.com/ricozama121803/statics-playground",
  },
  {
    id: 8,
    title: "cpop",
    description: "A tiny Linux CLI: put cpop in front of any command and its output is copied to the clipboard. Formats the copy as an aligned table, Markdown, or JSON, and ships with a man page and bash/zsh/fish tab completion.",
    image: "/images/projects/11.png",
    tag: ["All", "Tools"],
    gitUrl: "https://github.com/ricozama121803/cpop",
    previewUrl: "https://github.com/ricozama121803/cpop",
  },
  {
    id: 9,
    title: "viewme",
    description: "Open any Markdown file in a clean popup window with viewme file.md. A dependency-free Python renderer with an outline sidebar, syntax-highlighted code, live reload, dark mode, and a locked-down local server.",
    image: "/images/projects/12.png",
    tag: ["All", "Tools"],
    gitUrl: "https://github.com/ricozama121803/viewme",
    previewUrl: "https://github.com/ricozama121803/viewme",
  },
  {
    id: 10,
    title: "ProfSpot | CSUF",
    description: "A Cal State Fullerton version of ProfSpot, a RAG chatbot over every rated CSUF professor (~5,000) and ~120,000 reviews. It filters by department or course, shows rating, difficulty, and would-take-again at a glance, links to RateMyProfessors, and lets students pin professors to a local list and export it as a PDF.",
    image: "/images/projects/13.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/ricozama121803/profspot-csuf",
    previewUrl: "https://github.com/ricozama121803/profspot-csuf",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  // newest first: new projects are appended to projectsData with the next id
  const filteredProjects = projectsData
    .filter((project) => project.tag.includes(tag))
    .sort((a, b) => b.id - a.id);

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-wrap justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Tools"
          isSelected={tag === "Tools"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Games"
          isSelected={tag === "Games"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
