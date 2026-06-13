"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";

type ButtonVariant = "primary" | "sec" | "buttonicon";

interface ButtonProps {
  name: string;
  variant: ButtonVariant;
  onClick?: () => void;
  className?: string;
  link?: string;
  blank?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string; 
}

export default function Button({
  name,
  variant,
  onClick,
  className = "",
  link,
  blank,
  type = "button",
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const base =
    "font-medium w-fit rounded-md text-sm transition-all duration-300 flex items-center gap-3 justify-between hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary";

  const styles = {
    primary: "px-1 py-1 bg-primary text-white hover:border-primary",
    sec: "px-1 py-1 bg-white text-black hover:border-primary",
    buttonicon: "px-6 py-1 bg-white text-black",
  };

  const content = (
    <>
      <span className={variant !== "buttonicon" ? "ps-3" : "block"}>
        {name}
      </span>

      {variant !== "buttonicon" && (
        <div
          className={`h-8 w-8 flex justify-center items-center p-1 rounded-md ${
            variant === "primary" ? "bg-white" : "bg-primary"
          }`}
        >
          <IconArrowNarrowRight
            size={16}
            aria-hidden="true" 
            className={variant === "primary" ? "text-primary" : "text-white"}
          />
        </div>
      )}
    </>
  );

  if (link) {
    return (
      <Link
        href={link}
        target={blank ? "_blank" : "_self"}
        rel={blank ? "noopener noreferrer" : undefined} 
        aria-label={ariaLabel || name}
        className={`${base} ${styles[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || name} 
      className={`${base} ${styles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {content}
    </button>
  );
}
