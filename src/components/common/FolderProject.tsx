"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight, IconLoader, IconSearch } from "@tabler/icons-react";
import { projectsCounts } from "@/services/projectApi";
import * as Icons from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

type TechOption = {
  icon: any;
  description: any;
  id: number;
  name: string;
  project_count: string;
  value: string;
};

export default function FolderProject() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const res = await projectsCounts();

      return res.data.map((t: any) => ({
        ...t,
        label: t.name,
        value: t.value,
        icon: t.icon,
        project_count: t.project_count,
      }));
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] bg-white dark:bg-black">
        <div className="flex-1 flex items-center justify-center">
          <IconLoader className="w-8 h-8 text-indigo-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Failed to load folders 🚫</div>
    );
  }

  const filteredTech =
    data?.filter((tech: TechOption) =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <div>
      <div className="mb-10">
        <div className="relative max-w-md me-auto">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400">
            <IconSearch size={22} stroke={1.5} />
          </div>
          <input
            type="text"
            placeholder="Search technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/20 focus:border-indigo-500 rounded-3xl px-12 py-3 text-sm placeholder:text-zinc-400 focus:outline-none transition-all shadow-sm"
          />
          {searchTerm && (
            <button aria-label="Clear search input" type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors text-sm font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      {searchTerm && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          {filteredTech.length} technolog
          {filteredTech.length !== 1 ? "ies" : "y"} found
        </p>
      )}

      {filteredTech.length === 0 ? (
        <div className="text-start py-16">
          <div className="me-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
            <IconSearch size={32} stroke={1.5} className="text-zinc-400" />
          </div>
          <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-1">
            No technologies found
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xs me-auto">
            We couldn&apos;t find any technology matching &ldquo;{searchTerm}
            &rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 place-items-center md:grid-cols-3 md:gap-3 gap-8">
          {filteredTech.map((tech: TechOption) => {
            const Icon = (Icons as any)[tech.icon] || Icons.IconHelp;

            return (
              <Link
                aria-label={tech.name}
                href={`/projects/${tech.value}`}
                key={tech.id}
                className="group relative rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                <div className="relative mb-4 flex justify-center">
                  <Image
                    src="/images/folder.png"
                    width={200}
                    height={200}
                    alt="folder"
                    className="w-full h-full object-contain"
                  />

                  <div className="absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white shadow">
                    <Icon size={22} stroke={1.5} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0">
                    <h3 className="font-[500] text-lg text-black dark:text-white">
                      {tech.name}
                    </h3>
                    <p className="font-[500] text-sm text-black dark:text-white">
                      {tech.project_count}{" "}
                      {Number(tech.project_count) === 1
                        ? "Project"
                        : "Projects"}
                    </p>
                  </div>

                  <div className="transition-transform duration-300 group-hover:scale-125 blur_backg p-2 w-10 h-10 !rounded-full flex justify-center items-center shrink-0">
                    <IconArrowUpRight size={20} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
