"use client";

import React, { useEffect, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesList } from "@/data/content";
import { notFound } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const service = servicesList.find((s) => s.id === parseInt(id));
  
  const rightPanelRef = useRef<HTMLDivElement>(null);

  if (!service) {
    notFound();
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      
      gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%", 
              toggleActions: "play none none reverse", 
            },
          }
        );
      });

      gsap.to(".service-hero-img", {
        scale: 1.05,
        duration: 20,
        ease: "none",
        yoyo: true,
        repeat: -1
      });
    }, rightPanelRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0f0e11] text-white flex flex-col">
      <main className="flex-grow flex flex-col lg:flex-row w-full min-h-screen relative">

        <div className="lg:w-1/2 w-full lg:h-screen h-[60vh] lg:sticky lg:top-0 relative overflow-hidden bg-black z-40">



          <Image
            src={service.image}
            alt={service.title}
            fill
            className="service-hero-img object-cover opacity-80 pointer-events-none"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0f0e11]/90 hidden lg:block pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0e11] block lg:hidden pointer-events-none" />

          <div 
            className="absolute -bottom-[5vh] lg:-bottom-[10vh] left-0 md:left-12 font-display font-bold text-white select-none pointer-events-none drop-shadow-2xl mix-blend-overlay"
            style={{ fontSize: "clamp(12rem, 35vw, 35rem)", opacity: 0.15, lineHeight: 0.8 }}
          >
            {service.number}
          </div>
        </div>

        <div ref={rightPanelRef} className="lg:w-1/2 w-full min-h-screen flex flex-col px-6 md:px-16 lg:px-24 py-24 md:py-32 lg:py-[20vh] z-10 relative">
          
          <div className="max-w-2xl">
            
            <div className="mb-12">
              <a 
                href="/#services" 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-md text-white hover:text-[#0f0e11] hover:bg-white hover:border-white transition-all duration-300 group font-mono text-xs uppercase tracking-[0.15em] shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.15)]"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Services</span>
              </a>
            </div>

            <div className="reveal-item flex items-center gap-6 mb-8">
              <span className="font-mono text-xl md:text-2xl text-royal-purple">{service.number}</span>
              <span className="h-px w-12 bg-white/20" />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50">{service.tag}</span>
            </div>

            <h1 className="reveal-item font-display text-[clamp(3.5rem,6vw,7rem)] leading-[0.9] tracking-tighter mb-12">
              {service.title}
            </h1>

            <div className="reveal-item h-px w-full bg-gradient-to-r from-white/20 to-transparent my-12" />

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="reveal-item text-2xl md:text-4xl font-light leading-[1.4] text-white/90 mb-12">
                {service.description}
              </p>
              
              <p className="reveal-item text-lg md:text-xl text-white/60 leading-[1.8] font-light mb-16">
                {service.longDescription}
              </p>
            </div>

            <div className="reveal-item mt-12 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-10 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="font-display text-6xl md:text-8xl text-white mb-4 tracking-tighter">
                  {service.stat}
                </div>
                <div className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-royal-purple-light">
                  {service.statLabel}
                </div>
              </div>
            </div>

            <div className="h-32 lg:h-[20vh]" />
          </div>
          
        </div>
      </main>

      <div className="w-full relative z-20 bg-[#0f0e11]">
        <Footer />
      </div>
    </div>
  );
}
