"use client";
import React, { useState } from "react";
import CommanLayout from "@/components/common/CommonLayout";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import FolderProject from "@/components/common/FolderProject";
import ProjectPage from "@/components/common/ProjectPage";
import CategoriesProject from "@/components/common/CategoriesProject";
import { Metadata } from "next";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("projects");

  const tabs = [
    { id: "projects", name: "Projects" },
    // { id: "languages", name: "Languages / Frameworks" },
    // { id: "categories", name: "Categories" },
  ];

  return (
    <CommanLayout>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl breadcm py-20 px-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl opacity-40"></div>

            <div className="relative flex flex-col items-center justify-center text-center gap-6 max-w-3xl mx-auto">
              <span className="text-xs tracking-[3px] uppercase text-primary font-medium">
                Portfolio
              </span>

              <h1 className="text-4xl md:text-5xl font-semibold text-white">
                Projects
              </h1>

              <p className="text-white dark:text-zinc-400 max-w-xl">
                A collection of modern web applications, SaaS platforms, and
                scalable digital products built with performance, usability, and
                clean architecture.
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

                <span className="text-primary font-medium">Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-6 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mx-auto justify-center gap-10 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                aria-label={`View ${tab.name}`}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-md hidden font-medium transition relative
                ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-zinc-400 hover:text-black dark:hover:text-white"
                }
              `}
              >
                {tab.name}

                {activeTab === tab.id && (
                  <span className="absolute left-0 bottom-0 h-[2px] w-full bg-primary"></span>
                )}
              </button>
            ))}
          </div>

          <div>
            {activeTab === "projects" && <ProjectPage />}
            {activeTab === "languages" && <FolderProject />}
            {activeTab === "categories" && <CategoriesProject />}
          </div>
        </div>
      </section>
    </CommanLayout>
  );
}
