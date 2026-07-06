"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const trackRef1 = useRef<HTMLDivElement>(null);
  const trackRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track1 = trackRef1.current;
    const track2 = trackRef2.current;
    if (!track1 || !track2) return;

    const tlIn = gsap.timeline({ delay: 0.1 });

    tlIn.fromTo(
      ".h-word",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 }
    );
    tlIn.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.8"
    );
    tlIn.fromTo(
      ".h-gallery-item",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
      0
    );

    const panTween1 = gsap.to(track1, {
      yPercent: -50,
      ease: "none",
      duration: 40, 
      repeat: -1,
    });

    const panTween2 = gsap.fromTo(track2, 
      { yPercent: -50 },
      {
        yPercent: 0,
        ease: "none",
        duration: 40, 
        repeat: -1,
      }
    );

    return () => {
      tlIn.kill();
      panTween1.kill();
      panTween2.kill();
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen bg-[#0f0e11] overflow-hidden flex items-center justify-center">

      {/* Background Scrolling Galleries */}
      <div className="absolute inset-0 w-full h-full flex gap-4 opacity-40 pointer-events-none z-0">
        <div className="w-1/2 h-full overflow-hidden relative">
          <div ref={trackRef1} className="flex flex-col gap-4 will-change-transform pt-4">
            {INFINITE_GALLERY.map((src, i) => (
              <div key={`col1-${i}`} className="h-gallery-item relative w-full h-[30vh] md:h-[45vh] shrink-0 rounded-xl overflow-hidden">
                <Image src={src} alt="Roov Designs Gallery" fill priority={i < 2} className="object-cover grayscale brightness-75" sizes="50vw" />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 h-full overflow-hidden relative">
          <div ref={trackRef2} className="flex flex-col gap-4 will-change-transform pt-4">
            {[...INFINITE_GALLERY].reverse().map((src, i) => (
              <div key={`col2-${i}`} className="h-gallery-item relative w-full h-[30vh] md:h-[45vh] shrink-0 rounded-xl overflow-hidden">
                <Image src={src} alt="Roov Designs Gallery" fill priority={i < 2} className="object-cover grayscale brightness-75" sizes="50vw" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vignette Overlay for Cinematic Immersion */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f0e11_90%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-6 md:px-12 pointer-events-none pt-12 md:pt-20">
        <div className="w-full max-w-[1400px] flex flex-col items-center justify-center">
          <h1
            className="font-display font-light leading-[0.95] md:leading-[0.85] tracking-tighter text-white uppercase w-full flex flex-col"
            style={{ fontSize: "clamp(3.2rem, 10vw, 12rem)" }}
          >
            <div className="relative z-0 overflow-visible w-full text-center">
              <div className="h-word bg-gradient-to-b from-white to-white/40 text-transparent bg-clip-text">
                LET'S <br className="md:hidden" />
                <span className="italic">BUILD YOUR</span>
              </div>
            </div>
            <div className="relative z-10 overflow-visible w-full -mt-2 md:-mt-6 text-center">
              <div className="h-word drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
                <span className="font-medium text-[#7c3aed]">DREAM</span> <br className="md:hidden" />
                <span className="italic text-white">TOGETHER.</span>
              </div>
            </div>
          </h1>
          
          <div className="hero-cta mt-12 md:mt-24 w-full flex justify-center pointer-events-auto">
            <Link 
              href="#contact" 
              data-magnetic
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-10 py-5 text-sm font-bold tracking-widest text-white uppercase backdrop-blur-md transition-all duration-500 hover:border-[#7c3aed] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#9333ea] to-[#4c1d95] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-3">
                Let's Collaborate 
                <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
