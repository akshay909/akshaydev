"use client";
import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandReact,
  IconBrandJavascript,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandTailwind,
  IconBrandBootstrap,
  IconBrandMysql,
  IconBrandFigma,
  IconBrandPhp,
  IconChevronLeft,
  IconChevronRight, 
  IconCircleDashedX,IconBrandLaravel, IconBrandMongodb, IconBrandStripe,IconBrandWordpress
} from "@tabler/icons-react";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  tech: string[];
  livelink: string;
  image?: string;
  image_scroll: boolean;
  createdAt: string;
}

const techIcons: any = {
  HTML: IconBrandHtml5,
  "Tailwind CSS": IconBrandTailwind,
  CSS: IconBrandCss3,
  "React JS": IconBrandReact,
  React: IconBrandReact,
  JavaScript: IconBrandJavascript,
  "Next JS": IconBrandNextjs,
  "Node JS": IconBrandNodejs,
  Bootstrap: IconBrandBootstrap,
  MySQL: IconBrandMysql,
  Figma: IconBrandFigma,
  PHP: IconBrandPhp,
  Laravel: IconBrandLaravel,
  MongoDB: IconBrandMongodb,
   Stripe: IconBrandStripe,
   Woocommerce : IconBrandWordpress,
   Wordpress: IconBrandWordpress,
   Elementor: IconBrandWordpress
   
};

export default function ProjectCardPage({
  image,
  image_scroll = false,
  title,
  tech,
  description,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScroll(el.scrollWidth > el.clientWidth);
  }, [tech]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -150 : 150,
      behavior: "smooth",
    });
  };

  const imageUrl =
    image && image !== "null"
      ? `${process.env.NEXT_PUBLIC_API_URL}/${image.replace(/^\/+/, "")}`
      : "/fallback.png";
// `${process.env.NEXT_PUBLIC_API_URL}/portfolio-backend/public/${image.replace(/^\/+/, "")}`
  return (
    <div className="flex flex-col gap-0 group rounded-xl blur_backg p-4">
      <div
        className="overflow-hidden rounded-xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={imageUrl}
          alt={title}
          width={500}
          height={300}
          onClick={() => setPreviewOpen(true)}
          className={`w-full h-[300px] transition object-cover object-top duration-500 group-hover:scale-105`}
          style={{
            objectPosition: hovered ? "bottom" : "top",
            transition: "object-position 2.5s ease",
          }}
        />
      </div>

      <div className="flex flex-col gap-3 flex-1 pt-6">
        <div className="relative flex items-center">
          {canScroll && (
            <button
              aria-label="Scroll technologies left"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scroll("left");
              }}
              className="absolute -left-3 z-10 p-1 rounded-full bg-white dark:bg-zinc-800 shadow"
            >
              <IconChevronLeft size={18} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap"
          >
            {tech.map((item, index) => {
              const Icon = techIcons[item];

              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm shrink-0"
                >
                  {Icon && <Icon size={16} />}
                  {item}
                </div>
              );
            })}
          </div>

          {canScroll && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                scroll("right");
              }}
              aria-label="Scroll technologies right"
              type="button"
              className="absolute -right-3 z-10 p-1 rounded-full bg-white dark:bg-zinc-800 shadow"
            >
              <IconChevronRight size={18} />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-xl dark:font-medium font-bold dark:text-white text-black">
            {title}
          </h4>

          <p className="text-md dark:text-zinc-400 text-zinc-800 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {previewOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close image preview"
              onClick={() => setPreviewOpen(false)}
              className="absolute top-5 right-5 bg-red-500 w-[30px] h-[30px] flex justify-center items-center p-2 shrink-0 rounded-full  "
            >
              <span className="text-sm text-white">
                <IconCircleDashedX stroke={2} />
              </span>
            </button>

            <div
              className="h-[90vh] overflow-y-auto rounded-xl"
              data-lenis-prevent
            >
              <img src={imageUrl} alt={title} className="w-full object-cover" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
