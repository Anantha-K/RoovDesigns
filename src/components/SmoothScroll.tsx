"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

function LenisScrollTriggerBridge() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const handlePopState = () => {
      
      window.sessionStorage.setItem("isPopState", "true");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const isPop = window.sessionStorage.getItem("isPopState") === "true";
    if (isPop) {
      window.sessionStorage.removeItem("isPopState");
    } else {
      const hash = window.location.hash;
      if (hash) {
        // If navigating to a page with a hash, give React a tiny moment to mount, then jump to the hash
        setTimeout(() => {
          const target = document.querySelector(hash) as HTMLElement | null;
          if (target && lenis) {
            lenis.scrollTo(target, { immediate: true });
          }
        }, 100);
      } else {
        // Normal navigation: reset to top
        window.scrollTo(0, 0);
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }
      }
    }
  }, [pathname, lenis]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.06,
        duration: 1.8,
        smoothWheel: true,
        autoRaf: false,
      }}
    >
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
