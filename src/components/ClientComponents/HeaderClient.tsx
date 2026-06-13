"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import Button from "@/components/common/Button";
import ThemeButton from "@/components/common/ThemeButton";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Projects", href: "/projects" },
  // { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const services = [
  {
    title: "Frontend Development",
    href: "/services/frontend-development",
    icon: "/images/front-end.png",
  },
  {
    title: "Backend Development",
    href: "/services/backend-development",
    icon: "/images/backend-coding.png",
  },
  {
    title: "Full Stack Apps",
    href: "/services/full-stack-apps",
    icon: "/images/web-coding.png",
  },
  {
    title: "UI/UX Design",
    href: "/services/ui-ux-design",
    icon: "/images/ux.png",
  },
  {
    title: "Performance & SEO",
    href: "/services/performance-seo",
    icon: "/images/seo.png",
  },
];

function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
// ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPA8epJi+WvCfL8Othddhj7f3/O634/9cLCEFKT1dREC
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`border-b border-black/20 dark:border-white/20 z-50 transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-white/90 dark:bg-black backdrop-blur-lg shadow-lg"
          : "relative"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link aria-label="Logo image" href="/" className="w-auto text-xl font-bold text-primary">
            {/* <Image
              src="/images/logo.svg"
              alt={`${process.env.NEXT_PUBLIC_OWNER_NAME} Portfolio Logo Dark`}
              className="dark:block hidden h-full w-auto text-primary via-primary"
              width={120}
              height={40}
              priority
            />
            <Image
              src="/images/logo-light.svg"
              alt={`${process.env.NEXT_PUBLIC_OWNER_NAME} Portfolio Logo Light`}
              width={120}
              height={40}
              className="dark:hidden block h-full w-auto text-primary via-primary"
              priority
            /> */}
           AKY DEV
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, i) => {
                if (item.name === "Services") {
                  return (
                    <div key={i} className="relative" ref={dropdownRef}>
                      <button
                        aria-label="Toggle services dropdown menu"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className={`flex items-center gap-1 transition ${
                          pathname === "/services"
                            ? "text-primary"
                            : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        Services
                        <svg
                          className={`w-4 h-4 transition ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {dropdownOpen && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 mt-6 w-80
                          bg-white dark:bg-zinc-900 border border-black/10 
                          dark:border-white/10 rounded-lg p-4 shadow-xl"
                        >
                          <div className="flex flex-col gap-2">
                            {services.map((service, index) => (
                              <Link
                                aria-label={service.title}
                                key={index}
                                href={service.href}
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 p-2 rounded-md
                                hover:bg-black/10 dark:hover:bg-white/5 transition"
                              >
                                <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-md">
                                  <Image
                                    src={service.icon}
                                    alt={service.title}
                                    width={120}
                                    height={40}
                                    className="w-5 h-5"
                                    priority
                                  />
                                </div>
                                <span className="text-sm">{service.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={i}
                    href={item.href}
                    aria-label={item.name}
                    className={`transition text-md font-normal ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex h-[60px] w-[1px] bg-black/40 dark:bg-white/40" />

            {/* Theme + Hire Me */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeButton />
              {/* <Button link="/contact" name="Hire Me" variant="primary" /> */}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button aria-label="Toggle mobile menu" className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div className="hidden">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
          <a href="/services">Services</a>
          {/* <a href="/contact">Contact</a> */}

          <a href={process.env.NEXT_PUBLIC_GITHUB_URL}>GitHub</a>
          <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL}>LinkedIn</a>
        </div>

        {isOpen && (
          <div className="md:hidden bg-black/80 rounded-xl p-6 mb-4">
            <nav className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  aria-label={item.name}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg ${
                    pathname === item.href ? "text-primary" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* <Button aria-label="Hire me" link="/contact" name="Hire Me" variant="primary" /> */}
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
}

export default Header;
