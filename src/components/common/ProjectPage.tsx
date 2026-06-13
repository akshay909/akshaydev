"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { IconLoader } from "@tabler/icons-react";

const ProjectCardPage = dynamic(
  () => import("@/components/common/ProjectCardPage"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[250px] dark:bg-gray-600 animate-pulse rounded-xl" />
    ),
  }
);

// Project interface
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

// Custom projects array
const customProjects: Project[] = [

   {
    id: 1,
    title: "Smart Inventory Management",
    description: "AI-powered inventory system with demand forecasting, automated reordering, and barcode scanning integration.",
    tech: ["React", "Node JS", "MongoDB"],
    livelink: "https://github.com",
    image: "/images/invent.png",
    image_scroll: true,
    createdAt: "2024-03-10"
  },
  {
    id: 2,
    title: "Blogging Platform",
    description: "A modern blogging platform with rich text editing, social sharing, and personalized content recommendations.",
    tech: ["React", "MongoDB","Node JS"],
    livelink: "https://github.com",
    image: "/images/blogging.png",
    image_scroll: true,
    createdAt: "2024-03-15"
  }, 
  {
    id: 3,
    title: "Real Estate",
    description: "Property listing platform with virtual tours, booking and rental management.",
    tech: ["Wordpress", "MySQL", "HTML", "CSS"],
    livelink: "https://github.com",
    image: "/images/property.png",
    image_scroll: false,
    createdAt: "2024-03-25"
  }
  , 
    {
    id: 4,
    title: "Victortainment",
    description: "An interactive web development agency platform built to showcase digital services, portfolio projects, and client engagement.",
    tech: ['Laravel', "MongoDB", "Bootstrap"],
    livelink: "https://github.com",
    image: "/images/vic.png",
    image_scroll: true,
    createdAt: "2024-02-01"
  },
 

    {
    id: 5,
    title: "Ecommerce Website",
    description: "Jwellery ecommerce website using Woocommerce with user-friendly interface, secure payment gateway, and seamless shopping experience.",
    tech: ['Wordpress', "MySQL","Woocommerce"],
    livelink: "https://github.com",
    image: "/images/vicuiux.png",
    image_scroll: true,
    createdAt: "2024-02-01"
  },
  
    {
    id: 6,
    title: "Jackluther Painting",
    description: "Informational website for a painting company, showcasing services, portfolio, and contact information with a responsive design.",
    tech: ['Wordpress', "MySQL", "Elementor"],
    livelink: "https://github.com",
    image: "/images/jack.jpg",
    image_scroll: true,
    createdAt: "2024-02-01"
  },

      {
    id: 7,
    title: "Construction Company Website",
    description: "A modern website for a construction company, featuring project showcases, service descriptions, and contact information with a responsive design.",
    tech: ["Bootstrap",'React', "MySQL", "Node JS"],
    livelink: "",
    image: "/images/jlmining.png",
    image_scroll: true,
    createdAt: "2024-02-01"
  },

  {
    id: 8,
    title: "Plumb Club",
    description: "Ecommerce platform for jewellery supplies, featuring product catalog, secure checkout, and inventory management.",
    tech: ["Wordpress", "PHP", "MySQL"],
    livelink: "https://github.com",
    image: "/images/plumb.png",
    image_scroll: true,
    createdAt: "2024-03-01"
  },
  {
    id: 9,
    title: "Healthcare Appointment System",
    description: "Telemedicine platform with AI symptom checker, video consultations, prescription management, and EHR integration.",
    tech: ["React", "Node JS", "MongoDB"],
    livelink: "https://github.com",
    image: "/images/hospital.png",
    image_scroll: false,
    createdAt: "2024-03-05"
  },
 {
    id: 10,
    title: "SASS Platfrom",
    description: "A modern fintech mobile app focused on seamless transactions, intuitive UI, and secure payment experience.",
    tech: ['Next JS','Tailwind CSS', 'Stripe',"MySQL" ],
    livelink: "https://github.com",
    image: "/images/project2.png",
    image_scroll: true,
    createdAt: "2024-01-15"
  },
  {
    id: 11,
    title: "Power Technology",
    description: "A modern logistics web platform designed for real-time shipment tracking, order management, and smooth delivery operations with a clean and user-friendly interface.",
    tech: ["HTML", "Tailwind CSS", "Wordpress"],
    livelink: "https://github.com",
    image: "/images/project1.png",
    image_scroll: false,
    createdAt: "2024-01-20"
  },
  {
    id: 12,
    title: "Smart Task Management System",
    description: "AI-enhanced productivity tool with natural language processing for task extraction and smart prioritization algorithms.",
    tech: ['Laravel', "MongoDB", "Bootstrap"],
    livelink: "https://github.com",
    image: "/images/project3.png",
    image_scroll: true,
    createdAt: "2024-02-01"
  },

];

export default function ProjectPage() {
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const projects = customProjects;
  const hasNextPage = visibleCount < projects.length;
  
  const fetchNextPage = () => {
    setIsLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, projects.length));
      setIsLoadingMore(false);
    }, 800);
  };
  
  const displayedProjects = projects.slice(0, visibleCount);
  
  // Initial loading state
  if (visibleCount === 9 && isLoadingMore) {
    return (
      <div className="flex min-h-[50vh] bg-white dark:bg-black">
        <div className="flex-1 flex items-center justify-center">
          <IconLoader className="w-8 h-8 text-indigo-400 animate-spin" />
        </div>
      </div>
    );
  }
  
  return (
    <> 
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-3 gap-8">
        {displayedProjects.map((project: Project) => (
          <ProjectCardPage key={project.id} {...project} />
        ))}
      </div>
      
      {hasNextPage && (
        <div className="flex justify-center mt-10">
          <button
            aria-label={isLoadingMore ? "Loading more projects" : "Load more projects"}
            onClick={() => fetchNextPage()}
            disabled={isLoadingMore}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? (
              <span className="flex items-center gap-2">
                <IconLoader className="w-4 h-4 animate-spin" />
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
      
      {/* Optional: Show message when all projects are loaded */}
      {!hasNextPage && projects.length > 9 && (
        <div className="text-center text-gray-500 mt-10">
           You've seen all {projects.length} projects!
        </div>
      )}
    </>
  );
}