"use client";

import React from "react";
import { servicesData } from "@/lib/services";
import CommanLayout from "@/components/common/CommonLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import Button from "@/components/common/Button";

type Props = {
  slug: string;
};

export default function ServiceDetails({ slug }: Props) {
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) return <div>Not found</div>;

  if (!service) {
    return (
      <CommanLayout>
        <div className="min-h-screen flex items-center justify-center text-white">
          Service not found
        </div>
      </CommanLayout>
    );
  }

  const Icon = service.icon;

  return (
    <CommanLayout>
      <div className="min-h-screen">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl breadcm py-20 px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                {service.title}
              </h1>

              <p className="text-gray-300 max-w-2xl mx-auto">
                {service.shortDescription}
              </p>

              <div className="flex items-center justify-center gap-2 text-sm mt-6 text-gray-400">
                <Link aria-label="Home" href="/">
                  Home
                </Link>
                <IconChevronRight size={16} />
                <Link aria-label="Services" href="/services">
                  Services
                </Link>
                <IconChevronRight size={16} />
                <span className="text-primary">{service.title}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#050505] border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl text-white font-semibold">
                  About this service
                </h2>
              </div>

              <p className="text-gray-400 leading-relaxed mb-8">
                {service.fullDescription}
              </p>

              {service.features && (
                <div className="mb-8">
                  <h3 className="text-xl text-white font-semibold mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {service.features.map((f, i) => (
                      <li key={i} className="text-gray-400">
                        • {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.technologies && (
                <div>
                  <h3 className="text-xl text-white font-semibold mb-4">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-gray-400 text-sm">
                  Want a deeper dive? Read the full guide on Medium.
                </p>

                <Button
                  link={service.mediumUrl}
                  blank
                  name="Learn More"
                  variant="primary"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </CommanLayout>
  );
}
