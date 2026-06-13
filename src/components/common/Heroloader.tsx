"use client";

import React, { useState } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandJavascript,
  IconBrandTailwind,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandBootstrap,
  IconBrandWordpress,
  IconBrandPhp,
  IconBrandLaravel,
  IconBrandSass,
  IconBrandTypescript,
} from "@tabler/icons-react";

const techSet1 = [
  IconBrandReact,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandJavascript,
  IconBrandTailwind,
  IconBrandWordpress,
  IconBrandPhp,
  IconBrandLaravel,
  IconBrandHtml5,
  IconBrandCss3,
];

const techSet2 = [
  IconBrandBootstrap,
  IconBrandSass,
  IconBrandTypescript,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandWordpress,
  IconBrandPhp,
  IconBrandLaravel,
  IconBrandNodejs,
  IconBrandJavascript,
];

export default function Heroloader() {
  const { scrollY } = useScroll();

  const direction = useMotionValue(1);
  const lastY = useMotionValue(0);

  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 50,
    stiffness: 150,
  });

  const speed = useTransform(smoothVelocity, [-2000, 0, 2000], [40, 0, 40]);

  const smoothSpeed = useSpring(speed, {
    damping: 50,
    stiffness: 100,
  });

  const rotate = useMotionValue(0);
  const baseSpeed = 80;

  const [iconSet, setIconSet] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useAnimationFrame((t, delta) => {
    const currentY = scrollY.get();
    const previousY = lastY.get();

    if (currentY > previousY) {
      direction.set(1);
    } else if (currentY < previousY) {
      direction.set(-1);
    }

    lastY.set(currentY);

    const currentSpeed = smoothSpeed.get();

    const newRotate =
      rotate.get() +
      (baseSpeed + currentSpeed) * direction.get() * (delta / 1000);

    rotate.set(newRotate);

    if (Math.abs(newRotate) >= 360) {
      rotate.set(0);
      setIconSet((prev) => (prev === 0 ? 1 : 0));
      setFadeKey((prev) => prev + 1);
    }
  });

  const techIcons = iconSet === 0 ? techSet1 : techSet2;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex items-center justify-center md:min-h-[400px]"
    >
      <div className="relative w-[320px] h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={fadeKey}
            className="absolute inset-0"
            style={{ rotate }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {techIcons.map((Icon, i) => {
              const angle = (i / techIcons.length) * 360;
              const radius = 120;

              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `
                                rotate(${angle}deg)
                                translate(${radius}px)
                                rotate(-${angle}deg)
                                translate(-50%, -50%)
                              `,
                  }}
                >
                  <Icon size={40} stroke={1.5} className="text-primary" />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CENTER */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center text-sm uppercase backdrop-blur-md">
            Full Stack
          </div>
        </div>
      </div>
    </motion.div>
  );
}
