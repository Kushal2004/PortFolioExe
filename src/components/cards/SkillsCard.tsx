"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaBootstrap,
  FaPython,
  FaJava,
  FaDatabase,
  FaNodeJs, 
  FaServer,
  FaGithub  
} from "react-icons/fa";

const SkillsCard = () => {
  const skills = [
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3 /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "React", icon: <FaReact /> },
    { name: "Tailwind CSS", icon: <FaBootstrap /> },
    { name: "Bootstrap", icon: <FaBootstrap /> },
    { name: "Python", icon: <FaPython /> },
    { name: "Java", icon: <FaJava /> },
    { name: "MySQL", icon: <FaDatabase /> },
    { name: "Express", icon: <FaServer /> }, // Example for Express
    { name: "NodeJS", icon: <FaNodeJs /> }, // Example for NodeJS
    { name: "Github", icon: <FaGithub/>  }, // Example for Sequelize
  ];

  const WebSkills = [
    "UI Design",
    "Product Design",
    "Project Management",
    "Workshops",
    "Design Sprint",
    "Interaction Design",
  ];

  const SoftSkills = [
    "Communication",
    "Leadership",
    "Mentorship",
    "Collaboration",
    "Agile",
  ];

  return (
    <div className="lg:row-span-1 ring-1 dark:ring-white/10 ring-primary/5 hover:ring-primary/5 dark:bg-secondary dark:hover:ring-white/20 overflow-hidden duration-300 shadow-xl dark:shadow-thick rounded-3xl p-6">
      <h2 className="dark:text-white text-dark text-4xl p-3 font-bold text-center">
        Skills <span className="text-blue-400">& Tools</span>
      </h2>
      <InfiniteMovingCards items={WebSkills} direction="right" speed="normal" />
      <InfiniteMovingCards items={skills.map((skill) => skill.icon)} direction="left" speed="normal" />
      <InfiniteMovingCards items={SoftSkills} direction="right" speed="normal" />
    </div>
  );
};

export default SkillsCard;
