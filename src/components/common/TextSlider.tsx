"use client";

import { IconAsterisk } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function Slider() {
  const items = [
    "Web Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Engineer",
    "Web Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Engineer",
    "Web Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Engineer",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
      viewport={{ once: false, amount: 0.5 }}
      className="overflow-hidden bg-primary py-4"
    >
      <div className="flex whitespace-nowrap animate-marquee items-center gap-8">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8 text-white/80">
            <p className="text-2xl leading-[33.6px] font-normal">{text}</p>
            <IconAsterisk size={28} stroke={1.5} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
