import React from "react";
import Button from "@/components/common/Button";
import UiUx from "@/components/home/UiUx";
import Frontend from "@/components/home/Frontend";
import Backend from "@/components/home/Backend";
import { motion } from "framer-motion";

export const metadata = {
  title: "Projects ",
  description: `Explore ${process.env.NEXT_PUBLIC_OWNER_NAME}'s latest web development projects built with React, Next.js, and Node.js.`,
};

export default function Projects() {
  return (
    <section className="block relative pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:gap-12 gap-8">
          <div className="relative md:sticky top-0 md:-top-[150px]">
            <UiUx />
          </div>
          <div className="relative md:sticky top-0 md:-top-[80px]">
            <Frontend />
          </div>
          <div className="relative md:sticky top-0 md:-top-[100px]">
            <Backend />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center items-center pt-10"
        >
          <Button link="/projects" name="View All Projects" variant="primary" />
        </motion.div>
      </div>
    </section>
  );
}
