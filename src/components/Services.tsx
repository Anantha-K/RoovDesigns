"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "next/link";
import { servicesList } from "@/data/content";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      gsap.fromTo(
        ".srv-eyebrow",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".srv-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power4.inOut",
          stagger: 0.14,
          scrollTrigger: { trigger: ".srv-list", start: "top 72%" },
        }
      );

      gsap.fromTo(
        ".srv-row",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".srv-list", start: "top 72%" },
        }
      );

      ScrollTrigger.matchMedia({
        "(max-width: 767px)": function () {
          gsap.utils.toArray(".srv-row").forEach((row: any, i) => {
            ScrollTrigger.create({
              trigger: row,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => setActive(servicesList[i].id),
              onEnterBack: () => setActive(servicesList[i].id),
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-[#0f0e11] pt-24 md:pt-36 pb-32 md:pb-48 overflow-hidden z-10"
    >
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-royal-purple/[0.05] blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-14">

        <div className="mb-16 md:mb-24">
          <span className="srv-eyebrow inline-block text-xs font-mono uppercase tracking-[0.25em] text-white/50 border-b border-white/[0.12] pb-2">
            Our Expertise
          </span>
        </div>

        <div className="srv-list relative">

          <div
            aria-hidden
            className="absolute -right-10 top-0 pointer-events-none select-none font-display font-bold text-white leading-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              fontSize: "clamp(14rem, 28vw, 28rem)",
              opacity: active ? 0.028 : 0,
              transform: active ? "translateY(-8%)" : "translateY(4%)",
            }}
          >
            {active ? String(active).padStart(2, "0") : "01"}
          </div>

          {servicesList.map((service) => (
            <div key={service.id} className="relative">
              
              <div className="srv-divider w-full h-px bg-white/[0.1] origin-left" />

              <Link
                href={`/services/${service.id}`}
                data-cursor-text="View Details"
                className="srv-row group cursor-pointer py-8 md:py-10 block"
                onMouseEnter={() => setActive(service.id)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="grid grid-cols-12 gap-x-6 items-start">

                  <div className="col-span-12 md:col-span-1 pt-[0.55em] mb-2 md:mb-0">
                    <span
                      className={`font-mono text-[11px] tracking-[0.35em] transition-colors duration-500 ${active === service.id ? 'text-royal-purple' : 'text-royal-purple md:text-white/22'}`}
                    >
                      {service.number}
                    </span>
                  </div>

                  <div className="col-span-12 md:col-span-7">
                    <h3
                      className={`font-display text-[clamp(2.6rem,5.5vw,5.2rem)] leading-[0.9] tracking-[-0.035em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${active === service.id ? 'text-white translate-x-0 md:translate-x-2' : 'text-white md:text-white/45 translate-x-0'}`}
                    >
                      {service.title}
                    </h3>

                    <div
                      className="grid"
                      style={{
                        gridTemplateRows: active === service.id ? "1fr" : "0fr",
                        transition: "grid-template-rows 600ms cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      <div style={{ overflow: "hidden", minHeight: 0 }}>
                        <p className="text-white/60 md:text-white/40 text-sm md:text-[15px] leading-[1.6] md:leading-[1.8] max-w-[500px] font-light mt-4 md:mt-5 mb-4 md:mb-5">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-3 group/cta mb-1">
                          <span className="block h-px w-6 bg-royal-purple-light transition-all duration-500 group-hover/cta:w-12" />
                          <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 md:text-white/35 group-hover/cta:text-white/60 uppercase transition-colors duration-300">
                            Explore
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="hidden md:flex col-span-2 flex-col items-start pt-[0.55em] transition-all duration-500"
                    style={{ opacity: active === service.id ? 1 : 0, transform: active === service.id ? "translateY(0)" : "translateY(6px)" }}
                  >
                    <span className="font-display text-[2.5rem] text-white/[0.12] leading-none tracking-tight">
                      {service.stat}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.25em] text-white/20 uppercase mt-1 leading-tight">
                      {service.statLabel}
                    </span>
                  </div>

                  <div className="hidden md:flex col-span-2 items-start justify-end pt-[0.7em]">
                    <span
                      className="font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-500"
                      style={{ color: active === service.id ? "rgba(124,58,237,0.7)" : "rgba(255,255,255,0.15)" }}
                    >
                      {service.tag}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          <div className="srv-divider w-full h-px bg-white/[0.1] origin-left" />
        </div>
      </div>
    </section>
  );
}
