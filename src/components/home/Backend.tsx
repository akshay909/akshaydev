import React from "react";
import Image from "next/image";
import ProjectCard from "@/components/common/ProjectCard";

const projects = [
  {
    image: '/images/vicuiux.png',
    object: "object-cover",
    imagecl: "",
    imageScroll: false,
    title: "Ecommerce Website",
    tech: [
      "Wordpress",
      "MySQL",
      "Woocommerce",
    ],
    description:
      "Jwellery ecommerce website using Woocommerce with user-friendly interface, secure payment gateway, and seamless shopping experience.",
  },
  {
    image: '/images/vic.png',
    object: "object-cover",
    imagecl: "bg-[#f3f3fe]",
    imageScroll: false,
    title: "Victortainment",
    tech: ["HTML", "Bootstrap", "PHP", "MySQL"],
    description:
      "An interactive web development agency platform built to showcase digital services, portfolio projects, and client engagement. ",
  },
];

export default function Backend() {
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
