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
    if (window.location.pathname !== "/") {
      return; // Let the default <a> behavior handle the navigation to /#id
    }
    
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
      <header
        className={`
          fixed top-0 left-0 right-0 z-[9000]
          flex justify-center pointer-events-none
          pt-6
          transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="
          pointer-events-auto
          flex items-center justify-between 
          w-[92%] max-w-[1200px]
          px-6 py-3.5 
          rounded-2xl md:rounded-full 
          bg-[#0f0e11]/70 backdrop-blur-xl 
          border border-white/10 
          shadow-[0_8px_32px_rgba(0,0,0,0.6)]
        ">
          <div className="md:w-32 shrink-0">
            <Logo />
          </div>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-1">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={`/#${href}`}
                data-magnetic
                onClick={(e) => handleScroll(e, href)}
                className="
                  relative z-10 px-5 py-2 rounded-full
                  text-[9px] font-medium uppercase tracking-[0.25em]
                  text-white/60 hover:text-white hover:bg-white/10
                  transition-all duration-300 cursor-pointer
                "
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="md:w-32 flex justify-end shrink-0 items-center gap-4">
            <a
              href="/#contact"
              data-magnetic
              onClick={(e) => handleScroll(e, "contact")}
              className="
                relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full
                text-[10px] font-bold uppercase tracking-[0.25em]
                text-white bg-royal-purple border border-white/20 hover:border-white/50 hover:bg-royal-purple-light shadow-[0_0_20px_rgba(34,11,69,0.6)] hover:shadow-[0_0_30px_rgba(58,19,117,0.8)]
                transition-all duration-300 cursor-pointer
              "
            >
              Inquire
            </a>

            <button 
              className="md:hidden flex flex-col gap-[5px] p-2 relative z-10"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-6 h-[1px] bg-white"></span>
              <span className="w-6 h-[1px] bg-white"></span>
            </button>
          </div>
        </div>
      </header>

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
                 href={`/#${href}`}
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
