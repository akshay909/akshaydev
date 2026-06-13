import type { Metadata } from "next";
import ServicesClient from "@/components/services/ServicesClient";

// ✅ SEO
export const metadata: Metadata = {
  title: `Services | ${process.env.NEXT_PUBLIC_OWNER_NAME} - Full Stack Developer`,
  description:
    "Explore professional web development services including frontend, backend, full stack apps, UI/UX design, and performance optimization.",
  keywords: [
    "Web development services",
    "Frontend developer",
    "Backend developer",
    "Full stack developer",
    "Next.js developer",
    "React developer",
    "UI UX design services",
    "SEO optimization services",
  ],
  openGraph: {
    title: `Services | ${process.env.NEXT_PUBLIC_OWNER_NAME}`,
    description:
      `Professional web development services by ${process.env.NEXT_PUBLIC_OWNER_NAME}. Frontend, backend, full stack and more.`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
};


export default function Services() {
  return <ServicesClient />;
}
