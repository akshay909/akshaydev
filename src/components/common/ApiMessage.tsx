"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { removeMessage } from "@/redux/slices/messageSlice";
import { IconCircleCheck, IconCircleX, IconX } from "@tabler/icons-react";

type Props = {
  id: string;
  message: string;
  status: "success" | "error";
};

export default function ApiMessage({ id, message, status }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeMessage(id));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  const handleDismiss = () => {
    dispatch(removeMessage(id));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        relative flex items-start gap-3 px-5 py-3 overflow-hidden rounded-lg shadow-lg
        backdrop-blur-sm border
        ${
          status === "success"
            ? "bg-green-800/95 border-emerald-400/20"
            : "bg-red-600 border-rose-400/20"
        }
      `}
    >
      <div className="flex-shrink-0 mt-0.5">
        {status === "success" ? (
          <IconCircleCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
        ) : (
          <IconCircleX className="w-5 h-5 text-white" strokeWidth={2.5} />
        )}
      </div>

      <p className="flex-1 text-white text-sm font-medium leading-relaxed pr-2">
        {message}
      </p>

      <button 
        onClick={handleDismiss}
        className="flex-shrink-0 -mt-0.5 -mr-1 p-1 rounded-lg 
                   hover:bg-white/20 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-white/40"
        aria-label="Dismiss notification"
      >
        <IconX className="w-4 h-4 text-white" strokeWidth={2.5} />
      </button>

      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 3, ease: "linear" }}
        className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white rounded-b-2xl origin-left"
      />
    </motion.div>
  );
}