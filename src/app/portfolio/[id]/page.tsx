"use client";

import React, { useEffect, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/content";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function PortfolioProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((p) => p.id === parseInt(id));

  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  if (!project) {
    notFound();
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      gsap.to(imageRef.current, {
        y: "25%", 
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(titleRef.current, {
        y: -150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".reveal-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".reveal-image",
        { scale: 0.95, opacity: 0, y: 80 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 60%",
          },
        }
      );

      ScrollTrigger.matchMedia({
        
        "(min-width: 768px)": function () {
          gsap.utils.toArray(".editorial-block").forEach((block: any) => {
            
            gsap.fromTo(
              block,
              { scale: 0.9, opacity: 0.3 },
              {
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: block,
                  start: "top 85%",
                  end: "top 45%",
                  scrub: true,
                },
              }
            );
            
            gsap.to(block, {
              scale: 0.9,
              opacity: 0.3,
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top 20%",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        },
        
        "(max-width: 767px)": function () {
          gsap.utils.toArray(".editorial-block").forEach((block: any) => {
            gsap.fromTo(
              block,
              { opacity: 0.2, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: block,
                  start: "top 85%",
                },
              }
            );
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0e11] text-white flex flex-col">
      <main className="flex-grow">

        <section ref={heroRef} className="relative w-full h-screen overflow-hidden">

          <div className="absolute top-8 md:top-12 left-6 md:left-12 z-50">
            <Link 
              href="/#portfolio" 
              className="inline-flex items-center gap-4 text-white hover:text-white transition-all group backdrop-blur-md bg-black/20 px-6 py-3 rounded-full border border-white/10 hover:bg-black/40 hover:border-white/30"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Back to Projects</span>
            </Link>
          </div>

          <div className="absolute inset-0 -top-[10%] h-[120%] w-full">
            <Image
              ref={imageRef}
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[#0f0e11] pointer-events-none" />

          <div 
            ref={titleRef} 
            className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-16 md:pb-24 z-10 flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <div className="flex-1">
              <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-white/60 mb-6 drop-shadow-lg">
                {project.location}
              </p>
              <h1 
                className="font-display text-[clamp(4rem,10vw,12rem)] leading-[0.85] tracking-tighter text-white drop-shadow-2xl"
              >
                {project.title}
              </h1>
            </div>

            <div className="md:max-w-xs shrink-0 backdrop-blur-xl bg-white/[0.03] p-8 rounded-3xl border border-white/10 shadow-2xl">
              <ul className="space-y-6">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Spec 0{idx + 1}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-white">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section ref={contentRef} className="w-full bg-[#0f0e11] px-6 md:px-12 py-24 md:py-48 relative z-20">

          <div className="max-w-5xl mx-auto mb-24 md:mb-32 px-6 md:px-0">
            <h2 className="reveal-text font-display font-light text-2xl md:text-4xl lg:text-5xl leading-[1.3] md:leading-[1.2] tracking-tight text-white/90">
              {project.description}
            </h2>
          </div>

          {project.editorial && (
            <div className="max-w-5xl mx-auto mb-32 md:mb-48 space-y-16 md:space-y-24 px-6 md:px-0">
              
              {project.editorial.map((section, idx) => (
                <div key={idx} className="editorial-block grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 origin-center will-change-transform">
                  <div className="md:col-span-4">
                    <h3 className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-white/50 border-t border-white/10 pt-4">
                      0{idx + 1} 
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="font-light text-lg md:text-xl leading-[1.8] text-white/80 pt-2 md:pt-4">
                      {section.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-6 md:gap-12 w-full mx-auto">
            
            {project.gallery[1] && (
              <div className="reveal-image relative w-full h-[50vh] md:h-[85vh] rounded-[2rem] overflow-hidden">
                <Image src={project.gallery[1]} alt={`${project.title} Gallery 1`} fill sizes="100vw" className="object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out" />
                <div className="absolute inset-0 ring-1 ring-white/10 rounded-[2rem] pointer-events-none" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {project.gallery[2] && (
                <div className="reveal-image relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden">
                  <Image src={project.gallery[2]} alt={`${project.title} Gallery 2`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out" />
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-[2rem] pointer-events-none" />
                </div>
              )}
              {project.gallery[3] && (
                <div className="reveal-image relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden">
                  <Image src={project.gallery[3]} alt={`${project.title} Gallery 3`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out" />
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-[2rem] pointer-events-none" />
                </div>
              )}
            </div>

            {project.gallery[4] && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mt-12 md:mt-24">
                <div className="md:col-span-4 md:col-start-2 reveal-text order-2 md:order-1 px-6 md:px-0 text-center md:text-left">
                  <p className="font-display text-2xl md:text-4xl leading-[1.1] text-white/90">
                    "Every detail was meticulously crafted to ensure the architecture speaks softly, yet profoundly."
                  </p>
                </div>
                <div className="md:col-span-6 md:col-start-7 reveal-image relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden order-1 md:order-2">
                  <Image src={project.gallery[4]} alt={`${project.title} Gallery 4`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out" />
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-[2rem] pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
