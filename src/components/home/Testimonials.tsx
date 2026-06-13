"use client";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { IconMessageCode } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "framer-motion";

const cardsData = [
  {
    image: "/images/user.jpg",
    name: "Steve Borhan",
    handle:
      "Experienced developer required to build interactive feature on wordpress website",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review: "Responsive and professional freelancer. Highly recommended",
  },
  {
    image: "/images/user.jpg",
    name: "Paul Dimitriu",
    handle: "Fix Scrollbar in Template",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review:
      "Akshay did a great job fixing my HTML issue. He fixed my issue right away. Thank you very much for an awesome job.",
  },
  {
    image: "/images/user.jpg",
    name: "Megan Rebstein-Dovey",
    handle: "Making a WP site mobile friendly and responsive",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review:
      "Akshay is an amazing web developer! He did an excellent job making our website mobile-friendly and went far over and above what was requested. He was pleasant, professional, efficient, and communicated well throughout the process. Highly recommended.",
  },
  {
    image: "/images/user.jpg",
    name: "Richard Farr",
    handle: "Dashboard Prototypes in Figma",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review: "He's great. Would work with again.",
  },
  {
    image: "/images/user.jpg",
    name: "Faran Irfan",
    handle: "Web page graphic designer",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review: "Good guy.",
  },
  {
    image: "/images/user.jpg",
    name: "Mathilde Brutoit",
    handle: "Create homepage with theme wordpress",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review: "Perfect job! Thanks",
  },
  {
    image: "/images/user.jpg",
    name: "Marc Wiese",
    handle: "Seeking a Laravel Developer for many project",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review: "He understands frontend well and did great work for me.",
  },
  {
    image: "/images/user.jpg",
    name: "Bob Bobby",
    handle: "Frontend Developer to build a few pages",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review:
      "Akshay was very accommodating and communicative. Great experience overall.",
  },
  {
    image: "/images/user.jpg",
    name: "Hayley Tewes",
    handle: "Create HTML Email Signature",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review:
      "Created an email signature in under an hour. Got it right first go. Would highly recommend.",
  },
  {
    image: "/images/user.jpg",
    name: "Marc Wiese",
    handle: "Convert website into new design - need webdesigner skills",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review:
      "Made everything as expected and has great skills. Great person to speak with and asks all the right questions.",
  },
  {
    image: "/images/user.jpg",
    name: "Jim Wyatt",
    handle: "Microsoft PowerPoint presentation designer - URGENT",
    date: "2025",
    rating: 5,
    platform: "Freelancer",
    review:
      "Excellent pictogram skills. Worked diligently and swiftly with great communication throughout.",
  },
];

function TestimonialCard({ card }: any) {
  return (
    <div className="px-3">
      <div className="dark:bg-zinc-900 min-h-[235px] w-full flex gap-4 justify-between flex-col bg-primary/5 border dark:border-zinc-800 border-primary/20 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={card.image}
              alt={card.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <h5 className="font-semibold dark:text-white text-black">
                {card.name}
              </h5>
              <p className="text-sm dark:text-zinc-400 text-zinc-600">
                {card.handle}
              </p>
            </div>
          </div>

          <p className="text-sm dark:text-zinc-300 text-zinc-500 mb-4 leading-relaxed line-clamp-3">
            {card.review}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs dark:text-zinc-500 text-zinc-600">
            Project : {card.date}
          </span>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < card.rating
                      ? "text-yellow-400"
                      : "text-zinc-300 dark:text-zinc-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.274-3.957z" />
                </svg>
              ))}
              <span className="text-xs text-zinc-500 ml-1">
                {card.rating}.0
              </span>
            </div>

            <span className="text-[10px] px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium">
              {card.platform}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const Mobilesettings = {
    dots: false,
    infinite: true,
    speed: 10000,
    autoplay: true,
    adaptiveHeight: false,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    rtl: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 10000,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 8000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 6000,
        },
      },
    ],
  };

  const reverseMobSettings = {
    ...Mobilesettings,
    rtl: true,
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 10000,
    autoplay: true,
    adaptiveHeight: false,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    rtl: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 10000,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 8000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 6000,
        },
      },
    ],
  };

  const reverseSettings = {
    ...settings,
    rtl: true,
  };

  return (
    <section className="py-16 block overflow-hidden">
      <div className="container mx-auto px-4 text-center pb-12">
        <div className="flex flex-col gap-5">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white flex items-center gap-2 bg-primary px-4 py-1.5 rounded-full w-fit mx-auto text-sm"
          >
            <IconMessageCode size={17} />
            <span>Client Testimonials</span>
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: false, amount: 0.5 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-3xl md:text-5xl font-[400] text-black/90 dark:text-white">
              Trusted by Clients Worldwide
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
              Real feedback from startups, founders, and businesses who've built
              scalable websites and modern applications with us.
            </p>
            <div className="flex gap-4 flex-wrap justify-center items-center">
              <div className="flex justify-center items-center gap-2 w-fit text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-black dark:text-white">
                  5.0
                </span>
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <div className="w-fit text-sm text-zinc-600 dark:text-zinc-400">
                <span>Verified Freelancer Reviews</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: false, amount: 0.5 }}
        className="relative overflow-hidden w-full md:flex hidden flex-col gap-8 "
      >
        <div className="w-full">
          <Slider {...settings}>
            {cardsData.map((card, i) => (
              <TestimonialCard key={i} card={card} />
            ))}
          </Slider>
        </div>
        <div className="w-full">
          <Slider {...reverseSettings}>
            {cardsData.map((card, i) => (
              <TestimonialCard key={i} card={card} />
            ))}
          </Slider>
        </div>
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r dark:from-black from-white to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l dark:from-black from-white to-transparent pointer-events-none z-10" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: false, amount: 0.5 }}
        className="relative overflow-hidden w-full md:hidden flex flex-col gap-8 "
      >
        <div className="w-full">
          <Slider {...Mobilesettings}>
            {cardsData.map((card, i) => (
              <TestimonialCard key={i} card={card} />
            ))}
          </Slider>
        </div>
        <div className="w-full">
          <Slider {...reverseMobSettings}>
            {cardsData.map((card, i) => (
              <TestimonialCard key={i} card={card} />
            ))}
          </Slider>
        </div>
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r dark:from-black from-white to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l dark:from-black from-white to-transparent pointer-events-none z-10" />
      </motion.div>
    </section>
  );
}
