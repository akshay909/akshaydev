"use client";

import React from "react";
import { motion } from "framer-motion";
import CommanLayout from "@/components/common/CommonLayout";
import {
  IconBrandReact,
  IconBrandNodejs,
  IconCode,
  IconPalette,
  IconRocket,
  IconSparkles,
  IconChevronRight,
} from "@tabler/icons-react";
import Button from "@/components/common/Button";
import Link from "next/link";
import { servicesData } from "@/lib/services";

export default function Services() {
  return (
    <CommanLayout>
      <div className="min-h-screen">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl breadcm py-20 px-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl opacity-40"></div>

              <div className="relative flex flex-col items-center justify-center text-center gap-6 max-w-3xl mx-auto">
                <span className="text-xs tracking-[3px] uppercase text-primary font-medium">
                  Portfolio
                </span>

                <h1 className="text-4xl md:text-5xl font-semibold text-white">
                  Professional Services
                </h1>

                <p className="text-white dark:text-zinc-400 max-w-xl">
                  From stunning interfaces to powerful backend systems — I build
                  complete digital products that scale.
                </p>

                <div className="flex items-center gap-2 text-sm text-white/80 dark:text-zinc-400">
                  <Link
                    aria-label="Home"
                    href="/"
                    className="hover:text-primary transition"
                  >
                    Home
                  </Link>

                  <IconChevronRight size={16} />

                  <span className="text-primary font-medium">Services</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="group relative bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none"
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10" />

                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6 border border-gray-200 dark:border-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition">
                      <Icon
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        stroke={1.5}
                      />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="mt-8 relative z-98">
                      <Link
                        aria-label={`Learn more about ${service.title}`}
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium group-hover:gap-x-2 transition-all"
                      >
                        Learn More
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
                Why Work With Me
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                I don&apos;t just write code — I deliver high-performance
                digital experiences that drive results and stand the test of
                time.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: IconRocket,
                  title: "Lightning Fast",
                  description:
                    "Optimized for performance with 100/100 Lighthouse scores across all metrics.",
                },
                {
                  icon: IconPalette,
                  title: "Modern & Intuitive Design",
                  description:
                    "Beautiful, accessible, and user-centered interfaces that users actually love.",
                },
                {
                  icon: IconSparkles,
                  title: "Future-Proof Solutions",
                  description:
                    "Built with the latest technologies, clean architecture, and scalable best practices.",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-[#050505] border border-gray-800 hover:border-primary/60 relative rounded-3xl p-10 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10" />
                    <div className="mb-8">
                      <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6 border border-gray-200 dark:border-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition">
                        <Icon
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          stroke={1.5}
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-primary/80 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed text-[17px]">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
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
                <Button link="/contact" name="Get In Touch" variant="primary" />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </CommanLayout>
  );
}
