"use client";
import React from "react";
import type { Metadata } from "next";
import CommanLayout from "@/components/common/CommonLayout";
import { motion } from "framer-motion";
import Button from "@/components/common/Button";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
  IconMapPin,
  IconBriefcase,
  IconBrandReact,
  IconPalette,
  IconBrandTypescript,
  IconBrandNodejs,
  IconDatabase,
  IconApi,
  IconCode,
  IconTrophy,
  IconRocket,
  IconSparkles,
  IconHeart,
  IconUsers,
  IconTrendingUp,
  IconBrandWhatsapp ,
} from "@tabler/icons-react";
import HeroLoader from "@/components/common/Heroloader";

const stats = [
  { icon: IconBriefcase, value: "80+", label: "Projects Completed" },
  { icon: IconUsers, value: "200+", label: "Happy Clients" },
  { icon: IconTrophy, value: "6+ Years", label: "Experience" },
  { icon: IconTrendingUp, value: "93%", label: "Success Rate" },
];

const skills = [
  {
    name: "React & Next.js",
    desc: "Modern frontend development",
    level: 95,
    icon: IconBrandReact,
  },
  {
    name: "Node.js & Express",
    desc: "Backend & API services",
    level: 90,
    icon: IconBrandNodejs,
  },
  {
    name: "MongoDB & SQL",
    desc: "Database architecture",
    level: 85,
    icon: IconDatabase,
  },
  {
    name: "TypeScript",
    desc: "Typed scalable apps",
    level: 88,
    icon: IconBrandTypescript,
  },
  {
    name: "UI/UX Design",
    desc: "User focused design",
    level: 92,
    icon: IconPalette,
  },
  {
    name: "API Development",
    desc: "REST & scalable APIs",
    level: 90,
    icon: IconApi,
  },
];

const journey = [
  {
    year: "2020",
    title: "Started Web Development",
    description:
      "Began my journey in web development learning HTML, CSS, and JavaScript while building small personal and client projects.",
  },
  {
    year: "2021",
    title: "Professional Freelancing",
    description:
      "Started working professionally as a freelancer delivering responsive websites and custom web solutions for clients.",
  },
  {
    year: "2022",
    title: "Full Stack Development",
    description:
      "Expanded into full stack development using Node.js, Express, and databases to build dynamic and scalable applications.",
  },
  {
    year: "2023",
    title: "Modern Frameworks",
    description:
      "Adopted modern technologies like React, Next.js, and TypeScript to build high-performance web applications.",
  },
  {
    year: "2024",
    title: "Advanced Applications",
    description:
      "Developed complex platforms including SaaS products, dashboards, and high-traffic web applications.",
  },
  {
    year: "2025 – Present",
    title: "Scaling Products",
    description:
      "Building scalable, high-performance full stack applications with modern architecture and cloud technologies.",
  },
];

const values = [
  {
    icon: IconCode,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code",
  },
  {
    icon: IconRocket,
    title: "Fast Delivery",
    description: "Quick turnaround without compromising on quality",
  },
  {
    icon: IconSparkles,
    title: "Pixel Perfect",
    description: "Attention to detail in every design and implementation",
  },
  {
    icon: IconHeart,
    title: "Client First",
    description: "Building long-term relationships through excellent service",
  },
];

export default function About() {
  return (
    <CommanLayout>
      <div className="min-h-screen">
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
                  <IconSparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Full Stack Developer
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold">
                  <span className="text-black dark:text-white">Hi, I'm </span>
                  <span className="bg-gradient-to-r from-primary via-primary to-primary/50 bg-clip-text text-transparent">
                    {process.env.NEXT_PUBLIC_OWNER_NAME}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  A passionate Full Stack Developer with 6+ years of experience
                  building modern, scalable web applications. I transform ideas
                  into beautiful, high-performance digital experiences.
                </p>

                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <IconMapPin className="w-5 h-5 text-primary" />
                  <span>Kangra, Himachal Pradesh, India</span>
                </div>

                <div className="flex gap-4 pt-4">
                  {[
                    {
                      icon: IconBrandGithub,
                      href: `${process.env.NEXT_PUBLIC_GITHUB_URL}`,
                      label: "GitHub",
                    },
                    {
                      icon: IconBrandLinkedin,
                      href: `${process.env.NEXT_PUBLIC_LINKEDIN_URL}`,
                      label: "LinkedIn",
                    },
                    {
                      icon: IconMail,
                      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
                      label: "Email",
                    },
                    {
                      icon: IconBrandWhatsapp ,
                      href: `tel:${process.env.NEXT_PUBLIC_WHATSAPP}`,
                      label: "Email",
                    },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.3 }}
                      className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:border-primary dark:hover:border-primary transition-colors group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <HeroLoader />
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 mb-4">
                    <stat.icon stroke={1.5} className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-[400] text-black dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-[400] text-black dark:text-white mb-5 tracking-tight">
                Technical Expertise
              </h2>

              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                Modern technologies and frameworks I use to craft fast, scalable
                and production-ready web applications.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 mx-auto"
            >
              {skills.map((skill, i) => {
                const Icon = skill.icon;

                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/10 to-pink-500/0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10">
                        <Icon size={24} className="text-primary" />
                      </div>

                      <div>
                        <h4 className="text-black dark:text-white font-semibold">
                          {skill.name}
                        </h4>

                        <p className="text-sm dark:text-white/70 text-black/70">
                          {skill.desc}
                        </p>
                      </div>
                    </div>

                    <div className="text-3xl font-bold text-black dark:text-white">
                      {skill.level}%
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-[400] text-black dark:text-white mb-4">
                My Journey
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                From beginner to expert - a timeline of growth and achievements
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {journey.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-8 pb-12 last:pb-0"
                >
                  {i !== journey.length - 1 && (
                    <div className="absolute left-[15px] top-8 w-0.5 h-full bg-gradient-to-b from-primary to-purple-500" />
                  )}

                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white dark:bg-black" />
                  </div>

                  <div className="blur_backg ms-6 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary dark:hover:border-primary transition-colors">
                    <div className="text-sm font-bold text-primary mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-[500] text-black dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-[400] text-black dark:text-white mb-4">
                Core Values
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                The principles that guide my work and client relationships
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="blur_backg rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary dark:hover:border-primary transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-[500] text-black dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-primary/10 dark:to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-[500] text-black dark:text-white">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Have a project in mind? Let's discuss how I can help bring your
                vision to life.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center items-center"
              >
                <Button
                  link="/contact"
                  name="Get In Touch"
                  variant="primary"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </CommanLayout>
  );
}
