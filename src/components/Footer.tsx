"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLHeadingElement>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-divider",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        },
      );

      gsap.fromTo(
        ".footer-divider-pulse",
        { y: "-100%" },
        {
          y: "400%",
          duration: 4,
          repeat: -1,
          ease: "none",
          stagger: 0.8,
        },
      );

      gsap.fromTo(
        ".footer-tagline-word",
        { y: "105%" },
        {
          y: "0%",
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".footer-bullet",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 80%" },
        },
      );

      gsap.fromTo(
        ".footer-link-col",
        { y: 40, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 75%" },
        },
      );

      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function () {
          gsap.fromTo(
            brandTextRef.current,
            { letterSpacing: "-0.08em", opacity: 0.03, y: 120, scale: 0.95 },
            {
              letterSpacing: "0.18em",
              opacity: 0.05,
              y: 40,
              scale: 1,
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 95%",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        },
        "(max-width: 767px)": function () {
          gsap.fromTo(
            brandTextRef.current,
            { letterSpacing: "-0.02em", opacity: 0.03, y: 80, scale: 0.95 },
            {
              letterSpacing: "0.08em",
              opacity: 0.05,
              y: 0, 
              scale: 1,
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 95%",
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const taglineWords = ["Designing", "spaces", "that", "inspire."];

  return (
    <footer
      ref={footerRef}
      className="relative w-full flex flex-col justify-between bg-[#0f0e11] border-t border-white/[0.05] pt-24 md:pt-28 overflow-hidden z-10"
    >
      
      <div
        className="absolute -bottom-[20%] left-[50%] -translate-x-1/2 w-[75%] h-[60%] rounded-full opacity-30 blur-[130px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none px-6 md:px-8">
        <div className="relative w-full h-full">
          <div className="hidden md:block absolute left-2/4 top-0 bottom-0 w-[1px] bg-white/[0.05] footer-divider overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-royal-purple-light/50 to-transparent footer-divider-pulse" />
          </div>
          <div className="hidden md:block absolute left-3/4 top-0 bottom-0 w-[1px] bg-white/[0.05] footer-divider overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-royal-purple-light/50 to-transparent footer-divider-pulse" />
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-8 relative z-10 flex flex-col justify-center gap-16 md:gap-24 flex-grow">
        
        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/[0.05] pb-12 md:pb-16 gap-y-8 md:gap-y-0 relative">
          <div className="md:col-span-2 pr-0 md:pr-12">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05] uppercase">
              {taglineWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-3">
                  <span className="inline-block footer-tagline-word">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          <div className="md:pl-12 pt-4 md:pt-0 footer-bullet">
            <div className="text-[10px] font-mono tracking-[0.25em] text-white/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-purple-light animate-pulse" />
              roov.designs26@gmail.com
            </div>
          </div>

          <div className="md:pl-12 pt-4 md:pt-0 footer-bullet">
            <div className="text-[10px] font-mono tracking-[0.25em] text-white/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-purple-light" />
              EST. 2026
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 pb-8 relative"
          style={{ perspective: "1000px" }}
        >
          <div className="flex flex-col gap-4 font-mono text-xs tracking-[0.25em] text-white/50 uppercase font-medium footer-link-col">
            <a
              href="#about"
              className="hover:text-white transition-colors duration-300 block w-fit"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-white transition-colors duration-300 block w-fit"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:text-white transition-colors duration-300 block w-fit"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors duration-300 block w-fit"
            >
              Contact
            </a>
          </div>

          <div className="hidden md:block md:pl-12 footer-link-col" />

          <div className="md:pl-12 footer-link-col">
            <div className="flex flex-col gap-4 font-mono text-xs tracking-[0.25em] text-white/50 uppercase">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300 block w-fit"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300 block w-fit"
              >
                LinkedIn
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300 block w-fit"
              >
                Pinterest
              </a>
            </div>
          </div>

          <div className="hidden md:block md:pl-12 footer-link-col" />
        </div>
      </div>

      <div className="w-full relative z-10 flex flex-col justify-end">
        <div className="relative w-full select-none pointer-events-none overflow-hidden px-6 md:px-8">
          <h2
            ref={brandTextRef}
            className="font-serif font-normal text-[24vw] leading-[0.68] text-center tracking-tight uppercase"
            style={{
              color: "#ffffff",
              willChange: "transform, letter-spacing",
            }}
          >
            Roov
          </h2>
        </div>

        <div className="w-full bg-[#0a090c] border-t border-white/[0.05] py-5 md:py-3 px-6 md:px-8 relative z-20 -mt-2 md:-mt-4">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-4 text-[9px] tracking-[0.2em] font-mono text-white/50 uppercase">
            <div className="flex-1 text-center sm:text-left w-full">
              &copy; {currentYear} ROOV DESIGNS. ALL RIGHTS RESERVED.
            </div>
            <div className="flex-1 text-center hidden sm:block w-full">
              SHAPING LUXURIOUS REALITIES
            </div>
            <div className="flex-1 text-center sm:text-right w-full mt-1 sm:mt-0">
              <button
                onClick={scrollToTop}
                className="hover:text-white transition-colors duration-300 focus:outline-none"
              >
                BACK TO TOP &uarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
