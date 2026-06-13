"use client";
import React, { useRef, useEffect, useState, use } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { getProjectCount } from "@/services/projectApi";

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectCount, setProjectCount] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [vh, setVh] = useState(0);
  const { scrollY } = useScroll();
  useEffect(() => {
    const updateHeight = () => setVh(window.innerHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProjectCount();
      const count = res.data + 50;
      setProjectCount(count);
    };

    fetchData();
  }, []);

  const rawY1 = useTransform(scrollYProgress, [0, 1], [0, -vh * 1.6]);
  const rawY2 = useTransform(scrollYProgress, [0, 1], [0, -vh * 1.8]);
  const rawY3 = useTransform(scrollYProgress, [0, 1], [0, -vh * 1.6]);
  const rawY4 = useTransform(scrollYProgress, [0, 1], [0, -vh * 1.8]);
  const rawY5 = useTransform(scrollYProgress, [0, 1], [0, -vh * 1.6]);
  const rawY6 = useTransform(scrollYProgress, [0, 1], [0, -vh * 1.8]);

  const y1 = useSpring(rawY1, { stiffness: 50, damping: 20 });
  const y2 = useSpring(rawY2, { stiffness: 50, damping: 20 });
  const y3 = useSpring(rawY3, { stiffness: 50, damping: 20 });
  const y4 = useSpring(rawY4, { stiffness: 50, damping: 20 });
  const y5 = useSpring(rawY5, { stiffness: 50, damping: 20 });
  const y6 = useSpring(rawY6, { stiffness: 50, damping: 20 });

  return (
    <section className="block pb-16 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-16">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="flex flex-col gap-2 w-full md:w-[50%]"
            >
              <div className="md:w-20 w-[35%] h-1.5 bg-gradient-to-r from-primary to-transparent opacity-100"></div>
              <p>
                I design CMS Dashboards, interfaces and thoughtful brand identities
                that help ideas stand out.
              </p>
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              className="flex items-end justify-end gap-10"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/approved.svg"
                    alt="Complete Project"
                    width={45}
                    height={45}
                    priority
                  />
                  <h2 className="text-[40px] font-medium">{projectCount}+</h2>
                </div>
                <p className="text-md text-black/80 dark:text-white/80">
                  Project Complete
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <div className="relative flex items-center -space-x-3">
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      src="/images/user.jpg"
                      alt="user"
                      width={45}
                      height={45}
                      className="rounded-full object-cover bg-primary -translate-y-1/2"
                    />
                  ))}
                </div>
                <span className="text-black/80 dark:text-white/80 text-md font-medium">
                  {projectCount}+ people trust us
                </span>
              </div>
            </motion.div> */}
          </div>
          <div
            ref={containerRef}
            className="h-[350px] sm:h-[450px] lg:h-[600px] overflow-hidden shadow-lg rounded-xl relative"
          >
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              <motion.div
                style={{ y: y1 }}
                className="flex flex-col gap-2 shrink-0"
              >
                <Image
                  src="/images/project1.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project2.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project6.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div
                style={{ y: y2 }}
                className="flex flex-col gap-2 shrink-0"
              >
                <Image
                  src="/images/project4.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project1.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project2.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div
                style={{ y: y3 }}
                className="flex flex-col gap-2 shrink-0"
              >
                <Image
                  src="/images/project2.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project6.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div
                style={{ y: y4 }}
                className="flex flex-col gap-2 shrink-0"
              >
                <Image
                  src="/images/project5.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project1.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project4.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div
                style={{ y: y5 }}
                className="flex flex-col gap-2 shrink-0"
              >
                <Image
                  src="/images/project3.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project2.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project5.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div
                style={{ y: y6 }}
                className="flex flex-col gap-2 shrink-0"
              >
                <Image
                  src="/images/project6.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project4.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
                <Image
                  src="/images/project2.png"
                  width={400}
                  height={300}
                  alt="project"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
