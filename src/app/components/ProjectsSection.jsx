"use client";
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import StackCard from "./StackCard";
import ProjectTag from "./ProjectTag";
import SectionHeading from "./SectionHeading";
import { projectsData, projectGroups } from "../data/projects";
import { AnimatePresence, motion } from "framer-motion";


const ProjectsSection = () => {
  const [tag, setTag] = useState("All");

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  // newest first: new projects are appended to projectsData with the next id.
  // Under "All", grouped projects collapse into one stack tile (placed by its newest member);
  // a specific filter like "Games" lists them individually.
  const matching = projectsData.filter((project) => project.tag.includes(tag));
  const stacked = tag === "All" ? projectGroups.filter((g) => matching.some((p) => p.group === g.id)) : [];
  const filteredProjects = [
    ...matching.filter((p) => !stacked.some((g) => g.id === p.group)),
    ...stacked.map((g) => {
      const members = matching.filter((p) => p.group === g.id).sort((a, b) => b.id - a.id);
      return { ...g, stack: true, members, key: `group-${g.id}`, id: members[0].id };
    }),
  ].sort((a, b) => b.id - a.id);

  const cardVariants = {
    hidden: { y: 16, opacity: 0, scale: 0.98 },
    show: { y: 0, opacity: 1, scale: 1 },
  };

  return (
    <section id="projects" className="py-8 sm:py-12">
      <SectionHeading index="02" label="Projects" title="Things I've Built" />
      <div className="text-white flex flex-wrap items-center gap-2 pt-8 pb-8">
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
      <ul className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredProjects.map((project, index) => (
            <motion.li
              key={project.key || project.id}
              layout
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              exit="hidden"
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                delay: (index % 3) * 0.05,
                layout: { type: "spring", stiffness: 500, damping: 42 },
              }}
            >
              {project.stack ? (
                <StackCard group={project} members={project.members} />
              ) : (
              <ProjectCard
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
                downloadUrl={project.downloadUrl}
                tags={project.tag.filter((t) => t !== "All")}
              />
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
};

export default ProjectsSection;
