"use client";

import Button from "@/components/common/Button";
import HeroLoader from "@/components/common/Heroloader";
import { motion } from "framer-motion";
import { IconSparkles } from "@tabler/icons-react";

export default function HeroSection() {
  return (
    <section className="block py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="">
            {" "}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 w-fit bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full"
              >
                <IconSparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Full Stack Developer
                </span>
              </motion.div>{" "}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-7xl md:text-7xl font-semibold mb-6"
              >
                <span className="text-black dark:text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/50 bg-clip-text text-transparent">
                  {process.env.NEXT_PUBLIC_OWNER_NAME}
                </span>
              </motion.h1>{" "}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl leading-tight mb-6 text-black/90 dark:text-white/90"
            >
              {" "}
              Full Stack Web Developer crafting modern, fast & beautiful web
              experiences.{" "}
            </motion.p>{" "}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-md text-black/70 dark:text-white/70 leading-relaxed max-w-xl"
            >
              {" "}
              I specialize in React, Next.js, Node.js, Wordpress, Laravel, Php, Shopify & Tailwind. Turning ideas
              into scalable, pixel-perfect applications.{" "}
            </motion.p>{" "}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10 flex gap-4"
            >
              {" "}
              <Button
                link="/projects"
                name="See My Work"
                variant="primary"
              />{" "}
            </motion.div>{" "}
          </div>

          <HeroLoader />
        </div>
      </div>
    </section>
  );
}
