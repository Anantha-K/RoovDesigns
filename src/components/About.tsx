"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const text =
    "A space is more than walls—it is the canvas of your life. We shape luxurious realities by blending timeless aesthetics with modern function, creating environments that feel intimately yours.";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      gsap.to(".reveal-word", {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".main-image-inner",
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 15,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".accent-image-inner",
        { yPercent: 20, scale: 1.15 },
        {
          yPercent: -20,
          scale: 1.15, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#0f0e11] py-24 md:py-32 z-10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-8 items-center">

        <div className="w-full md:w-5/12 flex flex-col gap-10">
          <div className="w-full">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-white/50 border-b border-white/[0.12] pb-2">
              About The Studio
            </span>
          </div>

          <div className="w-full pr-4 md:pr-0">
            <p
              ref={textRef}
              className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.4] md:leading-[1.3] tracking-tight text-white"
            >
              {text.split(" ").map((word, index) => (
                <span key={index} className="inline-block overflow-hidden pb-1 -mb-1 mr-[0.25em]">
                  <span className="reveal-word inline-block opacity-20">
                    {word}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col md:block relative md:min-h-[80vh] gap-6 mt-8 md:mt-0">

          <div className="relative w-full aspect-[4/5] md:aspect-auto md:absolute md:right-0 md:top-[5%] md:w-[85%] md:h-[90%] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-black/5">
            <div className="main-image-inner w-full h-full relative origin-center">
              
              <Image 
                src="/P21.jpg" 
                alt="Luxury Interior Mobile" 
                fill 
                className="object-cover md:hidden"
                sizes="100vw"
              />
              
              <Image 
                src="/P21.jpg" 
                alt="Luxury Interior Living Room" 
                fill 
                className="object-cover hidden md:block"
                sizes="50vw"
              />
            </div>
          </div>

          <div className="hidden md:block absolute left-0 bottom-[10%] w-[45%] h-[50%] rounded-xl md:rounded-[1.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-8 border-[#0f0e11] bg-black/5 z-10">
            <div className="accent-image-inner w-full h-full relative origin-center scale-110">
              <Image 
                src="/P31.jpg" 
                alt="Architectural Marble Detail" 
                fill 
                className="object-cover"
                sizes="25vw"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
