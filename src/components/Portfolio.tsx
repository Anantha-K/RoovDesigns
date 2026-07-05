"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";
import { projects } from "@/data/content";

const SLIDE_HEIGHT = 1.0;

export default function Portfolio() {
  const outerRef      = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const counterRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const outer  = outerRef.current!;
    const track  = trackRef.current!;
    const sticky = stickyRef.current!;

    const state = { targetX: 0, currentX: 0, locked: false };
    let rafId     = 0;
    let lockTimer = 0;

    const onScroll = () => {
      if (state.locked) return;
      const { top, height } = outer.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const progress   = Math.max(0, Math.min(1, -top / scrollable));
      state.targetX    = progress * (track.scrollWidth - window.innerWidth);
    };

    const onNavPreposition = (e: Event) => {
      const { targetScrollY } = (e as CustomEvent<{ targetScrollY: number }>).detail;
      const outerTop = outer.getBoundingClientRect().top + window.scrollY;
      const outerBot = outerTop + outer.offsetHeight;
      const maxX     = track.scrollWidth - window.innerWidth;

      if (targetScrollY <= outerTop) {
        state.targetX = 0; state.currentX = 0;
      } else {
        state.targetX = maxX; state.currentX = maxX;
      }

      if (targetScrollY > outerTop && window.scrollY < outerBot) {
        sticky.style.transition    = "opacity 0.15s ease";
        sticky.style.opacity       = "0";
        sticky.style.pointerEvents = "none";
        clearTimeout(lockTimer);
        lockTimer = window.setTimeout(() => {
          sticky.style.opacity       = "1";
          sticky.style.pointerEvents = "";
          state.locked = false;
        }, 1600);
      } else {
        clearTimeout(lockTimer);
        lockTimer = window.setTimeout(() => { state.locked = false; }, 1600);
      }
      state.locked = true;
    };

    const loop = () => {
      state.currentX += (state.targetX - state.currentX) * 0.055;
      track.style.transform = `translateX(${-state.currentX}px)`;

      const maxX     = Math.max(1, track.scrollWidth - window.innerWidth);
      const progress = state.currentX / maxX;
      if (progressRef.current) {
        progressRef.current.style.width = `${Math.min(100, progress * 100)}%`;
      }

      const idx = Math.min(
        projects.length - 1,
        Math.round(progress * (projects.length - 1))
      );
      if (counterRef.current) {
        counterRef.current.textContent =
          `${String(idx + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("nav:preposition", onNavPreposition);
    onScroll();
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("nav:preposition", onNavPreposition);
      cancelAnimationFrame(rafId);
      clearTimeout(lockTimer);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".port-eyebrow",
        { opacity: 0, y: -10 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: outerRef.current, start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const outerHeight = `${(projects.length * SLIDE_HEIGHT + 1) * 100}vh`;

  return (
    <div
      ref={outerRef}
      id="portfolio"
      className="relative w-full bg-[#0f0e11] portfolio-outer md:h-[var(--outer-height)]"
      style={{ "--outer-height": outerHeight } as React.CSSProperties}
    >
      
      <div ref={stickyRef} className="md:sticky md:top-0 w-full md:h-screen md:overflow-hidden pt-20 md:pt-0">

        <div className="md:absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 md:pt-[88px] pointer-events-none mb-6 md:mb-0">
          <span className="port-eyebrow inline-block text-xs font-mono uppercase tracking-[0.25em] text-white/50 border-b border-white/[0.12] pb-2">
            Selected Works
          </span>
          <span
            ref={counterRef}
            className="port-eyebrow hidden md:block font-mono text-[9px] uppercase tracking-[0.3em] text-white/30"
          >
            01 / 03
          </span>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:h-full md:will-change-transform px-6 md:px-0 pb-32 md:pb-0 portfolio-track"
          style={{ "--track-width": `${projects.length * 100}vw` } as React.CSSProperties}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="sticky top-[var(--stack-top)] md:top-auto md:relative w-full md:w-screen md:h-full flex items-start md:items-center justify-center md:px-12 md:pt-[120px] md:pb-14 md:shrink-0 pb-[30vh] md:pb-0"
              style={{ "--stack-top": `calc(12vh + ${i * 12}px)` } as React.CSSProperties}
            >
              
              <Link 
                href={`/portfolio/${project.id}`}
                data-cursor-text="View Project"
                className="group relative w-full h-[65vh] md:max-w-[1200px] md:h-[75vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] md:shadow-2xl block"
              >

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover md:scale-[1.04] md:group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
                  priority={i < 2}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

                <div
                  aria-hidden
                  className="absolute -right-[2vw] -top-[4vh] select-none pointer-events-none font-display font-bold text-white leading-none hidden md:block"
                  style={{ fontSize: "28vw", opacity: 0.035 }}
                >
                  {String(project.id).padStart(2, "0")}
                </div>

                <div className="absolute top-6 md:top-10 left-6 md:left-12 right-6 md:right-12 z-10 flex items-center justify-between">
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.38em] text-white/45 border border-white/[0.12] rounded-full px-3 py-1">
                    {project.tag}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 hidden md:block">
                    {project.year}
                  </span>
                </div>

                <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 z-10 flex items-end justify-between gap-6">
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.32em] text-white/45 mb-2 md:mb-4">
                      {String(project.id).padStart(2, "0")} — {project.location}
                    </p>
                    <h3
                      className="font-display text-white tracking-tighter leading-[0.88]"
                      style={{ fontSize: "clamp(2.8rem, 12vw, 7rem)" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl md:rounded-[2.5rem] ring-1 ring-white/[0.06] pointer-events-none" />
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden md:block absolute bottom-6 left-12 right-12 z-30 pointer-events-none">
          <div className="relative h-px bg-white/[0.08]">
            <div
              ref={progressRef}
              className="absolute left-0 top-0 h-full bg-white/40"
              style={{ width: "0%", transition: "none" }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
