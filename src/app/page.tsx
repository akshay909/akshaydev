"use client";

import dynamic from "next/dynamic";

import Header from "@/components/common/Header";
import HeroSection from "@/components/home/HeroSection";

const AboutUs = dynamic(() => import("@/components/home/AboutMe"));
const Work = dynamic(() => import("@/components/home/Work"));
const Projects = dynamic(() => import("@/components/home/Projects"));
const TextSlider = dynamic(() => import("@/components/common/TextSlider"), {
  ssr: false,
});
const Testimonial = dynamic(() => import("@/components/home/Testimonials"));
const ContactForm = dynamic(() => import("@/components/common/ContactForm"));
const Footer = dynamic(() => import("@/components/common/Footer"));

export default function Page() {
  return (
    <>
      <main className="hero_baner">
        <Header />
        <HeroSection />
        <AboutUs />
        <Work />
      </main>

      <Projects />
      <TextSlider />
      <Testimonial />
      {/* <ContactForm /> */}
      <Footer />
    </>
  );
}
