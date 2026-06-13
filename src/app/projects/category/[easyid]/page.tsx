import { use } from "react";
import type { Metadata } from "next";
import CategoryClient from "@/components/projects/CategoryClient";

type Props = {
  params: Promise<{
    easyid: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { easyid } = await params;

  const categoryDisplay =
    easyid === "next"
      ? "Next.js"
      : easyid === "react"
        ? "React"
        : easyid
          ? easyid.charAt(0).toUpperCase() + easyid.slice(1)
          : "Projects";

  return {
    title: `${categoryDisplay} Projects | ${process.env.NEXT_PUBLIC_OWNER_NAME} - Full Stack Developer`,
    description: `Explore ${categoryDisplay} projects built by ${process.env.NEXT_PUBLIC_OWNER_NAME}. Modern web applications with ${categoryDisplay} and scalable architectures.`,
    keywords: [
      `${categoryDisplay} projects`,
      `${process.env.NEXT_PUBLIC_OWNER_NAME} projects`,
      "React projects",
      "Next.js projects",
      "Full stack projects",
      "Web development portfolio",
    ],
    openGraph: {
      title: `${categoryDisplay} Projects | ${process.env.NEXT_PUBLIC_OWNER_NAME}`,
      description: `Explore ${categoryDisplay} projects built by ${process.env.NEXT_PUBLIC_OWNER_NAME}.`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/category/${easyid}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function CategoryProjectPage({ params }: Props) {
  const { easyid } = use(params);

  return (
    <>
      <CategoryClient easyid={easyid} />
    </>
  );
}
