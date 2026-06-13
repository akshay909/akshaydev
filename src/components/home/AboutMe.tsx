"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const skills = [
  { name: "UI UX", position: "absolute -bottom-6" },
  { name: "Figma to Html", position: "absolute -top-6 left-10", primary: true },
  { name: "Laravel", position: "absolute top-8 right-[30px]" },
  { name: "React JS", position: "absolute -top-5 right-[30%]", primary: true },
  {
    name: "Next JS",
    position: "absolute -bottom-10 left-[30%]",
    primary: true,
  },
  { name: "WordPress", position: "absolute -bottom-8 right-[20%]" },
  {
    name: "Tailwind CSS",
    position: "absolute -bottom-[100px] right-[30%]",
    primary: true,
  },
  { name: "JavaScript", position: "absolute -top-[10px] left-[35%]" },
  { name: "TypeScript", position: "absolute -bottom-[10px] left-[5%]" },
  { name: "WordPress", position: "absolute -bottom-[130px] left-[12%]" },
  { name: "GSAP", position: "absolute -top-[10px] left-[16%]" },
  { name: "Framer Motion", position: "absolute -bottom-[150px] right-[50%]" },
  { name: "Express JS", position: "absolute -bottom-[50px] right-5" },
];

const directions = [
  { x: "-100vw", y: 0 },
  { x: "100vw", y: 0 },
  { x: 0, y: "-100vh" },
  { x: 0, y: "100vh" },
];

export default function AboutMe() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const baseCursor =
    theme === "dark" ? "/images/cursor.png" : "/images/cursor-black.png";

  return (
    <section className="pb-16 md:py-16 md:block hidden relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-[50px] sm:text-[80px] md:text-[100px] text-center font-bold uppercase my-10 line-text"
          >
            Full Stack Developer
          </motion.h2>
          {skills.map((skill, i) => {
            const dir = directions[i % directions.length];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: dir.x, y: dir.y }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`absolute ${skill.position}`}
              >
                <p className="border dark:border-primary border-black px-4 py-1 rounded-full dark:text-white text-primary via-primary font-normal">
                  {skill.name}
                </p>

                <Image
                  src={
                    skill.primary ? "/images/cursor-primary.png" : baseCursor
                  }
                  alt="cursor"
                  width={16}
                  height={16}
                  className="absolute -bottom-2 right-0"
                  priority
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
