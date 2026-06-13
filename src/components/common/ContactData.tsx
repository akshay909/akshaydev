"use client";
 
import Button from "@/components/common/Button";
import { IconDiamond } from "@tabler/icons-react";
import { motion } from "framer-motion";
 import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
  IconMapPin,
  IconBriefcase,
  IconBrandReact,
  IconPalette,
  IconBrandTypescript,
  IconBrandNodejs,
  IconDatabase,
  IconApi,
  IconCode,
  IconTrophy,
  IconRocket,
  IconSparkles,
  IconHeart,
  IconUsers,
  IconTrendingUp,
  IconBrandWhatsapp ,
} from "@tabler/icons-react";
 

export default function ContactData() {
  
  return (
    <section id="contact" className="pb-16 ">
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <div className="flex flex-col gap-5">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
           
            className="text-white font-normal flex items-center gap-2 bg-primary px-4 py-1.5 rounded-full w-fit mx-auto text-sm"
          >
            <IconDiamond stroke={2} size={17} /> <span>Contact Me</span>
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
           
            className="flex flex-col gap-4"
          >
            <h2 className="text-3xl md:text-5xl font-[400] text-black/90 dark:text-white">
              Let’s Build Your Next Web Project
            </h2>

            <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
              Share your idea and get a scalable, production-ready solution
              tailored for startups, businesses, and modern SaaS platforms.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0 }} 
        className="max-w-2xl mx-auto px-4"
      >
     <div className="flex gap-4 pt-4 justify-center">
                       {[
                         {
                           icon: IconBrandGithub,
                           href: `${process.env.NEXT_PUBLIC_GITHUB_URL}`,
                           label: "GitHub",
                           title: "GitHub",
                         },
                         {
                           icon: IconBrandLinkedin,
                           href: `${process.env.NEXT_PUBLIC_LINKEDIN_URL}`,
                           label: "LinkedIn",
                           title: "LinkedIn", 
                         },
                         {
                           icon: IconMail,
                           href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
                           label: "Email",
                           title: "Email",
                         },
                         {
                           icon: IconBrandWhatsapp ,
                           href: `tel:${process.env.NEXT_PUBLIC_WHATSAPP}`,
                           label: "WhatsApp",
                           title: "WhatsApp",
                         },
                       ].map((social, i) => (
                         <motion.a
                           key={i}
                           href={social.href}
                           target="_blank"
                           whileHover={{ scale: 1.1, y: -2 }}
                           whileTap={{ scale: 0.3 }}
                           className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:border-primary dark:hover:border-primary transition-colors group"
                           aria-label={social.label}
                           title={social.title}
                         >
                           <social.icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-primary transition-colors" />
                         </motion.a>
                       ))}
                     </div>
      </motion.div>
    </section>
  );
}
