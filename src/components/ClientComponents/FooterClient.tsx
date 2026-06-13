"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Projects", href: "/projects" },
  // { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const serviceLinks = [
  {
    title: "Frontend Development",
    href: "/services/frontend-development",
  },
  {
    title: "Backend Development",
    href: "/services/backend-development",
  },
  {
    title: "Full Stack Apps",
    href: "/services/full-stack-apps",
  },
  { title: "UI/UX Design", href: "/services/ui-ux-design" },
  { title: "Performance & SEO", href: "/services/performance-seo" },
];

const socialLinks = [
  {
    icon: IconBrandGithub,
    href: `${process.env.NEXT_PUBLIC_GITHUB_URL}`,
    label: "GitHub",
  },
  {
    icon: IconBrandLinkedin,
    href: `${process.env.NEXT_PUBLIC_LINKEDIN_URL}`,
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
      className="block pt-16 border-t border-gray-700"
    >
      <div className="mx-auto container px-4">
        <div className="grid grid-cols-1 md:grid-cols-[30%_30%_30%_0%] gap-10">
          <div className="flex flex-col gap-5">
            <div className="h-20 w-full text-xl font-bold text-primary">
              {/* <Image
                src="/images/logo.svg"
                alt={`${process.env.NEXT_PUBLIC_OWNER_NAME} Portfolio Logo Dark`}
                className="w-fit h-full dark:block hidden object-contain"
                width={120}
                height={40}
              />
              <Image
                src="/images/logo-light.svg"
                alt={`${process.env.NEXT_PUBLIC_OWNER_NAME} Portfolio Logo Light`}
                width={120}
                height={40}
                className="w-fit h-full dark:hidden block object-contain"
              /> */}
              AKY DEV
            </div>
            <p className="dark:text-gray-400 text-gray-800 leading-relaxed">
              Full-Stack Web Developer building scalable web applications, SaaS
              platforms, and high-performance digital products using modern
              technologies.
            </p>
          </div>

          <div>
            <h4 className="font-semibold dark:text-white text-black/80 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    aria-label={link.name}
                    href={link.href}
                    className="hover:text-primary transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* <div>
            <h4 className="font-semibold dark:text-white text-black/80 mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <Link
                    aria-label={service.title}
                    href={service.href}
                    className="hover:text-primary transition"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Social */}
          <div>
            <h4 className="font-semibold dark:text-white text-black/80 mb-4">
              Let’s Connect
            </h4>

            <a
              target="_blank"
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className="dark:text-white text-black"
            >
              Email: {process.env.NEXT_PUBLIC_EMAIL}
            </a>
            
             <p><a
              target="_blank"
              href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP}`}
              className="dark:text-white text-black"
            >
              WhatsApp: {process.env.NEXT_PUBLIC_WHATSAPP}
            </a></p>

            <p className="dark:text-white text-black mt-2">
              Location: Kangra, Himachal Pradesh, India
            </p>

            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex items-center gap-2 hover:text-primary transition"
                  >
                    <Icon size={20} />
                    <span className="text-sm">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="hidden">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
          {/* <a href="/services">Services</a> */}
          <a href="/contact">Contact</a>

          <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <div className="border-t border-gray-700 mt-12 py-8 text-center dark:text-gray-500 text-gray-600">
          <p>
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_OWNER_NAME}. Designed & Built by {process.env.NEXT_PUBLIC_OWNER_NAME}.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
