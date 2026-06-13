"use client";

import { motion } from "framer-motion";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconCode,
  IconTerminal2,
} from "@tabler/icons-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col items-center justify-center gap-6">
      <motion.div className="flex gap-6 text-primary">
        <IconBrandReact size={40} stroke={1} />
        <IconBrandNextjs size={40} stroke={1} />
        <IconCode size={40} stroke={1} />
        <IconTerminal2 size={40} stroke={1} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="dark:text-white text-black text-sm tracking-widest uppercase"
      >
        Initializing Developer Mode...
      </motion.h2>

      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="flex gap-2"
      >
        <span className="w-1 h-1 bg-primary rounded-full"></span>
        <span className="w-1 h-1 bg-primary rounded-full"></span>
        <span className="w-1 h-1 bg-primary rounded-full"></span>
      </motion.div>
    </div>
  );
}
