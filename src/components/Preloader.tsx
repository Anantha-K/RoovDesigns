"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    const hasLoaded = sessionStorage.getItem("roov-preloaded");
    if (hasLoaded) {
      setShow(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("roov-preloaded", "true");
        document.body.style.overflow = "";
        setShow(false);
      },
    });

    tl.to(lineRef.current, {
      scaleY: 1,
      duration: 0.6,
      ease: "power3.inOut",
    });

    tl.to(
      [textRef.current, counterRef.current],
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.3"
    );

    const counterObj = { val: 0 };
    tl.to(
      counterObj,
      {
        val: 100,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = String(Math.round(counterObj.val)).padStart(3, '0');
          }
        },
      },
      "-=0.2"
    );

    tl.to(
      [textRef.current, counterRef.current, lineRef.current],
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      },
      "+=0.15"
    );

    tl.to(
      containerRef.current,
      {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.2"
    );

  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#0a090c] flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        
        <div
          ref={lineRef}
          className="absolute top-0 bottom-0 w-[1px] bg-white/[0.15] scale-y-0 origin-bottom"
        />

        <div
          ref={textRef}
          className="font-serif text-white tracking-[0.3em] uppercase text-2xl md:text-4xl opacity-0 translate-y-4 mix-blend-difference z-10"
        >
          Roov
        </div>

        <div
          ref={counterRef}
          className="absolute bottom-12 md:bottom-24 font-mono text-[10px] md:text-xs text-white/50 tracking-[0.4em] opacity-0 translate-y-4"
        >
          000
        </div>
      </div>
    </div>
  );
}
