import React from "react";
import ProjectCard from "@/components/common/ProjectCard";
import Button from "@/components/common/Button";

const projects = [
  {
    image: "/images/uiux.webp",
    object: "object-cover",
    imagecl: "",
    imageScroll: false,
    title: "Payment App",
    tech: ["Photoshop"],
    description:
      "A modern fintech mobile app focused on seamless transactions, intuitive UI, and secure payment experience.",
  },
  {
    image: "/images/uxux2.png",
    object: "object-contain !object-center",
    imagecl: "bg-[#f3f3fe]",
    imageScroll: false,
    title: "Shipping Web App",
    tech: ["Figma"],
    description:
      "A modern logistics web platform designed for real-time shipment tracking, order management, and smooth delivery operations with a clean and user-friendly interface.",
  },
];

export default function UiUx() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between gap-3">
        <h1 className="md:text-6xl text-4xl font-boldtext-black dark:text-white">
        Projects
        </h1>
        <Button link="/projects" name="View All Projects" variant="primary" />
      </div>
      <div className="grid md:grid-cols-2  grid-cols-1 md:gap-3 gap-8">
        {/* {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))} */}
      </div>
    </div>
  );
}
