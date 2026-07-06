"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import Logo from "./Logo";

const links = [
  { label: "Home",      href: "home" },
  { label: "About",     href: "about" },
  { label: "Services",  href: "services" },
  { label: "Portfolio", href: "portfolio" },
  { label: "Contact",   href: "contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [visible,   setVisible]   = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setVisible(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={`
          fixed z-50 left-0 right-0 flex justify-center pointer-events-none
          transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${visible ? "translate-y-6" : "-translate-y-full"}
        `}
      >
      <header
        className="
          pointer-events-auto
          flex items-center justify-between 
          w-[92%] max-w-[1200px]
          px-6 py-3.5 
          rounded-2xl md:rounded-full 
          bg-[#0f0e11]/70 backdrop-blur-xl 
          border border-white/10 
          shadow-[0_8px_32px_rgba(0,0,0,0.6)]
        "
      >
        
        <div className="md:w-32">
          <Logo />
        </div>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={`#${href}`}
              onClick={(e) => handleScroll(e, href)}
              className="
                px-5 py-2 rounded-full
                text-[9px] font-medium uppercase tracking-[0.25em]
                text-white/60 hover:text-white hover:bg-white/5
                transition-all duration-300 cursor-pointer
              "
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="md:w-32 flex justify-end items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
            className="
              flex items-center gap-2 px-5 py-2 rounded-full
              text-[9px] font-medium uppercase tracking-[0.25em]
              text-royal-purple hover:text-white bg-royal-purple/10 hover:bg-royal-purple/40
              transition-all duration-300 cursor-pointer
            "
          >
            Inquire
          </a>

          <button 
            className="md:hidden flex flex-col gap-[5px] p-2 pointer-events-auto"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-6 h-[1px] bg-white"></span>
            <span className="w-6 h-[1px] bg-white"></span>
          </button>
        </div>
      </header>

      </div>

      <div 
        className={`
          fixed inset-0 z-[100] bg-[#0a090c] flex flex-col justify-center px-10
          transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto
          ${menuOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <button 
          onClick={() => setMenuOpen(false)} 
          className="absolute top-10 right-8 text-white/50 hover:text-white uppercase font-mono text-[10px] tracking-[0.2em] p-2"
        >
          Close [X]
        </button>
        
        <div className="flex flex-col gap-8">
          {links.map(({ label, href }, i) => (
             <div key={label} className="overflow-hidden">
               <a
                 href={`#${href}`}
                 onClick={(e) => handleScroll(e, href)}
                 className={`
                   block text-[14vw] font-display uppercase text-white tracking-tighter leading-none
                   transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer
                   ${menuOpen ? "translate-y-0" : "translate-y-full"}
                 `}
                 style={{ transitionDelay: `${i * 60 + 100}ms` }}
               >
                 {label}
               </a>
             </div>
          ))}
        </div>
      </div>
    </>
  );
}
