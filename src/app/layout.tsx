import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Providers } from "./providers";
import LenisWrapper from "@/components/common/LenisWrapper";
import GlobalToast from "@/components/common/GlobalToast";
import "./globals.css";

import { Zen_Maru_Gothic } from "next/font/google";
import process from "process";

const zen = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zen",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,

  title: `${process.env.NEXT_PUBLIC_OWNER_NAME} | Full Stack Web Developer`,
  description:
    `${process.env.NEXT_PUBLIC_OWNER_NAME} is a modern Full Stack Web Developer specializing in React, Next.js, Node.js, and scalable web applications.`,

  keywords: [
    `${process.env.NEXT_PUBLIC_OWNER_NAME}`,
    "Full Stack Developer India",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MERN Stack Developer",
  ],

  authors: [{ name: `${process.env.NEXT_PUBLIC_OWNER_NAME}` }],
  creator: `${process.env.NEXT_PUBLIC_OWNER_NAME}`,

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },

  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },

  openGraph: {
    title: `${process.env.NEXT_PUBLIC_OWNER_NAME} | Full Stack Web Developer`,
    description:
      `Explore ${process.env.NEXT_PUBLIC_OWNER_NAME}'s portfolio showcasing modern web applications.`,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: `${process.env.NEXT_PUBLIC_OWNER_NAME} Portfolio`,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${process.env.NEXT_PUBLIC_OWNER_NAME} | Full Stack Web Developer`,
    description: `Modern web developer building scalable apps for ${process.env.NEXT_PUBLIC_OWNER_NAME}.`,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://itsugestion.com" />
        <link rel="dns-prefetch" href="https://itsugestion.com" />
      </head>
      <body className={`${jost.variable} ${zen.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: `${process.env.NEXT_PUBLIC_OWNER_NAME}`,
              url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
              image:
                `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.png`,
              sameAs: [`${process.env.NEXT_PUBLIC_GITHUB_URL}`],
              jobTitle: "Full Stack Developer",
            }),
          }}
        />

        <Providers>
          <LenisWrapper>
            {children}
            <GlobalToast />
          </LenisWrapper>
        </Providers>
      </body>
    </html>
  );
}
