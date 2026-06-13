"use client";

import dynamic from "next/dynamic";
const ProjectCardPage = dynamic(
  () => import("@/components/common/ProjectCardPage"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[250px] dark:bg-gray-600 animate-pulse rounded-xl" />
    ),
  },
);

import { getProjects } from "@/services/projectApi";
import { IconLoader } from "@tabler/icons-react";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  livelink: string;
  image?: string;
  image_scroll: boolean;
  createdAt: string;
}

export default function ProjectPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getProjects(pageParam, 9);
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 9 ? allPages.length + 1 : undefined;
    },
  });

  const projects = data?.pages.flat() || [];

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
      <div className="text-center text-red-500">Failed to load projects 🚫</div>
    );
  }

  return (
    <> 
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-3 gap-8">
        {projects.map((project: Project) => (
          <ProjectCardPage key={project.id} {...project} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-10">
          <button
            aria-label={
              isFetchingNextPage
                ? "Loading more projects"
                : "Load more projects"
            }
            onClick={() => fetchNextPage()}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
