"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header span",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        ".contact-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );

      gsap.fromTo(
        ".contact-card",
        {
          scale: 0.82,
          borderRadius: "6rem",
          opacity: 0.6,
        },
        {
          scale: 1,
          borderRadius: "3.5rem",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0f0e11] flex flex-col justify-center py-6 md:py-12 z-10 overflow-hidden"
    >
      
      <div className="contact-card relative w-[95%] max-w-[1300px] mx-auto min-h-[85vh] bg-[#230f4d] text-white rounded-[3.5rem] px-8 md:px-16 py-16 md:py-24 flex flex-col justify-center gap-16 md:gap-24 overflow-hidden shadow-2xl origin-center">
        
        <div
          className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full opacity-20 blur-[100px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
          }}
        />

        <div className="w-full relative z-10">
          <div className="mb-6 contact-reveal">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-white/50 border-b border-white/[0.12] pb-2">
              Start a Project
            </span>
          </div>
          <h2 className="contact-header font-display font-bold text-5xl sm:text-7xl md:text-[9vw] leading-[0.9] tracking-tight uppercase flex flex-col overflow-hidden">
            <span className="inline-block text-white">Let's build</span>
            <span className="inline-block text-white/40">Something</span>
            <span className="inline-block text-white">Beautiful.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 relative z-10">
          <div className="md:col-span-7 flex flex-col gap-10">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-8 contact-reveal"
            >
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60">
                  01 
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b border-white/[0.2] text-lg md:text-2xl py-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/[0.3] text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60">
                  02 
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b border-white/[0.2] text-lg md:text-2xl py-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/[0.3] text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60">
                  03 
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I'm looking to redesign my..."
                  rows={3}
                  className="w-full bg-transparent border-b border-white/[0.2] text-lg md:text-2xl py-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/[0.3] text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-fit flex items-center gap-4 px-8 py-4 rounded-full bg-white text-royal-purple hover:bg-[#0f0e11] hover:text-white transition-colors duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono">
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </span>
                {!isSubmitting && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              {submitStatus === "success" && (
                <p className="text-green-400 font-mono text-sm mt-2">
                  Message sent successfully! We'll be in touch soon.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 font-mono text-sm mt-2">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>

          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-12 contact-reveal">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60">
                Studio
              </span>
              <p className="text-sm md:text-base font-light text-white max-w-[200px] leading-relaxed">
                Angamaly,
                <br />
                Eranakulam,
                <br />
                Kerala, India
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-8 border-t border-white/[0.15]">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60">
                Response Time
              </span>
              <p className="text-sm md:text-base font-light text-white max-w-[250px] leading-relaxed">
                We review every inquiry carefully and typically respond within
                24-48 business hours.
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-8 border-t border-white/[0.15]">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/60">
                Working Hours
              </span>
              <p className="text-sm md:text-base font-light text-white max-w-[200px] leading-relaxed">
                Monday — Friday
                <br />
                10:00 AM — 6:00 PM IST
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
