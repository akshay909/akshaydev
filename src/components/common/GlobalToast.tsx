"use client";

import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import ApiMessage from "./ApiMessage";

export default function GlobalToast() {
  const toasts = useAppSelector((state) => state.message.toasts);

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ApiMessage
            key={toast.id}
            id={toast.id}
            message={toast.message}
            status={toast.status}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}