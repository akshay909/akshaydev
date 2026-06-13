"use client";

import { createContext, useContext, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

type LenisContextType = Lenis | null;

const LenisContext = createContext<LenisContextType>(null);

export function LenisProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: Lenis | null;
}) {
  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}

export const useLenis = () => useContext(LenisContext);
