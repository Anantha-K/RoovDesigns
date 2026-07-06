"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("custom-cursor-enabled");

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    let ringX = mouseX;
    let ringY = mouseY;
    let ringW = 32;
    let ringH = 32;
    let ringRadius = 16;
    
    let targetRingX = mouseX;
    let targetRingY = mouseY;
    let targetRingW = 32;
    let targetRingH = 32;
    let targetRingRadius = 16;

    let dotScale = 1;
    let ringScale = 1;
    let rafId = 0;
    
    let isHidden = false;
    let isHovering = false;
    let isMagnetic = false;
    let currentText = "";

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;

      isHidden = !!target.closest(".cursor-none");
      isHovering = !!target.closest("a, button, input, textarea, select, [role='button'], .group\\/cta");

      const magneticEl = target.closest("[data-magnetic]") as HTMLElement | null;
      if (magneticEl) {
        isMagnetic = true;
        const rect = magneticEl.getBoundingClientRect();
        
        targetRingW = rect.width + 20;
        targetRingH = rect.height + 20;
        targetRingRadius = 9999; 

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        targetRingX = centerX + (mouseX - centerX) * 0.15;
        targetRingY = centerY + (mouseY - centerY) * 0.15;
      } else {
        isMagnetic = false;
        targetRingW = 32;
        targetRingH = 32;
        targetRingRadius = 16;
        targetRingX = mouseX;
        targetRingY = mouseY;
      }

      const textNode = target.closest("[data-cursor-text]");
      const newText = textNode ? textNode.getAttribute("data-cursor-text") || "" : "";
      if (newText !== currentText) {
        currentText = newText;
        if (cursorTextRef.current) {
          cursorTextRef.current.innerText = currentText;
          cursorTextRef.current.style.opacity = currentText ? "1" : "0";
          cursorTextRef.current.style.transform = currentText ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.5)";
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const loop = () => {
      ringX += (targetRingX - ringX) * (isMagnetic ? 0.25 : 0.15);
      ringY += (targetRingY - ringY) * (isMagnetic ? 0.25 : 0.15);
      ringW += (targetRingW - ringW) * 0.2;
      ringH += (targetRingH - ringH) * 0.2;
      ringRadius += (targetRingRadius - ringRadius) * 0.2;

      const hasText = currentText !== "";
      const targetRingScale = isHidden ? 0 : (hasText ? 2.8 : (isHovering && !isMagnetic ? 1.5 : 1));
      const targetDotScale = isHidden ? 0 : (hasText || isMagnetic ? 0 : (isHovering ? 0.5 : 1));
      
      ringScale += (targetRingScale - ringScale) * 0.15;
      dotScale += (targetDotScale - dotScale) * 0.2;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${dotScale})`;
      
      ring.style.width = `${ringW}px`;
      ring.style.height = `${ringH}px`;
      ring.style.borderRadius = `${ringRadius}px`;
      ring.style.transform = `translate(${ringX - ringW/2}px, ${ringY - ringH/2}px) scale(${ringScale})`;
      
      if (cursorTextRef.current) {
        cursorTextRef.current.style.left = `${ringX}px`;
        cursorTextRef.current.style.top = `${ringY}px`;
        
        ring.style.backgroundColor = hasText ? "rgba(255,255,255,1)" : "transparent";
        ring.style.mixBlendMode = hasText ? "normal" : "difference";
      }
      
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          body.custom-cursor-enabled, 
          body.custom-cursor-enabled * {
            cursor: none !important;
          }
        }
      `}} />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference -ml-[3px] -mt-[3px] transition-opacity duration-300 hidden md:block"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 border border-white/50 pointer-events-none z-[9999] mix-blend-difference transition-[opacity,background-color] duration-300 hidden md:flex items-center justify-center"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={cursorTextRef}
        className="fixed pointer-events-none z-[10000] text-[#0f0e11] font-mono text-[7px] uppercase tracking-[0.2em] font-bold text-center whitespace-nowrap transition-[opacity,transform] duration-300 hidden md:block"
        style={{ opacity: 0, transform: "translate(-50%, -50%) scale(0.5)", left: 0, top: 0 }}
      />
    </>
  );
}
