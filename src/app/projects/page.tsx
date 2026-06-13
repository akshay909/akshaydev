import type { Metadata } from "next";
import ProjectsClient from "@/components/projects/ProjectsClient";

export const metadata: Metadata = {
  title: `Projects | ${process.env.NEXT_PUBLIC_OWNER_NAME} - Full Stack Developer`,
  description:
    `Explore ${process.env.NEXT_PUBLIC_OWNER_NAME}'s portfolio of modern web applications built with React, Next.js, Node.js, and scalable architectures.`,
  keywords: [
    `${process.env.NEXT_PUBLIC_OWNER_NAME} projects`,
    "React projects",
    "Next.js projects",
    "Full stack projects",
    "Web development portfolio",
  ],
};

export default function Project() {
  return <ProjectsClient />;
}
