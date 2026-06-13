"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight, IconLoader, IconSearch } from "@tabler/icons-react";
import { projectsCategories } from "@/services/projectApi";
import * as Icons from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

type categoryOption = {
  icon: any;
  id: number;
  name: string;
  project_count: string;
  value: string;
};

export default function CategoriesProject() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await projectsCategories();
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <IconLoader className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading categories 🚫
      </div>
    );
  }

  // Filter categories based on search term
  const filteredCategories =
    data?.filter((category: categoryOption) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
            placeholder="Search categories..."
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

      {searchTerm && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          {filteredCategories.length} category
          {filteredCategories.length !== 1 ? "ies" : ""} found
        </p>
      )}

      {filteredCategories.length === 0 ? (
        <div className="text-start py-16">
          <div className="me-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
            <IconSearch size={32} stroke={1.5} className="text-zinc-400" />
          </div>
          <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-1">
            No categories found
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xs me-auto">
            We couldn&apos;t find any category matching &ldquo;{searchTerm}
            &rdquo;. Try a different keyword.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6 justify-items-center">
          {filteredCategories.map((category: categoryOption) => {
            const Icon = (Icons as any)[category.icon] || Icons.IconHelp;
            const slug = category.value.toLowerCase().replace(/\s+/g, "-");

            return (
              <Link
                key={category.id}
                aria-label={category.name}
                href={`/projects/category/${slug}`}
                className="w-full max-w-[260px] group relative rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
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
                      {category.name}
                    </h3>
                    <p className="font-[500] text-sm text-black dark:text-white">
                      {category.project_count}{" "}
                      {Number(category.project_count) === 1
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
