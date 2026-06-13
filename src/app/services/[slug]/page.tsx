import type { Metadata } from "next";
import { servicesData } from "@/lib/services";
import SlugServices from "@/components/services/SlugServices";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: `Service Not Found | ${process.env.NEXT_PUBLIC_OWNER_NAME}`,
    };
  }

  return {
    title: `${service.title} | ${process.env.NEXT_PUBLIC_OWNER_NAME} - Full Stack Developer`,
    description: service.shortDescription,
    keywords: [
      service.title,
      `${process.env.NEXT_PUBLIC_OWNER_NAME} services`,
      "Web development",
      "Frontend development",
      "Backend development",
      "Full stack developer",
    ],
    openGraph: {
      title: `${service.title} | ${process.env.NEXT_PUBLIC_OWNER_NAME}`,
      description: service.shortDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/services/${slug}`,
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

export default async function ServiceDetails({ params }: Props) {
  const { slug } = await params;

  return <SlugServices slug={slug} />;
}
