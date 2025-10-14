"use client";
import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";

/* =========================
   Config
========================= */
const LOGOS = [
  { src: "/excel.png", alt: "Excel" },
  { src: "/python.png", alt: "Python" },
  { src: "/powerbi.png", alt: "Power BI" },
  { src: "/qgis.png", alt: "QGIS" },
  { src: "/autodesk.jpg", alt: "Autodesk" },
  { src: "/autodesk_infraworks.png", alt: "Autodesk InfraWorks" },
  { src: "/simul8.png", alt: "SIMUL8" },
  { src: "/visum.png", alt: "PTV Visum" },
  { src: "/ecdata_comp.png", alt: "ECData" },
] as const;

const CENTER_IMG = { src: "/ecprojetos.png", alt: "EC Projetos" } as const;
const BEAM_DURATION = 3;

/* =========================
   Utils
========================= */
function useArrayRefs<T>(length: number) {
  const refs = useRef<React.RefObject<T | null>[]>([]);
  if (refs.current.length !== length) {
    refs.current = Array.from({ length }, () => React.createRef<T>());
  }
  return refs.current;
}

/* =========================
   UI
========================= */
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; title?: string }
>(({ className, children, title }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-3",
        "shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
      role="img"
      aria-label={title}
      title={title}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

const LogoCircle = forwardRef<
  HTMLDivElement,
  { src: string; alt: string; className?: string; imgW?: number; imgH?: number }
>(({ src, alt, className, imgW = 60, imgH = 60 }, ref) => {
  return (
    <Circle
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      title={alt}
    >
      <Image src={src} alt={alt} width={imgW} height={imgH} />
    </Circle>
  );
});
LogoCircle.displayName = "LogoCircle";

/* =========================
   Component
========================= */
const Example = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // refs estáveis para cada logo de origem
  const sourceRefs = useArrayRefs<HTMLDivElement>(LOGOS.length);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden p-6",
        "h-[520px] md:h-[560px]"
      )}
    >
      <div className="flex size-full max-w-5xl flex-col md:flex-row items-stretch justify-between gap-6 md:gap-10">
        {/* Usuário */}
        <div className="flex justify-center md:justify-start items-center">
          <Circle ref={userRef} title="Você">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Circle>
        </div>

        {/* Centro */}
        <div className="flex justify-center items-center">
          <LogoCircle
            ref={centerRef}
            className="size-28 md:size-32"
            src={CENTER_IMG.src}
            alt={CENTER_IMG.alt}
            imgW={100}
            imgH={100}
          />
        </div>

        {/* Fontes */}
        <div className="flex max-h-full flex-wrap md:flex-col justify-center gap-3 md:gap-2">
          {LOGOS.map((logo, idx) => (
            <LogoCircle
              key={logo.src}
              ref={sourceRefs[idx]}
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </div>
      </div>

      {/* Beams: fontes -> centro */}
      {LOGOS.map((_, idx) => (
        <AnimatedBeam
          key={`beam-${idx}`}
          containerRef={containerRef}
          fromRef={sourceRefs[idx]}
          toRef={centerRef}
          duration={BEAM_DURATION}
        />
      ))}

      {/* Beam: centro -> usuário */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={userRef}
        duration={BEAM_DURATION}
      />
    </div>
  );
};

export default Example;
