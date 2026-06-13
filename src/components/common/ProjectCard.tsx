"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface ProjectCardProps {
  image: string;
  object: string;
  imagecl: string;
  imageScroll: boolean;
  title: string;
  tech: string[];
  description: string;
}

export default function ProjectCard({
  image,
  object = "object-cover",
  imagecl = "bg-transparent",
  imageScroll = false,
  title,
  tech,
  description,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className="flex flex-col gap-0 group rounded-xl bg-white dark:bg-black">
      <div className="relative overflow-hidden rounded-xl">
        {/* loader */}
        {!imgLoaded && (
          <div className="absolute inset-0 z-10 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]" />
          </div>
        )}

        {imageScroll ? (
          <Image
            src={image}
            alt={title}
            onLoadingComplete={() => setImgLoaded(true)}
            width={500}
            height={300}
            className={`w-full md:h-[500px] h-fit ${object} ${imagecl} transition-transform duration-500 scale-105`}
            style={{
              objectPosition: hovered ? "bottom" : "top",
              transition: "object-position 2.5s ease",
            }}
          />
        ) : (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            onLoadingComplete={() => setImgLoaded(true)}
            className={`w-full h-[350px] md:h-[500px] object-top ${object} ${imagecl} transition duration-500 group-hover:scale-105`}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 flex-1 py-6">
        <div className="flex gap-3 flex-col">
          <div className="flex items-center gap-3 flex-wrap">
            {tech.map((item, index) => (
              <p
                key={index}
                className="px-4 py-1 rounded-full !bg-primary back-blur dark:!bg-primary/10   text-white text-sm"
              >
                {item}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-0">
            <h4 className="text-xl dark:font-medium font-bold dark:text-white text-black m_font">
              {title}
            </h4>
            <p className="text-md dark:text-zinc-400 text-zinc-800 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
