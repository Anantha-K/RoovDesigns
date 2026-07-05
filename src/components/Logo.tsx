import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "h-8 w-8", showText = true }: LogoProps) {
  return (
    <div className="flex items-center group cursor-pointer select-none">
      <span className="font-display font-bold tracking-[0.25em] text-sm text-white group-hover:text-white/90 transition-colors duration-300 uppercase">
        Roov
        <span className="text-royal-purple font-light tracking-[0.1em] lowercase ml-1">
          designs
        </span>
      </span>
    </div>
  );
}
