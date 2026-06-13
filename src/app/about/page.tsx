import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: `About ${process.env.NEXT_PUBLIC_OWNER_NAME} | Hire Full Stack Developer`,
  description: "Learn more about " + (process.env.NEXT_PUBLIC_OWNER_NAME),
};

export default function About() {
  return <AboutClient />;
}
