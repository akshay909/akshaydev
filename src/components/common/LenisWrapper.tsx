"use client";

import { useEffect, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import { LenisProvider } from "@/components/LenisContext"; // apna path

export default function LenisWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/adminkgr")) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      lerp: 0.1,
    });

    const animate = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, [pathname]);

  return (
    <LenisProvider value={lenis}>
      
      {children}
    </LenisProvider>
  );
}
