import React from "react";
import ProjectCard from "@/components/common/ProjectCard";

const projects = [
  {
    image: '/images/project2.png',
    object: "object-cover",
    imagecl: "",
    imageScroll: false,
    title: "SASS Platfrom",
    tech: ["Next JS", "Tailwind CSS", "TypeScript"],
    description:
      "A modern fintech mobile app focused on seamless transactions, intuitive UI, and secure payment experience.",
  },
  {
    image: '/images/project1.png',
    object: "object-cover",
    imagecl: "bg-[#f3f3fe]",
    imageScroll: false,
    title: "Power Technology",
    tech: ["HTML", "Tailwind CSS"],
    description:
      "A modern logistics web platform designed for real-time shipment tracking, order management, and smooth delivery operations with a clean and user-friendly interface.",
  },

];

export default function Frontend() {
  return (
    <div className="flex flex-col gap-8">
     <div className="grid md:grid-cols-2  grid-cols-1 md:gap-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
