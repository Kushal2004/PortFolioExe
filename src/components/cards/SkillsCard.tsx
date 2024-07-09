"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const SkillsCard = () => {
  return (
    <div className="lg:row-span-1 ring-1 dark:ring-white/10 ring-primary/5 hover:ring-primary/5 bg-gray-800 dark:bg-secondary dark:hover:ring-white/20 overflow-hidden duration-300 shadow-xl dark:shadow-thick rounded-3xl p-6">
      <h2 className="text-white text-xl font-bold">
        Skills <span className="text-blue-400">& Tools</span>
      </h2>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
      />
    </div>
  );
}

const testimonials = ["UI Design", "Product Design", "Project Management", "Workshops", "Design Sprint", "Interaction Design"];
export default SkillsCard;
