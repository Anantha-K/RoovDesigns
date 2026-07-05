"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const GALLERY_SRCS = [
  "/P1.jpg",
  "/P21.jpg",
  "/P31.jpg",
  "/P3.jpg",
  "/P22.jpg",
  "/P32.jpg",
  "/P5.jpg",
  "/P33.jpg",
  "/P34.jpg",
];

const INFINITE_GALLERY = [...GALLERY_SRCS, ...GALLERY_SRCS];

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tlIn = gsap.timeline({ delay: 0.1 });

    tlIn.fromTo(
      ".h-word",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 }
    );
    tlIn.fromTo(
      ".h-gallery-item",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", stagger: 0.1 },
      0
    );

    const panTween = gsap.to(track, {
      yPercent: -50,
      ease: "none",
      duration: 35, 
      repeat: -1,
    });

    return () => {
      tlIn.kill();
      panTween.kill();
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen bg-[#0f0e11] overflow-hidden flex md:flex-row">

      <div className="relative w-full md:w-[55%] h-full flex flex-col justify-center p-6 md:p-10 lg:p-16 z-20 bg-transparent md:bg-[#0f0e11] md:border-r border-white/10 pointer-events-none">

        <div className="w-full">
          <h1
            className="font-display leading-[0.85] tracking-tighter text-white uppercase"
            style={{ fontSize: "clamp(3.5rem, 6.5vw, 8rem)" }}
          >
            <div className="overflow-hidden pb-2"><div className="h-word whitespace-nowrap">LET'S</div></div>
            <div className="overflow-hidden pb-2 pl-4 md:pl-6 lg:pl-10"><div className="h-word whitespace-nowrap italic font-light text-white/70">BUILD YOUR</div></div>
            <div className="overflow-hidden pb-2 mt-4 md:mt-8"><div className="h-word whitespace-nowrap">DREAM</div></div>
            <div className="overflow-hidden pb-2 pl-4 md:pl-6 lg:pl-10"><div className="h-word whitespace-nowrap italic font-light text-white/70">TOGETHER.</div></div>
          </h1>
        </div>

      </div>

      <div className="absolute md:relative inset-0 md:inset-auto w-full md:w-[45%] h-full overflow-hidden bg-black z-0 pointer-events-none md:pointer-events-auto">

        <div className="absolute inset-0 bg-[#0f0e11]/75 z-10 md:hidden pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0f0e11] to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0e11] to-transparent z-10 pointer-events-none hidden md:block" />

        <div ref={trackRef} className="flex flex-col gap-6 md:gap-10 p-6 md:p-10 will-change-transform">
          {INFINITE_GALLERY.map((src, i) => (
            <div
              key={i}
              className="h-gallery-item relative w-full h-[40vh] md:h-[45vh] shrink-0 rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={src}
                alt="Roov Designs Gallery"
                fill
                priority={i < 2} 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-xl pointer-events-none" />
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
