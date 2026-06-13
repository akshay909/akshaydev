"use client";
import { use, useEffect, useState } from "react";
import ProjectCardPage from "@/components/common/ProjectCardPage";
import CommanLayout from "@/components/common/CommonLayout";
import { getProjectsByFrameWork } from "@/services/projectApi";
import { IconLoader } from "@tabler/icons-react";

export default function CategoryProjectPage({ easyid }: { easyid: string }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [techName, setTechName] = useState<string | null>(null);

  const categoryDisplay =
    easyid === "next"
      ? "Next.js"
      : easyid === "react"
        ? "React"
        : easyid?.charAt(0).toUpperCase() + easyid?.slice(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getProjectsByFrameWork(easyid, 1, 20);
        setProjects(res.data || []);
        setTechName(res.tech_name || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    if (easyid) fetchData();
  }, [easyid]);

  return (
    <CommanLayout>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl breadcm py-20 px-6 mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl opacity-40"></div>
            <div className="relative flex flex-col items-center justify-center text-center gap-6 max-w-3xl mx-auto">
              <span className="text-xs tracking-[3px] uppercase text-primary font-medium">
                Portfolio
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-white">
                {techName || categoryDisplay} Projects
              </h1>
              <p className="text-white dark:text-zinc-400 max-w-xl">
                Modern {techName || categoryDisplay} applications and solutions
                we have built.
              </p>
            </div>
          </div>

          <div className="pt-6 pb-16">
            {isLoading ? (
              <div className="flex min-h-[50vh] bg-white dark:bg-black">
                <div className="flex-1 flex items-center justify-center">
                  <IconLoader className="w-8 h-8 text-indigo-400 animate-spin" />
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-20">{error}</div>
            ) : projects.length === 0 ? (
              <div className="text-center text-zinc-500 py-20">
                No projects found in this category yet.
              </div>
            ) : (
              <div className="grid md:grid-cols-3 grid-cols-1 md:gap-3 gap-8">
                {projects.map((project: any) => (
                  <ProjectCardPage key={project.id} {...project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </CommanLayout>
  );
}
