// lib/services.ts
import {
  IconBrandReact,
  IconBrandNodejs,
  IconCode,
  IconPalette,
  IconRocket,
} from "@tabler/icons-react";

export type Service = {
  slug: string;
  icon: any;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features?: string[];
  technologies?: string[];
  mediumUrl: string;
};

export const servicesData: Service[] = [
  {
    slug: "frontend-development",
    icon: IconBrandReact,
    title: "Frontend Development (React & Next.js)",
    shortDescription:
      "Pixel-perfect, responsive, and lightning-fast user interfaces built with React, Next.js, TypeScript, and Tailwind CSS for maximum performance and SEO.",
    fullDescription:
      "I build modern, accessible, and high-performance frontend applications that rank well and convert visitors. From interactive dashboards to complex SaaS platforms, every interface is carefully crafted with semantic HTML, smooth animations, Core Web Vitals, and an obsessive attention to user experience. My frontend development services ensure your brand stands out with blazing-fast load times and flawless responsiveness across all devices.",
    features: [
      "100% Responsive & Mobile-First Design",
      "Component-Driven Architecture (React, Next.js)",
      "Advanced State Management (Redux, Zustand, Context API)",
      "Performance Optimization for Core Web Vitals",
      "WCAG-Compliant Accessibility (a11y)",
      "SEO-Ready Frontend Structure",
    ],
    technologies: [
      "React.js",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
    mediumUrl:
      "/",
  },
  {
    slug: "backend-development",
    icon: IconBrandNodejs,
    title: "Backend Development (Node.js & APIs)",
    shortDescription:
      "Scalable, secure server-side solutions with Node.js, Express, REST APIs, GraphQL, authentication, and optimized database architecture.",
    fullDescription:
      "I develop robust backend systems that power your web and mobile apps efficiently and securely. Whether you need high-performance REST APIs, real-time features (WebSockets), or complex business logic — I build scalable, cloud-native solutions that grow seamlessly with your business. My backend engineering includes advanced security practices, data validation, caching strategies, and CI/CD pipelines for reliable deployment.",
    features: [
      "RESTful & GraphQL API Development",
      "JWT / OAuth Authentication & Role-Based Access",
      "Database Design, Indexing & Query Optimization",
      "Microservices & Serverless Architecture",
      "Cloud Integration (AWS, Vercel, Railway)",
      "Automated Testing (Jest, Supertest)",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "NestJS",
      "MongoDB (Mongoose)",
      "PostgreSQL (Prisma / TypeORM)",
      "Redis",
      "Docker",
    ],
    mediumUrl:
      "/",
  },
  {
    slug: "full-stack-apps",
    icon: IconCode,
    title: "Full Stack Web Development",
    shortDescription:
      "End-to-end modern web applications — from initial idea to production deployment and beyond.",
    fullDescription:
      "I offer complete full-stack web development services, handling everything from UI/UX design to backend logic, database modeling, API integration, cloud deployment, and ongoing maintenance. By combining React/Next.js on the frontend with Node.js on the backend, I deliver cohesive, fast, and scalable applications tailored to your business goals. You get a single point of contact and a unified tech stack that accelerates time-to-market.",
    features: [
      "End-to-End Development & Integration",
      "Modern MERN / PERN Stack Expertise",
      "Secure Authentication & Data Validation",
      "CI/CD Pipeline Setup (GitHub Actions)",
      "Deployment & Hosting (Vercel, Netlify, AWS)",
      "Post-Launch Monitoring & Maintenance",
    ],
    technologies: [
      "Next.js (Full Stack)",
      "Node.js + Express",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL / MongoDB",
      "Prisma",
      "Vercel",
    ],
    mediumUrl:
      "/",
  },
  {
    slug: "ui-ux-design",
    icon: IconPalette,
    title: "UI/UX Design & Prototyping",
    shortDescription:
      "Beautiful, intuitive, and user-centric designs created in Figma with a focus on conversion and usability.",
    fullDescription:
      "I design user-centered interfaces that are not only visually stunning but also highly functional and conversion-oriented. From low-fidelity wireframes to clickable high-fidelity prototypes — I ensure your product feels intuitive and delightful to use. My UI/UX design process includes user research, information architecture, design systems, usability testing, and seamless handoff to developers. I bridge the gap between design and code, saving you time and rework.",
    features: [
      "User Research & Persona Creation",
      "Wireframing & Interactive Prototypes",
      "Design Systems & Component Libraries",
      "Usability Testing & Iteration",
      "Figma-to-Code Handoff (with Dev-Friendly Specs)",
      "Responsive & Adaptive Design",
    ],
    technologies: ["Figma", "Framer", "Adobe XD", "Principle", "Miro"],
    mediumUrl:
      "/",
  },
  {
    slug: "performance-seo",
    icon: IconRocket,
    title: "Performance Optimization & Technical SEO",
    shortDescription:
      "Blazing fast websites optimized for Core Web Vitals, Lighthouse scores, and technical SEO to dominate search results.",
    fullDescription:
      "I specialize in making websites incredibly fast and search-engine friendly. Slow websites kill conversions — I fix that. Using advanced Next.js patterns, image optimization, code splitting, and efficient caching, I help you achieve perfect Lighthouse scores. Additionally, I implement technical SEO best practices: structured data (Schema.org), meta tags, sitemaps, robots.txt, canonical URLs, and analytics setup. My performance and SEO services ensure your site ranks higher, loads instantly, and keeps users engaged.",
    features: [
      "Core Web Vitals (LCP, FID, CLS) Optimization",
      "Technical SEO Audits & Fixes",
      "Schema Markup (JSON-LD) for Rich Snippets",
      "Image, Video & Font Optimization",
      "Server-Side Rendering (SSR) & Static Generation (SSG)",
      "Google Analytics 4 & Search Console Integration",
      "Ongoing Performance Monitoring",
    ],
    technologies: [
      "Next.js (SSR/SSG/ISR)",
      "Vercel Speed Insights",
      "Lighthouse CI",
      "Google Tag Manager",
      "Screaming Frog",
      "PageSpeed Insights API",
    ],
    mediumUrl:
      "/",
  },
];
